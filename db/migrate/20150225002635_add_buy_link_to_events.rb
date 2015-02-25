class AddBuyLinkToEvents < ActiveRecord::Migration
  def change
    add_column :events, :buy_link, :string
  end
end
