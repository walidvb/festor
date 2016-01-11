class AddTypeToPartners < ActiveRecord::Migration
  def change
    add_column :partners, :type, :string
  end
end
