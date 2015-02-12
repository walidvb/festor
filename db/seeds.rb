# Generated with RailsBricks
# Initial seed file to use with Devise User Model


u = User.new(
    email: "admin@example.com",
    password: "admin",
    password_confirmation: "admin"
)
u.skip_confirmation!
u.save!

a = Fabricate :artist
e = Fabricate :event
a.book_for e
  

