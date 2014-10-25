Feature: Agenda
	As a visitor
	I can see the events

	Scenario: I visit one event
		Given there is an event
		When I visit the event
		Then I can see its title
