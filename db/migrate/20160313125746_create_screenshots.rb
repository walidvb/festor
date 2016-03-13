class CreateScreenshots < ActiveRecord::Migration
  def change
    create_table :screenshots do |t|
      t.attachment :screenshot
      t.string :ip
      t.string :country_name
      t.string :device_type
      t.string :location
      t.float :longitude
      t.float :latitude
      t.timestamps
    end
  end
end
