class TranslateTicktsLinks < ActiveRecord::Migration
  def change
    Event.add_translation_fields! tickets_link: :string
    Event.reset_column_information

    Event.all.each do |ev|
      ev.tickets_link = ev.buy_link
      ev.save!
    end
    remove_column :events, :buy_link
  end
end
