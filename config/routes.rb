Rails.application.routes.draw do
 
 
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
