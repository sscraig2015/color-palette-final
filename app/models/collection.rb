class Collection < ApplicationRecord
  belongs_to :user


  has_and_belongs_to_many :palettes
  has_many :tags, through: :palettes
  
  

end
