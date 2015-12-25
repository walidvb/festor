class Partner < ActiveRecord::Base

  validates_presence_of :logo, :name, :link
  has_attached_file :logo,
    :styles => {
      :thumb => "100x100#",
      :tile => "600x270#",
      :large => "1200x535#"
    },
    :default_url => "/images/missing.jpg",
    :use_timestamp => false

end
