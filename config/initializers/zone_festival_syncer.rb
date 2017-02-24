module ZoneFestivalSyncer
  def self.get_data
    res = Net::HTTP.post_form(uri, email: email, password: password)
    res.body
  end

  def self.reset_and_sync!
    Artist.delete_all
    Event.delete_all
    Location.delete_all
    Link.delete_all
    EventDate.delete_all
    Booking.delete_all

    self.sync!
  end

  def self.sync!
    zf = ZoneFestival.first || ZoneFestival.new
    zf.data = self.get_data
    zf.save!
    if Rails.env.development?
      zf.store_locally!
    else
      zf.delay.store_locally!
    end
  end
  private

  def self.email
    ENV['ZONE_FESTIVAL_EMAIL']
  end

  def self.password
    ENV['ZONE_FESTIVAL_PASSWORD']
  end

  def self.uri
    URI("http://api.zonefestival.com/json/program/")
  end

end
