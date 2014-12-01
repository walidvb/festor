class CreateArtists < ActiveRecord::Migration
  def change
    create_table :artists do |t|
    	t.string :name_en, :name_fr
      t.timestamps
    end
  end
end
