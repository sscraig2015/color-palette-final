class CreateJoinTablePaletteTag < ActiveRecord::Migration[7.0]
  def change
    create_join_table :palettes, :tags do |t|
      t.index [:palette_id, :tag_id]

    end
  end
end
