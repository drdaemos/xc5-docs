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
        css_class = level == 2 ? 'ui large vertical secondary navigation' : 'sub'

        items_text = @menu_items.map { |item| render_item(item, level, parent) }.join

        return <<-HTML
        <div class="menu #{css_class}">
          #{items_text}
        </div>
        HTML
      end

      def render_item(item, level, parent)
        parts = item['url'].sub('/', '').gsub('index.html', '').split('/')
        itembase = parts.slice(0, level).join('/')

        if item.data.fetch('title', '') and itembase == parent and parts.length > level and parts.length <= level + 1
          next_level = render_level(level + 1, parts.join('/'))

          url = @site.baseurl + item['url']
          return <<-HTML
            <div class="anchor-link item">
                <a class="ui" href="#{url}">#{item['title']}</a>
                #{next_level}
            </div>
          HTML
        end
      end

    end
  end
end

Liquid::Template.register_tag('navigation_menu', Jekyll::NavigationPlugin::MenuTag)