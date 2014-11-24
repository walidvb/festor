Feature: Administration
	As an admin
	I want to edit my content

	Background:
		Given I log in as an admin

	Scenario: I create an event
		When I create an event
		Then there should be an event