class User < ApplicationRecord
    has_secure_password

    has_many :palettes
    has_many :collections

    validates :username, presence: true, uniqueness: true
    validates :password, presence: true
    validates :password_confirmation, presence: true
end
