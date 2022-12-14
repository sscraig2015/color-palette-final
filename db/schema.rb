# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_10_24_040236) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "collections", force: :cascade do |t|
    t.string "title"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_collections_on_user_id"
  end

  create_table "collections_palettes", id: false, force: :cascade do |t|
    t.bigint "collection_id"
    t.bigint "palette_id"
    t.index ["collection_id"], name: "index_collections_palettes_on_collection_id"
    t.index ["palette_id"], name: "index_collections_palettes_on_palette_id"
  end

  create_table "favorites", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "palette_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["palette_id"], name: "index_favorites_on_palette_id"
    t.index ["user_id"], name: "index_favorites_on_user_id"
  end

  create_table "palettes", force: :cascade do |t|
    t.string "hexValues", array: true
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "palettes_tags", id: false, force: :cascade do |t|
    t.bigint "palette_id", null: false
    t.bigint "tag_id", null: false
    t.index ["palette_id", "tag_id"], name: "index_palettes_tags_on_palette_id_and_tag_id"
  end

  create_table "tags", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "collections", "users"
  add_foreign_key "favorites", "palettes"
  add_foreign_key "favorites", "users"
end
