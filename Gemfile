source 'https://rubygems.org'

gem 'rails', '3.2.11'
gem 'bootstrap-sass', '2.1'
gem 'newrelic_rpm'
gem 'pygments.rb'
gem 'redcarpet'
gem 'annotate'
gem 'jquery-rails'

# Bundle edge Rails instead:
# gem 'rails', :git => 'git://github.com/rails/rails.git'

group :production do
	gem 'pg'
end

group :test do 
	gem 'capybara'
  gem 'capybara-webkit'
  gem 'capybara-screenshot'
  gem 'rb-fsevent'
  gem 'growl', '1.0.3'
  gem 'guard-spork', '1.2.0'
  gem 'spork', '0.9.2'
  gem 'factory_girl_rails'
  gem 'guard-rspec', '1.2.1'
  gem 'ruby-debug19'
end

group :development do
	gem 'sqlite3'
end

group :development, :test do
  gem 'rspec-rails' 
end

# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'sass-rails',   '~> 3.2.3'
  gem 'coffee-rails', '~> 3.2.1'
  gem 'ezcrypto'
  gem 'angularjs-rails'

  # See https://github.com/sstephenson/execjs#readme for more supported runtimes
  # gem 'therubyracer', :platforms => :ruby

  gem 'uglifier', '>= 1.0.3'
end

# To use ActiveModel has_secure_password
gem 'bcrypt-ruby', '~> 3.0.0'

# To use Jbuilder templates for JSON
# gem 'jbuilder'

# Use unicorn as the app server
# gem 'unicorn'

# Deploy with Capistrano
# gem 'capistrano'

# To use debugger
# gem 'debugger'
