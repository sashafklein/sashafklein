class Contact < ActionMailer::Base
  default from: "contact@sashafklein.com"
  default to: ENV['GMAIL_ACCOUNT']

  def contact_message(email)
  	@name = email.name
  	@address = email.address
  	@subject = email.subject
  	@content = email.content
    mail(:subject => "**SFK** - #{@subject}")
  end

end
