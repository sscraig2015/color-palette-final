class Palette < ApplicationRecord
    paginates_per 12

    belongs_to :user
    
    has_and_belongs_to_many :tags
    has_and_belongs_to_many :collections

end
