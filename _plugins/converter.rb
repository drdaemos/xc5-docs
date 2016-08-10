# encoding: utf-8

# Jekyll plugin to automatically wrap code blocks with {% raw %} tag
#
# Author: Eugene Dementjev
# Version: 0.1.0

module Jekyll

    class CodeBlockWrapper
        def convert(content)
            # Wrap each code block in {% raw %} tag to prevent Liquid execution
            result = content.gsub(/(```|`)([\s\S]+?)(```|`)/) { |match|
                '{% raw %}' + match + '{% endraw %}'
            }

            # Enable inline PHP excerpt highlighting
            result = result.gsub('```php', '```php?start_inline=1')

            result
        end
    end

    class MarkupWrapper
        def convert(content)
            # Parse note tags
            result = content.gsub(/\=%(\S*):(?:<br \/>)?([\s\S]*?)%=/, '<div class="ui padded \1 segment">\2</div>')

            accordion_markup = <<-HTML
            <div class="ui accordion">
                <div class="title">
                    \1
                </div>
                <div class="content">

                \2

                </div>
            </div>
            HTML

            result = result.gsub(/\=>{(.*)}:(?:<br\/>)?([\s\S]*?)<=/, accordion_markup)

            result
        end
    end

    module Converters
        class Markdown < Converter
            alias old_convert convert

            def convert(content)
                old_convert(Jekyll::MarkupWrapper.new.convert(content))
            end
        end

    end
end

Jekyll::Hooks.register([:pages, :posts], :pre_render) do |page, payload|
    page.content = Jekyll::CodeBlockWrapper.new.convert(page.content)
end

# Jekyll::Hooks.register([:pages, :posts], :post_render) do |page, payload|
#     page.output = Jekyll::MarkupWrapper.new.convert(page.output)
# end