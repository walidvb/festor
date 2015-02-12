Fabricator(:event) do 
	title {|attrs| "The #{attrs[:type]}"}
	slug 	{sequence(:slug) {|i| "party_#{i}"}}
	description	"The description"
	schedule_start	DateTime.now
end