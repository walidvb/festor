# config/initializers/geocoder.rb
Geocoder.configure(

  ip_lookup: :google,
  #maxmind_local: {package: :city}
)
