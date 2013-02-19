FactoryGirl.define do

	factory :email do
		address "foo@example.com"
		content "This is an effectively random string."
		name "Fake Name"
		subject "Subject of the email"
	end

	factory :post do
		name "This is a test post"
		content "This is the post content"
	end

	factory :user do
		name "guest"
		password "pwordtest"
		password_confirmation "pwordtest"
	end

end