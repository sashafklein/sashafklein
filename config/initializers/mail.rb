# SendGrid Settings
ActionMailer::Base.smtp_settings = {
  :address        => 'smtp.sendgrid.net',
  :port           => '587',
  :authentication => :plain,
  :enable_starttls_auto => true,
  :user_name      => ENV['SENDGRID_USERNAME'],
  :password       => ENV['SENDGRID_PASSWORD'],
  :domain         => 'sashafklein.com'
}

if Rails.env.production?
	ActionMailer::Base.delivery_method = :smtp
end