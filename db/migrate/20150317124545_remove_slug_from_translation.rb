class RemoveSlugFromTranslation < ActiveRecord::Migration
  def change
  	add_column :static_pages, :slug, :string, index: true
  	remove_column :static_page_translations, :slug, :string
  	StaticPage.all.each(&:save!)
  end
end
