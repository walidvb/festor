class CreateEvents < ActiveRecord::Migration
  def up
    create_table :events do |t|
    	t.string 		:slug, index: true
      t.string    :type
    	t.timestamp	:schedule_start
    	t.timestamp	:schedule_end
      t.timestamps
    end

    Event.create_translation_table! title: :string, description: :text
  end
  def down
    drop_table :events
    Event.drop_translation_table!
  end
end
