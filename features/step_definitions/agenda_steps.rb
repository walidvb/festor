Given(/^there is an workshop$/) do
  @workshop = Fabricate(:event, )
end

When(/^I visit the workshop$/) do
  visit workshops_path(@workshop)
end

Then(/^I can see its title$/) do
  expect(page).to have_content(@event.title)
end

Given(/^there are (\d+) (\w+) events$/) do |count, event_type|
	count.to_i.times do 
		Fabricate(:event, type: event_type.to_sym)
	end
end

When(/^I visit the (\w+) index$/) do |event_type|
	visit Rails.application.routes.url_helpers.send("#{event_type}_path")
end

Then(/^I can see (\d+) (\w+)$/) do |count, event_type|
  expect(all(".events .event").count).to eq(count.to_i)
end