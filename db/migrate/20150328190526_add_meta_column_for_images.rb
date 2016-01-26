class AddMetaColumnForImages < ActiveRecord::Migration
  def change
  	add_column :artists, :profile_picture_meta, :text
  	add_column :events, :main_image_meta, :text
  end
end
