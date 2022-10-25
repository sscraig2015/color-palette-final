class TagPaletteSerializerSerializer < ActiveModel::Serializer
  attributes :user_id, :hexValues

  has_many :tags

end
