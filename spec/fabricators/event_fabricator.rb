Fabricator(:event) do 
	title_en "The Party"
	title_fr "La Teuf"
	slug 	{sequence(:slug) {|i| "party_#{i}"}}
	description_en	"The description"
	description_fr	"La description"
	schedule				DateTime.now
end