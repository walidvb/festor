Festor::Application.routes.draw do


  get "beta" => "beta#new"
  match "/upload" => "assets#upload", via: :post
  scope "(:locale)", locale: /en|fr/, defaults: {locale: 'en'} do
		root "home#index"
		#root "events#index", type: :workshop
	  post "beta" => "beta#create"
		devise_for :users
		#get "events/:id" => "events#show", as: :event
		resources :events, controller: "events", only: [:show, :index], type: :single_event
		resources :workshops, controller: "events", only: [:show, :index], type: :workshop
		resources :exhibitions, controller: "events", only: [:show, :index], type: :exhibition

		# get "/workshop" => "events#index", as: :workshops
		# get "/exhibition" => "events#index", as: :exhibitions
		# get "/performance" => "events#index", as: :events

		resources :artists, only: [:index, :show]
	  resources :static_pages, only: [:show]
	  resources :news, controller: 'static_pages', only: [:index, :show]
	  
		mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
  end
end
