class AddArtistTypeToArtists < ActiveRecord::Migration
  def change
    add_column :artists, :vj, :boolean
  end
end
