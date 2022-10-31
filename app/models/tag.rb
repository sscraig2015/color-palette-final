class Tag < ApplicationRecord

  has_and_belongs_to_many :palettes

  validates :name, uniqueness: true
end
