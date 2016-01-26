class RemoveProfileMetaFromFromArtists < ActiveRecord::Migration
  def change
    remove_column :artists, :profile_picture_meta
  end
end
