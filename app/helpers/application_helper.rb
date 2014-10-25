module ApplicationHelper
  def title(value)
    unless value.nil?
      @title = "#{value} | Application"      
    end
  end
end
