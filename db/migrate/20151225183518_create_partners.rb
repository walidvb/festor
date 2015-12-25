class CreatePartners < ActiveRecord::Migration
  def change
    create_table :partners do |t|
      t.string :name
      t.string :link
      t.attachment :logo
      t.timestamps
    end
  end
end
