class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
    	t.string		:title_en, :title_fr
    	t.string		:description_en, :description_fr
    	t.string 		:slug, index: true
    	t.timestamp	:schedule
      t.timestamps
    end
  end
end
