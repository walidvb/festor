class PreviousEdition < ActiveRecord::Base
  has_attached_file :thumbnail,
		:styles => {
      :tile => "600x",
      :cropped => "600x848#"
		},
		:default_url => "/images/missing.jpg",
		:use_timestamp => false

  validates_presence_of :thumbnail, :url, :edition
  validates_format_of :url, with: /#{URI::regexp}/
	validates_attachment_content_type :thumbnail, :content_type => /\Aimage\/(jpg|jpeg|png|gif)\Z/i
end
