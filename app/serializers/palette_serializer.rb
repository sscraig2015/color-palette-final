class PaletteSerializer < ActiveModel::Serializer
  attributes :id, :hexValues, :user_id, :tags
end
