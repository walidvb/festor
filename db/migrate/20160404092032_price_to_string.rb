class PriceToString < ActiveRecord::Migration
  def up
    Event.add_translation_fields! price: :string
    Event.reset_column_information
    Event.all.each do |ev|
      [:fr, :en].each do |loc|
        I18n.locale = loc
        ev.price = "CHF #{ev.read_attribute(:price)}"
        ev.save!
      end
    end
    remove_column :events, :price
  end

  def down
    remove_column :event_translations, :price

  end
end
