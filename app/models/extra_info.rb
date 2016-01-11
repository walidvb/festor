class ExtraInfo < ActiveRecord::Base
  translates :title, :body
  belongs_to :event
  accepts_nested_attributes_for :translations, allow_destroy: true
end
