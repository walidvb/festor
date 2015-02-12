Fabricator(:event) do 
	title_en {|attrs| "The #{attrs[:type]}"}
	title_fr {|attrs| "Le #{attrs[:type]}"}
	slug 	{sequence(:slug) {|i| "party_#{i}"}}
	description_en	"The description"
	description_fr	"La description"
	schedule_start	DateTime.now
end