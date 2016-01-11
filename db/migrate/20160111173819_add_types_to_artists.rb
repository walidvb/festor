class AddTypesToArtists < ActiveRecord::Migration
  def change
    add_column :artists, :type, :string
    Artist.reset_column_information
    Artist.all.each do |artist|
      artist.type =  artist.vj? ? :vj : :dj
      artist.save!
    end
    remove_column :artists, :vj
  end
end
