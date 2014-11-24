def sign_in_as_admin
	@admin ||= User.new email: "admin@admin.com", password: "1234", password_confirmation: "1234"
	@admin.skip_confirmation!
	@admin.save!
	visit rails_admin_path
	within 'form' do 
		fill_in 'Email', with: @admin.email
		fill_in 'Password', with: @admin.password
		click_on "Sign in"
	end
end

