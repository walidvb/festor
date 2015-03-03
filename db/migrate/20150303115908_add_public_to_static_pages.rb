class AddPublicToStaticPages < ActiveRecord::Migration
  def change
    add_column :static_pages, :public, :boolean, default: false
  end
end
