class Partner < ActiveRecord::Base

  validates_presence_of :logo, :link, :type
  has_attached_file :logo,
    :styles => {
      :thumb => "100x100#",
      :tile => "x80",
    },
    :default_url => "/images/missing.jpg",
    :use_timestamp => false
    validates_attachment_content_type :logo, :content_type => /\Aimage\/(jpg|jpeg|png|gif)\Z/i

    self.inheritance_column = :fake_column
    def self.type_enum
      [:media, :institutional, :private, :venues]
    end
end
