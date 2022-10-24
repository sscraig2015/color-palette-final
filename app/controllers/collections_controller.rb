class CollectionsController < ApplicationController

    def create

        @newColl = current_user.collections.create!(permit_params)
        render json: @newColl, status: :created
    end

    def update
        
        @collection = current_user.collections.where(title: params[:id]).first
        @collection.palettes << Palette.find_by(id: params[:palette_id])
        
        render json: @collection, status: :ok

        
    end


    private

    def permit_params
        params.permit(:user_id, :palette_id, :title)
    end
end
