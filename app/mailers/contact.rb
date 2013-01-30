class Contact < ActionMailer::Base
  default from: "unimportant@example.com"

  def contact_message(email)
  	@name = email.name
  	@address = email.address
  	@subject = email.subject
  	@content = email.content
    mail(:to => "sashafklein@gmail", :subject => "Message from sashafklein.com")
  end

end
