module ZoneFestivalSyncer
  def self.get_data
    res = Net::HTTP.post_form(uri, email: email, password: password)
    res.body
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
