class AddSlugToLocations < ActiveRecord::Migration
  def change
    add_column :locations, :slug, :string
    add_index :locations, :slug
    Location.reset_column_information
    Location.all.map(&:save!)
  end
end
