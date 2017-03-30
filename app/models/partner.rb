class Partner < ActiveRecord::Base

  validates_presence_of :logo, :link, :type
  has_attached_file :logo,
    :styles => {
      :thumb => "100x100#",
      :tile => "x80",
      :tile_colored => "x80",
    },
    :convert_options => {
      :thumb => '-type Grayscale',
      :tile => '-type Grayscale'
    },
    :default_url => "/images/missing.jpg",
    :use_timestamp => false
    validates_attachment_content_type :logo, :content_type => /\Aimage\/(jpg|jpeg|png|gif)\Z/i

    self.inheritance_column = :fake_column
    def self.type_enum
      [:institutional, :private, :venues, :media]
    end
end
