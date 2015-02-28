class StaticPage < ActiveRecord::Base
	translates :body, :slug

	### rails_admin
	rails_admin do
		list do
			field :slug do
				pretty_value do 
					bindings[:view].link_to(edit_path bindings[:object]) << value
					'asd' << value
				end
			end
			field :updated_at
		end
	end
end