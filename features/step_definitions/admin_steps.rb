Given(/^I log in as an admin$/) do
	sign_in_as_admin
end

When(/^I create an event$/) do
	visit rails_admin_path
	within '.event_links' do
	 find('.new_collection_link a').click
	end
	@event_attrs = {
		"title_en"       => "the title",
		"description" => "The Description",
		"slug"        => "the_slug"
	}
	@event = Event.new(@event_attrs)
	@event_attrs.each do |key, value|
		fill_in key.capitalize, with: value
	end

	click_on 'Save'
end

Then(/^there should be an event$/) do
  expect(Event.first.description).to eq(@event.description)
end