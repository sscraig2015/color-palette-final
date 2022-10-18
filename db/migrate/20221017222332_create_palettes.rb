class CreatePalettes < ActiveRecord::Migration[7.0]
  def change
    create_table :palettes do |t|
      t.string :hexValues, array: true
      t.integer :user_id
      t.string :tags, array: true

      t.timestamps
    end
  end
end
