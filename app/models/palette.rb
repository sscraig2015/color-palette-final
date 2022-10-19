class Palette < ApplicationRecord
    paginates_per 12

    belongs_to :user

end
