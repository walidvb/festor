class AddInfosToLocations < ActiveRecord::Migration
  def change
    add_column :locations, :infos, :text
  end
end
