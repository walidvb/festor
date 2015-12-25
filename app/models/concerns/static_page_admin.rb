module StaticPageAdmin
  extend ActiveSupport::Concern

  included do
    rails_admin do
      configure :translations, :globalize_tabs
      edit do
      	field :public
      	field :header_image
      	field :translations
      end
  		list do
  			scopes [:news, :static]
  			field :title
  			field :updated_at
  			field :public
  		end
  	end
  end
end
