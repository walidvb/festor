class AddInfosToLocations < ActiveRecord::Migration
  def change
    Location.create_translation_table! infos: :text
  end
end
