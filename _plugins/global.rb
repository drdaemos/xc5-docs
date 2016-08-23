Jekyll::Hooks.register [:pages, :posts], :pre_render do |page, payload|
  lang = page['lang'] || payload['site']['lang_default']
  payload['baseurl_lang'] = payload['site']['baseurl'] + '/' + lang
  payload
end

Jekyll::Hooks.register :site, :post_write do |post|
  # execute this code on attachments folder - find ./ -regextype posix-extended -regex '.+\.(jpg|jpeg|png|gif)' -exec mogrify -strip -resize 1024 {} \;
end

class Object
  def try_call(method)
    self.send(method.to_sym) if self.respond_to?(method.to_sym)
  end
end

module Jekyll
  class Page
    include Comparable

    attr_accessor :parent_title

    def get_parent()
      if self.parent_title.nil? then
        if @name != 'index.md' then
          this_dir = @dir
        else
          this_dir = @dir.split('/').slice(0..-2)
          this_dir = this_dir.nil? ? '' : this_dir.join('/')
        end

        puts this_dir.inspect
        puts @dir.inspect
        puts @dir.split('/').inspect

        parent = @site.pages.find { |page| 
          page.dir == this_dir + '/' and page.name == 'index.md'
        }

        self.parent_title = parent.nil? ? '' : parent.data.fetch('title', '')
      end

      return self.parent_title
    end

    def try_compare_by(field, other, default)
      ours = self.data.fetch(field, default)
      theirs = other.data.fetch(field, default)
      ours <=> theirs
    end

    def <=> (other)
      sort_by = @site.config['sort_default']

      # try default sorting
      result = try_compare_by(sort_by, other, 100)
      if result === 0 then
        result = try_compare_by('title', other, '')
      end

      result
    end

  end
end