class UsersController < ApplicationController

    skip_before_action :authorize, only: [:create, :show, :index]

    def create
        
        @user = User.create!(user_params)
        render json: @user, status: :created
    end

    def auth
        @currentUser = current_user
        
        render json: @currentUser, include: ['collections', 'collections.palettes'], status: :ok
    end

    def show
        @currentUser = User.find_by!(username: params[:username])
        render json: @currentUser, status: :ok
    end

    def index
        @user = User.find_by!(id: params[:id])
        render json: @user, status: :ok

    end


    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :palette)
    end
end