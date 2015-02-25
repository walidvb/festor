class CreateLinks < ActiveRecord::Migration
  def change
    create_table :links do |t|
    	t.references :event
    	t.string :text_to_show
    	t.string :url
      t.timestamps
    end
  end
end
