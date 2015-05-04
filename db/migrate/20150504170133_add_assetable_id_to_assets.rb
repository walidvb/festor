class AddAssetableIdToAssets < ActiveRecord::Migration
  def change
    add_column :assets, :assetable_id, :integer
    add_column :assets, :assetable_type, :string
  end
end
