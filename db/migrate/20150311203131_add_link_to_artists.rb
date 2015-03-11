class AddLinkToArtists < ActiveRecord::Migration
  def change
    add_column :artists, :link, :string
  end
end
