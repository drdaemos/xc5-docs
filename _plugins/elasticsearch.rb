# encoding: utf-8

# Jekyll plugin for elasticsearch.
# Add page to elasticsearch
# See readme file for documenation
#
# Author: Junichiro Takagi, Eugene Dementjev
# Version: 0.2.6

require 'elasticsearch'
require 'oj'
require 'digest/md5'
require 'date'
require "nokogiri"

module Jekyll

  class JekyllElasticsearch
    def initialize(host, index, type)
      if host == nil ||index == nil || type == nil
        raise "argument error"
      end

      @es = Elasticsearch::Client.new hosts: "#{host}", log: false, reload_on_failure: true
      @index = index
      @type = type
    end

    def set_analyzer (analyzer)
      @analyzer = analyzer
    end

    def type_exists
      @es.indices.exists_type index: "#{@index}", type: "#{@type}"
    end

    def index_exists
      @es.indices.exists index: "#{@index}"
    end

    def create_index
      settings = nil
      if @analyzer
        # use custom analyzer
        settings = get_setting
      end

      if @analyzer
        title = { "type" => "string", "store" => true, "index" => "analyzed", "analyzer" => "#{@analyzer}" }
        content = { "type" => "string", "store" => true, "index" => "analyzed", "analyzer" => "#{@analyzer}" }
        keywords = { "type" => "string", "store" => true, "index" => "analyzed", "analyzer" => "#{@analyzer}" }
      else
        title = { "type" => "string", "store" => true, "index" => "analyzed" }
        content = { "type" => "string", "store" => true, "index" => "analyzed" }
        keywords = { "type" => "string", "store" => true, "index" => "analyzed" }
      end

      _id = { "path" => "page_id" }
      _timestamp = { "enabled" => true, "path" => "page_date" }
      _source = { "enabled" => false }

      if @analyzer
        _all = { "enabled" => true, "analyzer" => "#{@analyzer}" }
      else
        _all = { "enabled" => true }
      end

      properties = {
        "page_id" => { "type" => "string", "include_in_all" => false, "store" => true },
        "page_date" => { "type" => "date", "include_in_all" => false, "store" => true },
        "es_update_date" => { "type" => "date", "include_in_all" => false, "store" => true },
        "url" => { "type" => "string", "include_in_all" => false, "store" => true },
        "categories" => { "type" => "string", "store" => true, "index" => "not_analyzed", "include_in_all" => false },
        "version" => { "type" => "string", "store" => true, "index" => "analyzed" },
        "title" => title,
        "parent" => { "type" => "string", "store" => true, "index" => "not_analyzed" },
        "content" => content,
        "keywords" => keywords,
        "page_rank" => { "type" => "integer", "store" => true, "index" => "not_analyzed" },
        "depth" => { "type" => "integer", "store" => true, "index" => "not_analyzed" } 
      }

      page = {
        "_source" => _source,
        "_all" => _all,
        "properties" => properties }

      mappings = { "#{@type}" => page }

      body = settings ? { "settings" => settings, "mappings" => mappings } : { "mappings" => mappings }

      @es.indices.create index: "#{@index}", body: Oj.dump(body)
    end

    def delete_index
      @es.indices.delete index: "#{@index}"
    end

    def create_page(page_id, body)
      @es.index index: "#{@index}", type: "#{@type}", id: page_id, body: body
    end

    def update_page(page_id, body)
      @es.update index: "#{@index}", type: "#{@type}", id: page_id, body: body
    end

    def page_exists(page_id)
      @es.exists index:"#{@index}", type: "#{@type}", id: "#{page_id}"
    end

    def delete_old_pages(date)
      begin
      res = @es.delete_by_query index:"#{@index}", type: "#{@type}", body: {
        query: {
          range: {
            es_update_date: {
              to: "#{date}"
            }
          }
        }
      }
      rescue Elasticsearch::Transport::Transport::Error => e
        puts "[!] ERROR: #{e.class}"
      end
    end

    def refresh
      @es.indices.refresh index: "#{@index}"
    end

    # return settings for analyzer.
    def get_setting()
      if @analyzer  == 'kuromoji'
        # use kuromoji. need to install kuromoji-plugin for elasticsearch
        pos_filter = { "type" => "kuromoji_part_of_speech", "stoptags" => ["助詞-格助詞-一般", "助詞-終助詞"]}
        greek_lowercase_filter = {"type" => "lowercase", "langrage" => "greek"}
        filter = { "pos_filter" => pos_filter, "greek_lowercase_filter" => greek_lowercase_filter }

        kuromoji = { "type" => "kuromoji_tokenizer", "mode" => "search" }
        tokenizer = { "kuromoji" => kuromoji }

        kuromoji_filter = ["kuromoji_baseform", "pos_filter", "greek_lowercase_filter", "cjk_width"]
        kuromoji_analyzer = { "type" => "custom", "tokenizer" => "kuromoji", "filter" => kuromoji_filter }
        analyzer = { "#{@analyzer}" => kuromoji_analyzer }

        analysis = { "filter" => filter, "tokenizer" => tokenizer, "analyzer" => analyzer }
        settings = { "analysis" => analysis }
      elsif @analyzer == 'english' || @analyzer == 'standard'
        return
      else        
        raise "[elasticsearch plugin]: undefined analyzer #{analyzer}"
      end
    end
  end

  class BareHtml < Page
    def initialize(site, base, page)
      @site = site
      @base = base
      @dest_name = page.basename
      file_name = "#{page.basename}_BARE.html"
      self.process(file_name)
      self.read_yaml(base, page.path)
      self.data['layout'] = nil
    end
  end

  class ElasticSearchGenerator < Generator
    priority :low
    safe true

    def generate(site)
      #config
      es_config = site.config['elasticsearch']
      unless es_config
        raise "[elasticsearch plugin]: no config for elasticsearch in _config.yml."
      end

      host = es_config['host']
      index = es_config['index']
      type = es_config['type']
      analyzer = es_config['analyzer']

      unless host && index && type
        raise "[elasticsearch plugin]: 'host', 'index' and 'type' config is required."
      end

      # initalize
      es = JekyllElasticsearch.new host, index, type
      if analyzer != nil
        es.set_analyzer analyzer
      end

      # if db is not exists, create one.
      begin
        es.delete_index

        sleep 5
        unless es.type_exists

          es.create_index
          # wait index created
          sleep 2
        end
      rescue Exception => e
        puts 'Skipping Elasticsearch update because: ' + e.message
        return
      end
 
      now = Time.now
      site.pages.reverse.each_with_index do |page, i|
        if page.data.fetch('title', nil)
          url_hash = Digest::MD5.hexdigest(page.url).hex % (2**32)
          page_id = page.data.fetch('identifier', url_hash)
          page_lang = page.data.fetch('lang', site.config['lang_default'])
          page_date = page.data.fetch('updated_at', now.to_s)
          data = {
            # create uniq id from url.
            "page_id" => page_id,
            "page_date" => Date.parse(page_date).strftime("%FT%T%z"),
            # set elastic update time to find removed page after.
            "es_update_date" => now.strftime("%FT%T%z"),
            "title" => page.data.fetch('title', ''),
            "description" => page.data.fetch('description', ''),
            "keywords" => page.data.fetch('keywords', ''),
            "categories" => page.data.fetch('categories', ''),
            "parent" => page.get_parent,
            "page_rank" => page.data.fetch('page_rank', page.get_category_pr),
            "depth" => page.get_depth,
            "version" => page.data.fetch('version', ''),
            "url" => "#{site.config['url']}#{page.url}",
            "content" => get_page_content(site, page)
          }

          es.refresh
          es.create_page page_id, Oj.dump(data)
        end
      end
      # delete removed page from elasticsearch
      es.refresh
      es.delete_old_pages (now - 1).strftime("%FT%T%z")

      puts 'Updated elasticsearch index'

    end

    # Generates contents for a file
    def get_page_content(site, page)
      converter = site.find_converter_instance(Jekyll::Converters::Markdown)

      bare = BareHtml.new(site, site.source, page)

      # prevent liquid from executing
      unless bare.content.nil? then
        bare.content = bare.content.gsub('{', '&#123;').gsub('}', '&#125;').gsub('%', '&#37;')
      end
      bare.content = converter.convert(bare.content)

      # catch possible render errors
      begin
        bare.render(site.layouts, site.site_payload)
      rescue Exception => e
        puts e.message
        puts 'in file ' + page['path']
      end

      doc = Nokogiri::HTML(bare.output)
      doc.xpath("//text()").to_s
    end

  end

end