Festor::Application.routes.draw do
	scope(path: "/2015") do 
	  get "beta" => "beta#new"
	  post "beta" => "beta#create"
		root "events#index"    
		devise_for :users
		get "events/:id" => "events#show", as: :event

		get "/workshop" => "events#index", as: :workshops

		get "/exhibition" => "events#index", as: :exhibitions

		get "/performance" => "events#index", as: :performances

		get "/clubbing" => "events#index", as: :clubbing

		resources :artists, only: [:index, :show]
	  # scope "(:locale)", locale: /en|fr/, defaults: {locale: 'en'} do
	  # end
		mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
	end
end
