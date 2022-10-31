Rails.application.routes.draw do
resources :collections, only: [:create, :update]
resources :palettes, only: [:create, :show, :destroy, :update]



#Find community palettes
get '/api/palettes/popular/', to: 'palettes#popular'
get '/api/palettes/:tag/', to: 'palettes#search_tag'


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
