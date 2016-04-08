class Screenshot < ActiveRecord::Base
  paginates_per 200
  geocoded_by :ip   # can also be an IP address
  after_validation :geocode, address: :location          # auto-fetch coordinates
  before_save :extract_dimensions
  serialize :dimensions

  has_attached_file :screenshot,
    :styles => {
      #:medium => "350x200>",
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

  def width
    self.dimensions.nil? ? nil : self.dimensions[0]
  end
  def height
    self.dimensions.nil? ? nil : self.dimensions[1]
  end
  private

  # Retrieves dimensions for image assets
  # @note Do this after resize operations to account for auto-orientation.
  def extract_dimensions
    tempfile = screenshot.queued_for_write[:original]
    unless tempfile.nil?
      geometry = Paperclip::Geometry.from_file(tempfile)
      self.dimensions = [geometry.width.to_i, geometry.height.to_i]
    end
  end
end
