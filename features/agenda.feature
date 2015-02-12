Feature: Agenda
	As a visitor
	I can see the events

	Scenario: I visit one event
		Given there is an event
		When I visit the event
		Then I can see its title

	@wip
	Scenario: I see all workshops
		Given there are 2 workshop
		And there are 2 exhibitions
		When I visit the workshops index
		Then I can see 2 workshop