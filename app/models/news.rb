class News < ActiveRecord::Base
  translates :message
  accepts_nested_attributes_for :translations, allow_destroy: true

  rails_admin do
    configure :translations, :globalize_tabs
  end
end
