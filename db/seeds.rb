# Generated with RailsBricks
# Initial seed file to use with Devise User Model
Event.delete_all
User.delete_all
Artist.delete_all
Location.delete_all
Link.delete_all
StaticPage.delete_all
u = User.new(
    email: "admin@example.com",
    password: "admin",
    password_confirmation: "admin"
)

u.skip_confirmation!
u.save!

pic = File.open("#{Rails.root}/app/assets/images/lezoo.jpg")
location = Fabricate :location, name: "ZOO", picture: pic
main_event = Fabricate(:event, 
	type: :clubbing, 
	title: "IDM not EBM",
	description: "<p>and IDM not EBM</p>",
	location: location,
	main_image: pic,
	links: [
		Fabricate(:link)
	],
	)
workshop = Fabricate(:event, title: "The future workshop", type: :workshop, schedule_start: 2.days.from_now, schedule_end: 7.days.from_now, main_image: pic, location: Fabricate(:location, name: "BAT 43", address: "43 rte des Acacias 1227 les Acacias"))
workshop.artists <<  [
		Fabricate(:artist, name: "DBridge", profile_picture: File.open("#{Rails.root}/app/assets/images/DBridge.jpg")),
		Fabricate(:artist, name: "Graze", profile_picture: File.open("#{Rails.root}/app/assets/images/graze.jpg"))
	]
workshop.attributes = {
	description: "<h2>Workshop presented by Laurent Novac (CH)<br>The inscriptions are open!</h2><br>Crazy generative art stuff going on here.<br><br><h3>Program / Day 1</h3>We have fun", 
	locale: :en
}
workshop.save!
workshop.attributes = {
	description: "<h2>Workshop présenté par Laurent Novac (CH)<br>Les inscriptions sont ouvertes!</h2><br>Cet atelir est une exploration dans le domaine de l'art génératif hehe.<br><br><h3>Programme / Jour 1</h3>On se marre", 
	locale: :fr
}
workshop.save!
Fabricate(:event, title: "The future workshop", type: :workshop, schedule_start: 2.days.from_now, schedule_end: 7.days.from_now, main_image: pic, location: Fabricate(:location, name: "BAT 43", address: "43 rte des Acacias 1227 les Acacias"))

Fabricate :event, type: :exhibition, title: "The Exhibition", schedule_start: 2.days.from_now, schedule_end: 4.days.from_now, main_image: pic, location: location
Fabricate :event, type: :performance, title: "Performance", main_image: pic, location: location, schedule_start: 2.days.from_now

Event.category_enum.each do |cat|
	Fabricate.times(3, :event, type: :single_event, category: cat, location: location)
end

static_pages = %w(infos about partners gallery previous_editions)
static_pages.each do |slug|
	Fabricate(:static_page, title: slug)
end