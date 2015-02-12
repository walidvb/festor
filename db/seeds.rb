# Generated with RailsBricks
# Initial seed file to use with Devise User Model
Event.delete_all
User.delete_all
Artist.delete_all

u = User.new(
    email: "admin@example.com",
    password: "admin",
    password_confirmation: "admin"
)
u.skip_confirmation!
u.save!

a = Fabricate :artist
e = Fabricate :event, type: :clubbing
a.book_for e
  

Fabricate :event, type: :workshop
Fabricate :event, type: :workshop
Fabricate :event, type: :exhibition
Fabricate :event, type: :performance