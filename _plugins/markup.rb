# encoding: utf-8

# Jekyll plugin for maintaining links and referencis.
# adds {% link %} and {% ref %} tags
#
# Author: Eugene Dementjev
# Version: 0.2.2

module Jekyll
  module MarkupPlugin

    class NoteTag < Liquid::Block
      def initialize(tag_name, args, tokens)
        super
        @type = args.strip
      end

      def render(context)
        content = super

        color = case @type
            when 'warning' then 'yellow'
            when 'danger' then 'red'
            when 'info' then 'blue'
            when 'success' then 'green'
            else ''
        end

        return <<-HTML
<div class="ui padded #{color} segment note" markdown="1">#{content}</div>
HTML
      end
    end

  end
end

Liquid::Template.register_tag('note', Jekyll::MarkupPlugin::NoteTag)