class RemoveUnneededFields < ActiveRecord::Migration
  def change
    remove_column :artist_translations, :sidebar_media
    remove_column :event_translations, :sidebar_media
    remove_column :events, :main_image_meta
    remove_column :event_translations, :sidebar_text
  end
end
