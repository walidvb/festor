Festor::Application.routes.draw do

	get "beta" => "beta#new"
	match "/upload" => "assets#upload", via: :post
	scope "(:locale)", locale: /en|fr/, defaults: {locale: 'en'} do
		post "beta" => "beta#create"
		devise_for :users
		get "home" => 'home#index'
		#get "events/:id" => "events#show", as: :event
		resources :events, controller: "events", only: [:show, :index], category: :single_event, as: :single_events
		resources :workshops, controller: "events", only: [:show, :index], category: :workshop
		resources :exhibitions, controller: "events", only: [:show, :index], category: :exhibition

		resources :venues, controller: 'locations', only: [:index]

		resources :artists, only: [:index, :show]

    resources :partners, only: [:index]
		get "admin/artists/sort" => 'artists#sortable_index'
		post "admin/artists/sort" => 'artists#sort_update'
		post "admin/events/sort" => 'events#sort_update'
		get "admin/events/sort" => 'events#sortable_index'

		resources :static_pages, only: [:show]
		resources :news, controller: 'static_pages', only: [:index, :show]

		root "events#index", category: :workshop
		get "/gallery" => 'static#gallery', as: :gallery
		get "/about" => 'static#about', as: :about
		mount RailsAdmin::Engine => '/admin', as: 'rails_admin'
	end
end
