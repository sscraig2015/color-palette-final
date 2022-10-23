class RemovePaletteIdFromTags < ActiveRecord::Migration[7.0]
  def change
    change_table :tags do |t|
      t.remove_references :palette
    end
  end
end
