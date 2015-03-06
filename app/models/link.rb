class Link < ActiveRecord::Base
	belongs_to :linkable, polymorphic: true, inverse_of: :linkable
	validates :text_to_show, presence: true
	validates :url, presence: true
	
	rails_admin do 
		field :text_to_show
		field :url
	end
end
