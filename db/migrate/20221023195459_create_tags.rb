class CreateTags < ActiveRecord::Migration[7.0]
  def change
    create_table :tags do |t|
      t.string :name
      t.belongs_to :palette, null: false, foreign_key: true

      t.timestamps
    end
  end
end
