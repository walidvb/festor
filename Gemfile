source 'https://rubygems.org'
ruby '2.2.5'
gem 'rails', '4.1'
gem 'pg'
gem 'sass-rails'
gem 'uglifier', '2.5.3'
gem 'coffee-rails', '4.0.1'
gem 'jquery-rails', '3.1.2'
#gem 'turbolinks', '2.3.0'
gem 'turbolinks', '~> 5.0.0.beta'
gem 'jquery-turbolinks'
gem 'jbuilder', '2.1.3'
gem 'haml-rails'
gem 'bcrypt', '3.1.7'
gem 'puma'
gem 'devise', '3.3.0'
gem 'bootstrap-sass', '3.2.0.2'
gem 'kaminari', '0.16.1'
gem 'font-awesome-sass', '4.2.0'
gem 'fog'
gem "paperclip", '~> 4.1'
gem 'paperclip-sftp', '~> 1.0.0'
gem 'acts_as_list'
gem 'sprockets', '>= 3.0.0'
gem 'sprockets-es6'
gem 'inline_svg'
gem "rails-erd"
gem 'delayed_job_active_record'

# gem "react_on_rails", "~> 6"

#gem "paperclip-storage-ftp"
#gem 'paperclip-meta'

gem 'rails_autolink'

gem 'geocoder'
gem 'iso_country_codes'
#### UI
gem "autoprefixer-rails"

gem "rails_admin", github: 'sferik/rails_admin', ref: '0eaaac5'
gem "auto_html", '~> 1.6.4'
#### I18
gem 'rails-i18n', '~> 4.0.0'
gem 'globalize'
gem 'rails_admin_globalize_field'
gem 'friendly_id', '5.0.4'
#gem 'friendly_id-globalize'

# development gems
group :development do
	gem 'better_errors'
  gem 'awesome_print'
  gem 'binding_of_caller', :platforms=>[:mri_19, :mri_20, :rbx]
  gem 'guard-bundler'
  gem 'guard-cucumber'
  gem 'guard-rails'
  gem 'guard-rspec'
  gem 'html2haml'
  gem 'quiet_assets'
  gem 'rb-fchange', :require=>false
  gem 'rb-fsevent', :require=>false
  gem 'rb-inotify', :require=>false
  gem 'pry-rails'
  gem 'letter_opener'
  gem 'bullet'
	gem 'meta_request'
end

# production gems for heroku
group :production do
  gem 'rails_12factor'
	gem 'newrelic_rpm'
	gem 'rubyzip'
	gem 'heroku-deflater'
	gem 'rack-zippy'
end

group :development, :test do
  gem 'rails_layout', '1.0.21'
  gem 'fabrication'
  gem 'jazz_hands', github: 'jkrmr/jazz_hands'
  gem 'pry-rescue'
  gem 'pry-stack_explorer'
  gem 'terminal-notifier-guard'
  gem 'figaro', '0.7.0'     # env variables
end

# Capybara
group :test do
  gem 'rspec-rails', '3.1.0'
  gem 'capybara'
  gem 'cucumber-rails', :require=>false
  gem 'database_cleaner', '1.0.1'
  gem 'email_spec'
  gem 'launchy'
  gem 'selenium-webdriver'
  gem 'chronic'
  gem 'timecop'
  gem 'anticipate'
  gem 'rspec-html-matchers'
  gem 'show_me_the_cookies'
	gem 'fuubar'
end

gem 'mini_racer', platforms: :ruby
