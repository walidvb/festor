class AddPrivateToStaticPages < ActiveRecord::Migration
  def change
    add_column :static_pages, :requires_authentication, :boolean, default: false
  end
end
