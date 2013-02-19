class Contact < ActionMailer::Base
  default from: "contact@sashafklein.com"
  default to: "fake_address@gmail.com"

  def contact_message(email)
  	@name = email.name
  	@address = email.address
  	@subject = email.subject
  	@content = email.content
    mail(:subject => "**SFK** - #{@subject}")
  end

end
