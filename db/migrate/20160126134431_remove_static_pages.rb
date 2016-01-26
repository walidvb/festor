class RemoveStaticPages < ActiveRecord::Migration
  def change
    drop_table :static_pages if ActiveRecord::Base.connection.table_exists? 'static_pages'
  end
end
