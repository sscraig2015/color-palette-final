class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :palettes

  has_many :palettes, serializer: TagPaletteSerializerSerializer
  has_many :collections
  
  
  
end
