class ApplicationController < ActionController::API
    include ActionController::Cookies
    rescue_from ActiveRecord::RecordInvalid, with: :recordInvalid
    rescue_from ActiveRecord::RecordNotFound, with: :recordNotFound
 
 
    before_action :authorize

    def current_user
        if session[:user_id]
            @current_user ||= User.find_by(id: session[:user_id])
        end
    end
    
    private

    def recordNotFound
        render json: { errors: ["User not found."]}, status: :not_found
    end

    def authorize

        render json: { errors: ["User not authorized."] }, status: :unauthorized unless current_user
    end

    def recordInvalid(error)
        @length = error.to_s.length
        render json: { error: [error.to_s[19..@length] ] }, status: :not_found
    end
end
