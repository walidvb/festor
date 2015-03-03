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
    	field :public
    	field :translations
    end
		list do
			scopes [:news, :static]
			field :title
			field :updated_at
			field :public
		end
	end
end