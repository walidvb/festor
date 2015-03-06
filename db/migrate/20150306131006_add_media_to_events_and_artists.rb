class AddMediaToEventsAndArtists < ActiveRecord::Migration
  def change
  	add_column :event_translations,  :sidebar_media, :text
  	add_column :artist_translations, :sidebar_media, :text
  end
end
