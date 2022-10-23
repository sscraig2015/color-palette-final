class RemoveTagsArrayFromPalettesTable < ActiveRecord::Migration[7.0]
  def change
    remove_column :palettes, :tags
  end
end
