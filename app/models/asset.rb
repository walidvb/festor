class Asset < ActiveRecord::Base

	has_attached_file :image,
		:styles => {
			:thumb => "100x100#",
			:medium => "350x200#",
			:large => "960>"
		},
		:default_url => "/images/missing.jpg",
		:use_timestamp => false

	validates_attachment_content_type :image, :content_type => /\Aimage\/.*\Z/
end
