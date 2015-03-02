Feature: Agenda
	As a visitor
	I can see the events

	Scenario: I visit one event
		Given there is an event
		When I visit the event
		Then I can see its title

	Scenario: I can filter out events
		Given there is a list of events
		And I visit the events
		When I choose to filter perfos
		Then I should see the perfos only