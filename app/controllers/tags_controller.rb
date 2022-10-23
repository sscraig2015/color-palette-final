class TagsController < ApplicationController
    
    def create
        tag = Tag.find_by(name: params[:tag])
        
        if tag  
            debugger
            @updatedTags = Palette.find_by(id: params[:id]).tags << tag

            Palette.find_by(id: params[:id]).update!(tags: @updateTags)
            render json: @updateTags, status: :created
        else
            @newTag = Tag.create!(name: tag)
            render json: @newTag, status: :created
        end

    end
end
