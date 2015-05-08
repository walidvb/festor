class Asset < ActiveRecord::Base
	scope :gallery, ->{where.not(assetable_type: nil)}

	belongs_to :assetable, polymorphic: true
	has_attached_file :file,
		:styles => {
			:large => "1200>",
			:thumb => "150x90#"
		},
		:default_url => "/images/missing.jpg",
		:use_timestamp => false

	#validates_attachment_content_type :file, :content_type => /\A*\/\.*\Z/
	do_not_validate_attachment_file_type :file
	before_post_process :skip_for_non_images

  def skip_for_non_images
    	!/\Aimage\/.*\Z/.match(file_content_type).nil?
  end
end
