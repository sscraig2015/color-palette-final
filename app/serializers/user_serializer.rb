class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :palettes, :collections

  has_many :collections, serializer: CollectionPaletteSerializer
end
