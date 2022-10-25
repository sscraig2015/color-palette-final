class CollectionSerializer < ActiveModel::Serializer
  attributes :id, :title

  has_many :palettes, serializer: TagPaletteSerializerSerializer
end
