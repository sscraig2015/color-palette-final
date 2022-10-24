class CollectionsController < ApplicationController

    def create
        #front end checks if palette exists in collection
        #if its here then we can create the collection

        newColl = Collection.create!(permit_params)
        render json: newColl, status: :created
    end


    private

    def permit_params
        params.permit(:user_id, :palette_id)
    end
end
