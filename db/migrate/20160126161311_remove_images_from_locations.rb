class RemoveImagesFromLocations < ActiveRecord::Migration
  def change
    remove_attachment :locations, :picture
  end
end
