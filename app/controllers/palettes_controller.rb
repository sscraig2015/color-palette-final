class PalettesController < ApplicationController

    skip_before_action :authorize, only: [:index, :popular, :tag, :show]

    def index
        @palette = User.find_by!(params_permit).palettes.order(:created_at).page(params[:page])
        render json: {
            palettes: @palette,
            totalPages: User.find_by!(params_permit).palettes.page(params[:page]).total_pages,
            currentPage: User.find_by!(params_permit).palettes.page(params[:page]).current_page,
            }, status: :ok
    end

    def popular
        render json: {
            palettes: Palette.all.order(:created_at).page(params[:page]),
            totalPages: Palette.all.page(params[:page]).total_pages,
            currentPage: Palette.all.page(params[:page]).current_page,
            }, status: :ok
    end

    def tag
        @palettes = Palette.where("'#{params[:tag]}' = ANY (tags)").page(params[:page])
            if @palettes.length === 0 
                render json: { errors: "Could not find any palettes with tag: #{params[:tag]}" }, status: :not_found
            else 
                render json: {
                    palettes: @palettes,
                    totalPages: Palette.where("'#{params[:tag]}' = ANY (tags)").page(params[:page]).total_pages,
                    currentPage: Palette.where("'#{params[:tag]}' = ANY (tags)").page(params[:page]).current_page,
                }, status: :ok
            end
    end

    def create
        @palette = @current_user.palettes.create!(params_permit)
        render json: @palette, status: :created
    end

    def show
        @palette = Palette.find_by!(id: params[:id])
        render json: @palette, include: ['favorites'], status: :ok
    end

    def update_tag
        @currentTags = Palette.find_by(id: params[:id]).tags
        @updateTags = [*@currentTags, params[:tags].downcase]
        tags = Palette.find_by(id: params[:id]).update!(tags: @updateTags)
        render json: tags, status: :created

    end

    private

    def params_permit
        params.permit(:user_id, :username, :hexValues => [], :tags => [])
    end
end
