module Jekyll
  module ReferencePlugin
    class LinkTag < Liquid::Tag

      def initialize(tag_name, args, tokens)
        super
        title_match = /^["']([\s\S]*)['"]/.match(args)
        id_match = /(\S+)\s*$/.match(args)
        @title = title_match ? title_match.captures.first : ''
        @id = id_match ? id_match.captures.first : ''
      end

      def render(context)
        @site = context.registers[:site]
        @config = context.registers[:site].config
        @page = context.environments.first["page"]
        baseurl = context['baseurl_lang']
        url = @site.data['links'][@id]

        markup = "[#{@title}](#{baseurl}/#{url})"

        return markup
      end

    end
  end
end

Liquid::Template.register_tag('link', Jekyll::ReferencePlugin::LinkTag)