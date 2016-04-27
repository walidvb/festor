# config/initializers/geocoder.rb
Geocoder.configure(

  ip_lookup: ENV['GEO_SERVICE'].to_sym,
  #maxmind_local: {package: :city}
)
