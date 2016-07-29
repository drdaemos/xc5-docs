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