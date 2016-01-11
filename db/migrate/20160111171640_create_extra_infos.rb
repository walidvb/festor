class CreateExtraInfos < ActiveRecord::Migration
  def change
    create_table :extra_infos do |t|
      t.references :event
      t.timestamps
    end
    ExtraInfo.create_translation_table! body: :text, title: :string
  end
end
