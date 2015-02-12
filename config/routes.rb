Festor::Application.routes.draw do

	root "events#index"    
	devise_for :users
	resources :events, only: [:show, :index]
	get "workshops" => "events#index", as: :workshops
	get "workshops/(:slug)" => "events#show", as: :workshop

	get "exhibitions" => "events#index", as: :exhibitions
	get "exhibitions/(:slug)" => "events#show", as: :exhibition

	get "performances" => "events#index", as: :performances
	get "performances/(:slug)" => "events#show", as: :performance

	get "clubbings" => "events#index", as: :clubbings
	get "clubbings/(:slug)" => "events#show", as: :clubbing

	resources :artists, only: [:index, :show]
  # scope "(:locale)", locale: /en|fr/, defaults: {locale: 'en'} do
  # end
	mount RailsAdmin::Engine => '/admin', as: 'rails_admin' 
end
