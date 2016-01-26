include EventsHelper

Given(/^there is an event$/) do
  @event = Fabricate(:event, location: Fabricate(:location))
end

Given(/^that even has a translated description only$/) do
	I18n.with_locale(:en) {
		@event.title = "The title"
		@event.description = "The description"
	}
	I18n.with_locale(:fr) {
		@event.description = "La description"
	}
	@event.save!
end

When(/^I visit the event$/) do
	visit path_for(@event, {locale: :en})
end

Then(/^I should see the event in english$/) do
	expect(page).to have_content("The title")
	expect(page).to have_content("The description")
end

When(/^I switch to french$/) do
	click_on("FR")
end

Then(/^I should see the event in french$/) do
	expect(page).to have_content("The title")
	expect(page).to have_content("La description")
end
