class StaticPage < ActiveRecord::Base
	translates :body, :title, :slug
	accepts_nested_attributes_for :translations, allow_destroy: true
	before_destroy :prevent_destroy_static_pages

	validates :body, presence: true
	scope :static, ->{where(news: false).order(:position)}
	scope :public, ->{where(public: true)}
	scope :news, ->{where(news: true).order(:created_at)}

	has_attached_file :header_image,
		:styles => {
			:thumb => "100x100#",
			:large => "1200x535#"
		},
		:default_url => "/images/missing.jpg",
		:use_timestamp => false
  
	validates_attachment_content_type :header_image, :content_type => /\Aimage\/.*\Z/


	### rails_admin
	rails_admin do
    configure :translations, :globalize_tabs
    edit do 
    	field :public
    	field :header_image
    	field :translations
    end
		list do
			scopes [:news, :static]
			field :title
			field :updated_at
			field :public
		end
	end

	private
	def prevent_destroy_static_pages
		if !self.news
			self.errors[:base] << "You cannot destroy static pages."
			return false 
		end
	end

end