class Tag < ApplicationRecord

  paginates_per 12
  
  has_and_belongs_to_many :palettes
end
