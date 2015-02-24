Festor::Application.routes.draw do
	root "home#index"
  get "beta" => "beta#new"
  post "beta" => "beta#create"
	devise_for :users
	get "events/:id" => "events#show", as: :event

	devise_for :users
	get "events/:id" => "events#show", as: :event

	get "/workshop" => "events#index", as: :workshops

	get "/exhibition" => "events#index", as: :exhibitions

	get "/performance" => "events#index", as: :events

	resources :artists, only: [:index, :show]
  # scope "(:locale)", locale: /en|fr/, defaults: {locale: 'en'} do
  # end
	mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
end
