class AddEventToArtist < ActiveRecord::Migration
  def change
    add_reference :artists, :event, index: true
  end
end
