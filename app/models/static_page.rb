class StaticPage < ActiveRecord::Base
	translates :body, :title, :slug
	accepts_nested_attributes_for :translations, allow_destroy: true
	before_destroy :prevent_destroy_static_pages

	validates :body, presence: true
	scope :static, ->{where(news: false).order(:position)}
	scope :public, ->{where(public: true)}
	scope :news, ->{where(news: true).order(:created_at)}

	def prevent_destroy_static_pages
		if !self.news
			self.errors[:base] << "You cannot destroy static pages."
			return false 
		end
	end

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