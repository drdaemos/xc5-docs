# encoding: utf-8

# Jekyll plugin for providing navigation.
# adds {% navigation_menu %} tag
#
# Author: Eugene Dementjev
# Version: 0.1.0

module Jekyll
  module NavigationPlugin
    class BreadcrumbsTag < Liquid::Tag

    end
    class MenuTag < Liquid::Tag

      def initialize(tag_name, baseurl, tokens)
        super
        @baseurl = baseurl
      end

      def render(context)
        @site = context.registers[:site]
        @config = context.registers[:site].config
        @page = context.environments.first["page"]
        baseurl = context[@baseurl.strip]

        @menu_items = @site.pages.select { |item| item.data.fetch('lang', '') == @page.fetch('lang', @config['lang_default']) }
        @menu_items = @menu_items.sort { |a, b| a <=> b }
        markup = render_level(2, baseurl)

        return markup
      end

      def render_level(level, parent)
        menu_id = level == 2 ? 'id="navigation-menu"' : ''
        css_class = level == 2 ? 'ui large vertical secondary navigation accordion pointing' : 'content'

        items_text = @menu_items.map { |item| render_item(item, level, parent) }.join

        if items_text.strip.length > 0 then
          return <<-HTML
          <div #{menu_id} class="#{css_class} menu">
            #{items_text}
          </div>
          HTML

        else
          return ''
        end
      end

      def render_item(item, level, parent)
        parts = item['url'].sub('/', '').gsub('index.html', '').split('/')
        itembase = parts.slice(0, level).join('/')

        if item.data.fetch('title', '') and itembase == parent and parts.length > level and parts.length <= level + 1
          next_level = render_level(level + 1, parts.join('/'))
          next_opener = (next_level.length > 0) ? '<a class="opener"><i class="dropdown icon"></i></a>' : ''
          has_sub = (next_level.length > 0 ? 'has-sub' : '')

          url = @site.baseurl + item['url']
          return <<-HTML
            <div class="anchor-link item #{has_sub}">
                <div class="title">
                  <a class="link" href="#{url}">#{item['title']}</a>
                  #{next_opener}
                </div>
                #{next_level}
            </div>
          HTML
        end
      end

    end
  end
end

Liquid::Template.register_tag('navigation_menu', Jekyll::NavigationPlugin::MenuTag)