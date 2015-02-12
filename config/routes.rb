Festor::Application.routes.draw do

	root "events#index"    
	devise_for :users
	get "events/:id" => "events#show"

	get "/workshop" => "events#index", as: :workshops

	get "/exhibition" => "events#index", as: :exhibitions

	get "/performance" => "events#index", as: :performances

	get "/clubbing" => "events#index", as: :clubbing

	resources :artists, only: [:index, :show]
  # scope "(:locale)", locale: /en|fr/, defaults: {locale: 'en'} do
  # end
	mount RailsAdmin::Engine => '/admin', as: 'rails_admin' 
end
