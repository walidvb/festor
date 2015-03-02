class CreateStaticPages < ActiveRecord::Migration
  def up
    create_table :static_pages do |t|
    	t.integer	:position
      t.timestamps
    end
    StaticPage.create_translation_table! slug: :string, body: :text
  end

  def down
  	StaticPage.drop_translation_table!
  	drop_table 	:static_pages
  end
end
