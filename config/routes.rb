Rails.application.routes.draw do
 
 
#Signing in
post '/signin', to: 'sessions#create'
get '/me', to: 'users#auth'
 
 get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
