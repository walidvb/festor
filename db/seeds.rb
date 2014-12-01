# Generated with RailsBricks
# Initial seed file to use with Devise User Model


u = User.new(
    email: "tester@email.com",
    password: "1234",
    password_confirmation: "1234"
)
u.skip_confirmation!
u.save!

a = Fabricate :artist
e = Fabricate :event
a.book_for e
  

