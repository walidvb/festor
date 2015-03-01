class StaticPage < ActiveRecord::Base
	translates :body, :slug
	accepts_nested_attributes_for :translations, allow_destroy: true

	### rails_admin
	rails_admin do
    configure :translations, :globalize_tabs
    object_label_method do
      :slug
    end
		list do
			field :position do 
				sortable true
			end
			field :slug do
				pretty_value do 
					value = bindings[:view].link_to(edit_path bindings[:object])
				end
			end
			field :updated_at
		end
	end
end