# Generated with RailsBricks
# Initial seed file to use with Devise User Model
Event.delete_all
User.delete_all
Artist.delete_all
Location.delete_all

u = User.new(
    email: "admin@example.com",
    password: "admin",
    password_confirmation: "admin"
)

u.skip_confirmation!
u.save!

pic = File.open("#{Rails.root}/app/assets/images/lezoo.jpg")
location = Fabricate :location, name: "ZOO", picture: pic
Fabricate(:event, 
	type: :clubbing, 
	title: "IDM not EBM",
	description: "<p>and IDM not EBM</p>",
	location: location,
	main_image: pic,
	).artists <<  [
		Fabricate(:artist, name: "DBridge", profile_picture: File.open("#{Rails.root}/app/assets/images/DBridge.jpg")),
		Fabricate(:artist, name: "Graze", profile_picture: File.open("#{Rails.root}/app/assets/images/graze.jpg"))
	]


Fabricate :event, title: "The future workshop", type: :workshop, schedule_start: 2.days.from_now, schedule_end: 7.days.from_now, main_image: pic, location: location

Fabricate :event, type: :exhibition, title: "The Exhibition", schedule_start: 2.days.from_now, schedule_end: 4.days.from_now, main_image: pic, location: location
Fabricate :event, type: :performance, title: "Performance", main_image: pic, location: location, schedule_start: 2.days.from_now