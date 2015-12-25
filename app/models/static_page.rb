class StaticPage < ActiveRecord::Base
	translates :body, :title
	accepts_nested_attributes_for :translations, allow_destroy: true
	before_destroy :prevent_destroy_static_pages
	extend FriendlyId
  friendly_id :title, :use => [:slugged]

	validates :body, presence: true
	validates :title, presence: true
	scope :static, ->{where(news: false).order(:position)}
	scope :public, ->{where(public: true).order(:position)}
	scope :public_news, ->{where(news: true, public: true).order(created_at: :desc)}
	scope :news, ->{where(news: true).order("created_at DESC")}

	has_attached_file :header_image,
		:styles => {
			:thumb => "100x100#",
			:tile => "400x180#",
			:large => "1200x535#"
		},
		:default_url => "/images/missing.jpg",
		:use_timestamp => false

	validates_attachment_content_type :header_image, :content_type => /\Aimage\/(jpg|jpeg|png|gif)\Z/i

	private
	def prevent_destroy_static_pages
		if !self.news
			self.errors[:base] << "You cannot destroy static pages."
			return false
		end
	end

end
