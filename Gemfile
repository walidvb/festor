source 'https://rubygems.org'
ruby '2.1.1'
gem 'rails', '4.0.4'
gem 'pg'
gem 'sass-rails', '4.0.3'
gem 'uglifier', '2.5.3'
gem 'coffee-rails', '4.0.1'
gem 'jquery-rails', '3.1.2'
gem 'turbolinks', '2.3.0'
gem 'jbuilder', '2.1.3'
gem 'haml-rails'
gem 'bcrypt', '3.1.7'
gem 'puma'
gem 'devise', '3.3.0'
gem 'bootstrap-sass', '3.2.0.2'
#gem 'kaminari', '0.16.1'
gem 'font-awesome-sass', '4.2.0'
gem 'friendly_id', '5.0.4'
gem 'fog'
gem "paperclip", '~> 4.1'

gem 'compass-rails', '2.0.0'
gem 'rails_autolink'

#### UI
gem 'chosen-rails'
gem "autoprefixer-rails"
gem 'colorbox-rails'

#### I18
gem 'globalize', '~> 4.0.3'
#gem 'rails_admin_globalize_field'

#gem 'activeadmin', github: 'activeadmin'
gem "rails_admin"

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
  gem 'coffee-rails-source-maps'
end

# production gems for heroku
group :production do
  gem 'rails_12factor'
end

group :development, :test do
  gem 'rails_layout', '1.0.21'
  gem 'fabrication'
  gem 'jazz_hands'
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
end
