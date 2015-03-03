class AddNilFalseToBookings < ActiveRecord::Migration
  def change
  	change_column :bookings, :event_id, :integer, null: false
  	change_column :bookings, :artist_id, :integer, null: false
  end
end
