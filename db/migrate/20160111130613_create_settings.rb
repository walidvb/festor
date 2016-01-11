class CreateSettings < ActiveRecord::Migration
  def change
    create_table :settings do |t|
      t.timestamps
    end
    Setting.create_translation_table! about: :text
    Setting.create!
  end
end
