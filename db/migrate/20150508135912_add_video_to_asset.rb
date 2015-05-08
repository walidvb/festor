class AddVideoToAsset < ActiveRecord::Migration
  def change
    add_column :assets, :video, :string
  end
end
