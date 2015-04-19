require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(:default, Rails.env)

module Festor
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    config.before_configuration do
      env_file = File.join(Rails.root, 'config', 'local_env.yml')
      YAML.load(File.open(env_file)).each do |key, value|
        ENV[key.to_s] = value.to_s
      end if File.exists?(env_file)
    end
    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # Add custom modules from /lib - walid
    config.autoload_paths += %W(#{config.root}/lib)

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    config.i18n.default_locale = :en
    config.i18n.available_locales = [:en, :fr]
    config.i18n.fallbacks = true
    
    # don't generate RSpec tests for views and helpers
    config.generators do |g|
      g.test_framework :rspec, fixture: true
      g.fixture_replacement :fabrication
      g.view_specs false
      g.helper_specs false
      g.assets = false
      g.helper = false
    end
    config.assets.paths << Rails.root.join('vendor', 'assets', 'components')
    config.assets.paths << Rails.root.join('app', 'assets', 'fonts')
    
    config.assets.precompile += ['application.css, application.js']
    config.assets.precompile += ['rails_admin/rails_admin.css', 'rails_admin/rails_admin.js']
    config.assets.precompile << /\.(?:svg|eot|woff|ttf)$/

    if !ENV['ASSETS_PROD']
      config.paperclip_defaults = {
        :storage => :fog,
        :fog_credentials => {:provider => "Local", :local_root => "#{Rails.root}/public"},
        :fog_directory => "",
        :fog_host => ''
      }
    else
     config.paperclip_defaults = {
      :storage => :sftp,
      :path => "/assets/:attachment/:id/:style/:filename",
      :url => "#{ENV['ASSET_HOST']}/assets/:attachment/:id/:style/:filename",
      :sftp_options => {
        :host     => ENV['SFTP_SERVER'],
        :user     => ENV['SFTP_USERNAME'],
        :password => ENV['SFTP_PASSWORD'],
        :port     => ENV['SFTP_PORT']
      }
    }
  end
end
end
