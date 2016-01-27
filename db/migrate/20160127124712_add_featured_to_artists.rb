class AddFeaturedToArtists < ActiveRecord::Migration
  def change
    add_column :artists, :featured, :boolean
  end
end
