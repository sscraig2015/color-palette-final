class CollectionsController < ApplicationController

    def create
        @newColl = current_user.collections.create!(permit_params)
        if @newColl
            render json: @newColl, status: :created
        else
            render json: {error: "Collection title invalid."}, status: :invalid
        end
    end

    def update
        @collection = current_user.collections.where(title: params[:id]).first
        @collection.palettes << Palette.find_by(id: params[:palette_id])
        
        render json: current_user.collections, status: :ok

    end


    private

    def permit_params
        params.permit(:user_id, :palette_id, :title)
    end
end
