class StaticPage < ActiveRecord::Base
	translates :body, :title, :slug
	accepts_nested_attributes_for :translations, allow_destroy: true

	validates :body, presence: true
	scope :static, ->{where(news: false).order(:position)}
	scope :news, ->{where(news: true).order(:created_at)}

	### rails_admin
	rails_admin do
    configure :translations, :globalize_tabs
    edit do 
    	field :translations
    	field :position
    end
		list do
			scopes [:news, :static]
			field :position do 
				sortable true
			end
			field :title
			field :updated_at
		end
	end
end