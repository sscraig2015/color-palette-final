class User < ApplicationRecord
    has_secure_password

    has_many :palettes

    validates :username, presence: true, uniqueness: true
    validates :password, presence: true
end
