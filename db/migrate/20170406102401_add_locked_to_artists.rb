class AddLockedToArtists < ActiveRecord::Migration
  def change
    add_column :artists, :locked, :boolean
  end
end
