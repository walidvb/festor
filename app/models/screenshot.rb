class Screenshot < ActiveRecord::Base
  geocoded_by :ip   # can also be an IP address
  after_validation :geocode, address: :location          # auto-fetch coordinates

  has_attached_file :screenshot,
    :styles => {
      :medium => "350x200>",
      :tile => "600x>",
    },
    :default_url => "/images/missing.jpg",
    :use_timestamp => true

  # Paperclip.interpolates :screenshot_file_name do |attachment, style|
  #   attachment.instance.screenshot_file_name
  # end
  #
  # def screenshot_file_name
  #   Time.now.strftime("%y-%m-%d_%H-%m")
  # end

    validates_attachment_content_type :screenshot, :content_type => /\Aimage\/(jpg|jpeg|png|gif)\Z/i
  private

  def geocode

  end
end
