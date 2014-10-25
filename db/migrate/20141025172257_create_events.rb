class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
    	t.string		:title
    	t.string		:description
    	t.timestamp	:schedule
      t.timestamps
    end
  end
end
