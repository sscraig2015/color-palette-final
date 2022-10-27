class PalettesController < ApplicationController

    skip_before_action :authorize, only: [:index, :popular, :tag, :show, :search_tag]

    def index
        @palette = current_user.palettes.order(:created_at)
        render json: @palette, status: :ok
    end

    def create
        @palette = @current_user.palettes.create!(params_permit)
        render json: @palette, status: :created
    end

    def show
        @palette = Palette.find_by!(id: params[:id])
        render json: @palette, status: :ok
    end

    def update
        @tag = Tag.find_by(name: params[:tag])
        @palette = Palette.find_by(id: params[:id])

        if @tag  
            @updateTags = @palette.tags << @tag
            render json: {tags: @updateTags}, status: :created
        else
            @newTag = Tag.create(name: params[:tag])
            @updateTags = @palette.tags << @newTag
            render json: {tags: @updateTags}, status: :created
        end

    end

    def destroy
        @palette = current_user.palettes.find_by(id: params[:id])
        @palette.destroy
        
    end


    def popular
        render json: Palette.all.order(:created_at), status: :ok
    end

    def search_tag
        
        @palettes = Tag.where(name: params[:tag] )
        
            if @palettes.length === 0 
                render json: { errors: "Could not find any palettes with tag: #{params[:tag]}" }, status: :not_found
            else 
                render json: @palettes[0].palettes, status: :ok
            end
    end

    private

    def params_permit
        params.permit(:user_id, :username, :hexValues => [], :tags => [])
    end
end
