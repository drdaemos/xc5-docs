Jekyll::Hooks.register :pages, :pre_render do |page|
  
end

class Object
  def try_call(method)
    self.send(method.to_sym) if self.respond_to?(method.to_sym)
  end
end

module Jekyll
  class Page
    include Comparable

    def <=> (other) #1 if self>other; 0 if self==other; -1 if self<other
      self.data.fetch('order', self.data.fetch('title', '')) <=> other.data.fetch('order', other.data.fetch('title', ''))
    end

  end
end