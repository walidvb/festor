# config/initializers/geocoder.rb
Geocoder.configure(

  # geocoding service (see below for supported options):
  :lookup => :geoip2,

  # IP address geocoding service (see below for supported options):
  :ip_lookup => :maxmind_local,
  :geoip2 => {
    file: File.join('app', 'assets', 'other', 'GeoLite2-City.mmdb')
  },
  # to use an API key:
  #:api_key => "...",

  # geocoding service request timeout, in seconds (default 3):
  :timeout => 5,

  # set default units to kilometers:
  :units => :km,

  # caching (see below for details):
  #:cache => Redis.new,
  #:cache_prefix => "..."

)
