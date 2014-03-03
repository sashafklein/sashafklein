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
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20140303015435) do

  create_table "emails", :force => true do |t|
    t.string   "subject"
    t.string   "content"
    t.string   "name"
    t.string   "address"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "notes", :force => true do |t|
    t.string   "name"
    t.string   "info"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer  "topic_id"
  end

  create_table "portfolio_items", :force => true do |t|
    t.string "title"
    t.string "subtitle"
    t.string "image"
    t.string "link"
    t.text   "bullet_blob"
    t.text   "text_blob"
  end

  create_table "posts", :force => true do |t|
    t.string   "name"
    t.text     "content"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.string   "slug"
    t.text     "example"
  end

  add_index "posts", ["slug"], :name => "index_posts_on_slug", :unique => true

  create_table "resume_items", :force => true do |t|
    t.string  "title"
    t.string  "kind"
    t.string  "subtitle"
    t.string  "link"
    t.boolean "starts_open", :default => false
    t.text    "description"
  end

  create_table "skills", :force => true do |t|
    t.string  "name"
    t.string  "tooltip"
    t.integer "stars"
    t.string  "link"
  end

  create_table "topics", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
    t.integer  "wiki_id"
  end

  create_table "users", :force => true do |t|
    t.string   "name"
    t.string   "password_digest"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
  end

  create_table "wikis", :force => true do |t|
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

end
