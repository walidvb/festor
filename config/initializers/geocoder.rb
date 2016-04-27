# config/initializers/geocoder.rb
Geocoder.configure(

  ip_lookup: ENV['GEO_SERVICE'].to_sym,
  api_key: 'search-eUoPZ5Z'
  #maxmind_local: {package: :city}
)
