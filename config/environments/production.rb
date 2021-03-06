 Festor::Application.configure do
  # Settings specified here will take precedence over those in config/application.rb.

  # Code is not reloaded between requests.
  config.cache_classes = true

  # Eager load code on boot. This eager loads most of Rails and
  # your application in memory, allowing both thread web servers
  # and those relying on copy on write to perform better.
  # Rake tasks automatically ignore this option for performance.
  config.eager_load = true

  # Full error reports are disabled and caching is turned on.
  config.consider_all_requests_local       = false
  config.action_controller.perform_caching = true

  # Enable Rack::Cache to put a simple HTTP cache in front of your application
  # Add `rack-cache` to your Gemfile before enabling this.
  # For large-scale production use, consider using a caching reverse proxy like nginx, varnish or squid.
  # config.action_dispatch.rack_cache = true

  # not working
  # config.middleware.use Rack::Deflater

  config.middleware.swap(ActionDispatch::Static, Rack::Zippy::AssetServer)

  # Disable Rails's static asset server (Apache or nginx will already do this).
  config.serve_static_assets = true

  # Compress JavaScripts and CSS.
  config.assets.js_compressor = :uglifier
  config.assets.css_compressor = :sass

  # Do not fallback to assets pipeline if a precompiled asset is missed.
  config.assets.compile = false

  # Generate digests for assets URLs.
  config.assets.digest = true
  #config.assets.prefix = "static"

  # Version of your assets, change this if you want to expire all your assets.
  config.assets.version = '1.4'

  # Specifies the header that your server uses for sending files.
  # config.action_dispatch.x_sendfile_header = "X-Sendfile" # for apache
  # config.action_dispatch.x_sendfile_header = 'X-Accel-Redirect' # for nginx

  # Force all access to the app over SSL, use Strict-Transport-Security, and use secure cookies.
  # config.force_ssl = true

  # Set to :debug to see everything in the log.
  config.log_level = :info

  # Prepend all log lines with the following tags.
  # config.log_tags = [ :subdomain, :uuid ]

  # Use a different logger for distributed setups.
  # config.logger = ActiveSupport::TaggedLogging.new(SyslogLogger.new)

  # Use a different cache store in production.
  # config.cache_store = :mem_cache_store

  # Enable serving of images, stylesheets, and JavaScripts from an asset server.
  # config.action_controller.asset_host = "http://assets.example.com"

  # Precompile additional assets.
  # application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
  # config.assets.precompile += %w( search.js )

  # https://github.com/sferik/rails_admin/issues/1046
  # Prevent initializing the application before assets are precompiled (required for heroku)
  config.assets.initialize_on_precompile = false
  # Add Rails Admin assets (required)
  config.assets.precompile += ['rails_admin/rails_admin.css', 'rails_admin/rails_admin.js']
  # Ignore bad email addresses and do not raise email delivery errors.
  # Set this to true and configure the email server for immediate delivery to raise delivery errors.
  # config.action_mailer.raise_delivery_errors = false

  # Enable locale fallbacks for I18n (makes lookups for any locale fall back to
  # the I18n.default_locale when a translation can not be found).
  config.i18n.fallbacks = true

  # Send deprecation notices to registered listeners.
  config.active_support.deprecation = :notify

  # Disable automatic flushing of the log to improve performance.
  # config.autoflush_log = false

  # Use default logging formatter so that PID and timestamp are not suppressed.
  config.log_formatter = ::Logger::Formatter.new

  # Mailer
  config.action_mailer.raise_delivery_errors = false
  config.action_mailer.default_url_options = { :host => ENV["HOST"] }
  config.action_mailer.delivery_method = :smtp
  config.action_mailer.smtp_settings = {
    address: 'smtp.mandrillapp.com',
    port: '587',
    domain: 'heroku.com',
    authentication: "plain",
    enable_starttls_auto: true,
    user_name: ENV["MANDRILL_USERNAME"],
    password: ENV["MANDRILL_PASSWORD"]
  }

  config.paperclip_defaults = {
    :storage => :sftp,
    :path => "#{ENV['SFTP_PATH']}/assets/:attachment/:id/:style/:filename",
    :url => "#{ENV['SFTP_HOST']}/:attachment/:id/:style/:filename",
    :sftp_options => {
      :host     => ENV['SFTP_SERVER'],
      :user     => ENV['SFTP_USERNAME'],
      :password => ENV['SFTP_PASSWORD'],
      :port     => ENV['SFTP_PORT']
    }
  }
end
