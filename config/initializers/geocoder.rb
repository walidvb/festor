# config/initializers/geocoder.rb
Geocoder.configure(

  ip_lookup: :maxmind_local,
  maxmind_local: {package: :city}
)
