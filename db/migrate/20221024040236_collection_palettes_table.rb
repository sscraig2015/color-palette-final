class CollectionPalettesTable < ActiveRecord::Migration[7.0]
  def change
    create_table :collections_palettes, id: false do |t|
      t.belongs_to :collection
      t.belongs_to :palette
    end
  end
end
