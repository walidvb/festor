Fabricator(:event) do 
	title "The Party"
	slug 	{sequence(:slug) {|i| "party_#{i}"}}
	description	"The description"
	schedule				DateTime.now
end