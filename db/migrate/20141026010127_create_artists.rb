class CreateArtists < ActiveRecord::Migration
  def up
    create_table :artists do |t|
    	t.string	:name
      t.timestamps
    end
    Artist.create_translation_table! biography: :text
  end

  def down
  	drop_table :artists
  	Artist.drop_translation_table!
  end
end
