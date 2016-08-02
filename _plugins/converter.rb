# encoding: utf-8

# Jekyll plugin for elasticsearch.
# Add page to elasticsearch
# See readme file for documenation
#
# Author: Junichiro Takagi
# Source:

module Jekyll
    # module Converters
    #     class Markdown < Converter
    #         alias md_convert convert

    #         def convert(content)
    #             if (@page.data.fetch('identifier') == 'ref_MJEGoA0S')
    #                 md_convert(Jekyll::CodeBlockWrapper.new.convert(content))
    #             else
    #                 md_convert(content)
    #             end
    #         end
    #     end

    # end

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
end

Jekyll::Hooks.register([:pages, :posts], :pre_render) do |page, payload|
    page.content = Jekyll::CodeBlockWrapper.new.convert(page.content)
end