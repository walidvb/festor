class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
    	t.string		:title
    	t.string		:description
    	t.string 		:slug, index: true
    	t.timestamp	:schedule
      t.timestamps
    end
  end
end
