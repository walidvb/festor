Feature: Translation
	As a frenchy
	I can see the site in french

	Scenario: I switch to french
		Given there is an event
		And that even has a translated description only
		When I visit the event
		Then I should see the event in english
		When I switch to french
		Then I should see the event in french