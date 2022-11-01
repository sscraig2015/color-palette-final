class UsersController < ApplicationController

    skip_before_action :authorize, only: [:create]

    def create
        @user = User.create!(user_params)
        render json: @user, status: :created
    end

    def show
        @currentUser = current_user
        render json: @currentUser, include: [['collections', 'collections.palettes'], ['palettes', 'palettes.tags']],  status: :ok
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :palette)
    end
end