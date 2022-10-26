class UserSerializer < ActiveModel::Serializer
  attributes :id, :username

  has_many :palettes
  has_many :collections
  
end
