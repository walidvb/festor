Feature: Administration
	As an admin
	I want to edit my content

	Background:
		Given I log in as an admin

	Scenario: I create an event
		When I create an event
		And I visit the event
		Then I should see the event