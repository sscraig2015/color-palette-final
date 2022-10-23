Rails.application.routes.draw do
resources :tags
resources :favorites
resources :palettes, only: [:create, :show, :delete]
patch '/palettes/:id', to: 'palettes#update_tag'

get '/api/palettes/popular', to: 'palettes#popular'
get '/api/tags/:tag', to: 'palettes#search_tag'

get 'users/:id/:page', to: 'palettes#index'
 
#Signing in
post '/signin', to: 'sessions#create'
get '/me', to: 'users#auth'

#Sign up
post '/signup', to: 'users#create'

#End Session
delete '/sessions', to: 'sessions#destroy'
 
 get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
