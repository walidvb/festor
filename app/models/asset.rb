class Asset < ActiveRecord::Base

	has_attached_file :file,
		:styles => {
			:large => "960>"
		},
		:default_url => "/images/missing.jpg",
		:use_timestamp => false

	validates_attachment :file, presence: true, :content_type => /\A\w*\Z/
	before_post_process :skip_for_non_images

  def skip_for_non_images
    !/\Aimage\/.*\Z/.match?(asset_content_type)
  end
end
