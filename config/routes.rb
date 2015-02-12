Festor::Application.routes.draw do

	root "events#index"    
	devise_for :users
	get "events/:type/:id" => "events#show"

	get "events/workshop" => "events#index", as: :workshops
	get "events/workshop/(:slug)" => "events#show", as: :workshop

	get "events/exhibition" => "events#index", as: :exhibitions
	get "events/exhibition/(:slug)" => "events#show", as: :exhibition

	get "events/performance" => "events#index", as: :performances
	get "events/performance/(:slug)" => "events#show", as: :performance

	get "events/clubbing" => "events#index", as: :clubbings
	get "events/clubbing/(:slug)" => "events#show", as: :clubbing

	resources :artists, only: [:index, :show]
  # scope "(:locale)", locale: /en|fr/, defaults: {locale: 'en'} do
  # end
	mount RailsAdmin::Engine => '/admin', as: 'rails_admin' 
end
