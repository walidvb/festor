Feature: Agenda
	As a visitor
	I can see the events

	Scenario: I visit one event
		Given there is an event
		When I visit the event
		Then I can see its title

	Scenario: I see all workshops
		Given there are 2 workshop events
		And there are 2 exhibition events
		When I visit the workshops index
		Then I can see 2 workshop