class Palette < ApplicationRecord
    paginates_per 8

    belongs_to :user

end
