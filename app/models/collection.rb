class Collection < ApplicationRecord
  belongs_to :user
  has_many :palettes

  has_and_belongs_to_many :palettes
end
