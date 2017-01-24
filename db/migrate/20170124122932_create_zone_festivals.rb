class CreateZoneFestivals < ActiveRecord::Migration
  def change
    create_table :zone_festivals do |t|
      t.json :data
      t.timestamps
    end
  end
end
