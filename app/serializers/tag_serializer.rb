class TagSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_one :user
end
