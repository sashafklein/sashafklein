# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150924183026) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "emails", force: :cascade do |t|
    t.string   "subject",    limit: 255
    t.string   "content",    limit: 255
    t.string   "name",       limit: 255
    t.string   "address",    limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "notes", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.string   "info",       limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.integer  "topic_id"
  end

  create_table "portfolio_items", force: :cascade do |t|
    t.string  "title",     limit: 255
    t.string  "subtitle",  limit: 255
    t.string  "image",     limit: 255
    t.string  "link",      limit: 255
    t.text    "text_blob"
    t.text    "bullets",               default: [], array: true
    t.integer "order"
  end

  create_table "posts", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.text     "content"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.string   "slug",       limit: 255
    t.text     "example"
  end

  add_index "posts", ["slug"], name: "index_posts_on_slug", unique: true, using: :btree

  create_table "resume_items", force: :cascade do |t|
    t.string   "title",       limit: 255
    t.string   "kind",        limit: 255
    t.string   "link",        limit: 255
    t.boolean  "starts_open",             default: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "roles", force: :cascade do |t|
    t.datetime "started"
    t.datetime "ended"
    t.string   "name"
    t.boolean  "show_months"
    t.text     "description"
    t.string   "location"
    t.integer  "resume_item_id"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  add_index "roles", ["resume_item_id"], name: "index_roles_on_resume_item_id", using: :btree

  create_table "skills", force: :cascade do |t|
    t.string  "name",    limit: 255
    t.string  "tooltip", limit: 255
    t.integer "stars"
    t.string  "link",    limit: 255
  end

  create_table "topics", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.integer  "wiki_id"
  end

  create_table "users", force: :cascade do |t|
    t.string   "name",            limit: 255
    t.string   "password_digest", limit: 255
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  create_table "wikis", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "roles", "resume_items"
end
