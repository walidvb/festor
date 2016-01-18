class CreatePreviousEditions < ActiveRecord::Migration
  def change
    create_table :previous_editions do |t|
      t.integer :edition
      t.attachment :thumbnail
      t.string :url
      t.timestamps
    end
  end
end
