Fabricator(:event) do 
	title {|attrs| "The #{attrs[:type]}"}
	description	"The description"
	schedule_start	3.days.from_now
end