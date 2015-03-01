Fabricator(:event) do 
	title						{|attrs| "The #{attrs[:type]}"}
	description			"The description"
	schedule_start	3.days.from_now
	buy_link				"http://some-long-link/a-path?and=params"
	main_image_file_name 				{ 'image.png' }
  main_image_content_type 		{ 'image/jpeg' }
  main_image_file_size 				{ 1024 }
  main_image									nil
end