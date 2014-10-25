Given(/^there is an event$/) do
  @event = Fabricate(:event)
end

When(/^I visit the event$/) do
  visit event_path(@event)
end

Then(/^I can see its title$/) do
  expect(page).to have_content(@event.title)
end