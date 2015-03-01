class AddNewsToStaticPages < ActiveRecord::Migration
  def change
  	add_column :static_pages, :news, :boolean, default: true
  	add_column :static_page_translations, :title, :string
  end
end
