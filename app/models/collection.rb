class Collection < ApplicationRecord
  belongs_to :user


  has_and_belongs_to_many :palettes
  has_many :tags, through: :palettes
  
  validates :title, :uniqueness => {:scope => :user_id}, presence: :true

end
