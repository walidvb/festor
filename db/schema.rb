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

ActiveRecord::Schema.define(version: 20170319164602) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "artist_translations", force: true do |t|
    t.integer  "artist_id",  null: false
    t.string   "locale",     null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "biography"
  end

  add_index "artist_translations", ["artist_id"], name: "index_artist_translations_on_artist_id", using: :btree
  add_index "artist_translations", ["locale"], name: "index_artist_translations_on_locale", using: :btree

  create_table "artists", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "profile_picture_file_name"
    t.string   "profile_picture_content_type"
    t.integer  "profile_picture_file_size"
    t.datetime "profile_picture_updated_at"
    t.string   "slug"
    t.string   "label"
    t.string   "country"
    t.string   "website"
    t.integer  "position"
    t.string   "type"
    t.boolean  "featured"
    t.boolean  "published",                    default: false
    t.string   "image_url"
    t.integer  "zf_id"
  end

  create_table "assets", force: true do |t|
    t.string   "file_file_name"
    t.string   "file_content_type"
    t.integer  "file_file_size"
    t.datetime "file_updated_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "assetable_id"
    t.string   "assetable_type"
    t.string   "video"
  end

  create_table "bookings", force: true do |t|
    t.integer  "artist_id",  null: false
    t.integer  "event_id",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "bookings", ["artist_id"], name: "index_bookings_on_artist_id", using: :btree
  add_index "bookings", ["event_id"], name: "index_bookings_on_event_id", using: :btree

  create_table "delayed_jobs", force: true do |t|
    t.integer  "priority",   default: 0, null: false
    t.integer  "attempts",   default: 0, null: false
    t.text     "handler",                null: false
    t.text     "last_error"
    t.datetime "run_at"
    t.datetime "locked_at"
    t.datetime "failed_at"
    t.string   "locked_by"
    t.string   "queue"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "delayed_jobs", ["priority", "run_at"], name: "delayed_jobs_priority", using: :btree

  create_table "event_dates", force: true do |t|
    t.integer  "event_id"
    t.datetime "start"
    t.datetime "end"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "dateable_type"
    t.integer  "zf_id"
  end

  add_index "event_dates", ["event_id"], name: "index_event_dates_on_event_id", using: :btree

  create_table "event_translations", force: true do |t|
    t.integer  "event_id",          null: false
    t.string   "locale",            null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "title"
    t.text     "description"
    t.string   "slug"
    t.string   "participants"
    t.string   "languages"
    t.text     "requirements"
    t.text     "material"
    t.text     "notes"
    t.string   "price"
    t.string   "tickets_link"
    t.text     "short_description"
    t.string   "sub_section"
    t.text     "registration"
  end

  add_index "event_translations", ["event_id"], name: "index_event_translations_on_event_id", using: :btree
  add_index "event_translations", ["locale"], name: "index_event_translations_on_locale", using: :btree

  create_table "events", force: true do |t|
    t.string   "slug"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "location_id"
    t.string   "main_image_file_name"
    t.string   "main_image_content_type"
    t.integer  "main_image_file_size"
    t.datetime "main_image_updated_at"
    t.string   "section"
    t.boolean  "featured"
    t.integer  "position"
    t.boolean  "published",               default: false
    t.string   "image_url"
    t.integer  "zf_id"
  end

  add_index "events", ["location_id"], name: "index_events_on_location_id", using: :btree

  create_table "extra_info_translations", force: true do |t|
    t.integer  "extra_info_id", null: false
    t.string   "locale",        null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "body"
    t.string   "title"
  end

  add_index "extra_info_translations", ["extra_info_id"], name: "index_extra_info_translations_on_extra_info_id", using: :btree
  add_index "extra_info_translations", ["locale"], name: "index_extra_info_translations_on_locale", using: :btree

  create_table "extra_infos", force: true do |t|
    t.integer  "event_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "links", force: true do |t|
    t.integer  "linkable_id"
    t.string   "text_to_show"
    t.string   "url"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "linkable_type"
  end

  create_table "location_translations", force: true do |t|
    t.integer  "location_id", null: false
    t.string   "locale",      null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "infos"
  end

  add_index "location_translations", ["locale"], name: "index_location_translations_on_locale", using: :btree
  add_index "location_translations", ["location_id"], name: "index_location_translations_on_location_id", using: :btree

  create_table "locations", force: true do |t|
    t.string   "name"
    t.text     "address"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.float    "latitude"
    t.float    "longitude"
    t.string   "slug"
    t.integer  "zf_id"
  end

  add_index "locations", ["slug"], name: "index_locations_on_slug", using: :btree

  create_table "message_translations", force: true do |t|
    t.integer  "message_id", null: false
    t.string   "locale",     null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "message"
    t.string   "link"
  end

  add_index "message_translations", ["locale"], name: "index_message_translations_on_locale", using: :btree
  add_index "message_translations", ["message_id"], name: "index_message_translations_on_message_id", using: :btree

  create_table "messages", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "colorbox",   default: false
  end

  create_table "news", force: true do |t|
    t.string   "link"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "colorbox",   default: false
  end

  create_table "partners", force: true do |t|
    t.string   "name"
    t.string   "link"
    t.string   "logo_file_name"
    t.string   "logo_content_type"
    t.integer  "logo_file_size"
    t.datetime "logo_updated_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "type"
  end

  create_table "previous_editions", force: true do |t|
    t.integer  "edition"
    t.string   "thumbnail_file_name"
    t.string   "thumbnail_content_type"
    t.integer  "thumbnail_file_size"
    t.datetime "thumbnail_updated_at"
    t.string   "url"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "screenshots", force: true do |t|
    t.string   "screenshot_file_name"
    t.string   "screenshot_content_type"
    t.integer  "screenshot_file_size"
    t.datetime "screenshot_updated_at"
    t.string   "ip"
    t.string   "country_name"
    t.string   "device_type"
    t.string   "location"
    t.float    "longitude"
    t.float    "latitude"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "city"
    t.string   "name"
    t.string   "user_agent"
    t.string   "dimensions"
  end

  create_table "setting_translations", force: true do |t|
    t.integer  "setting_id", null: false
    t.string   "locale",     null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "about"
    t.string   "volunteers"
    t.string   "tickets"
  end

  add_index "setting_translations", ["locale"], name: "index_setting_translations_on_locale", using: :btree
  add_index "setting_translations", ["setting_id"], name: "index_setting_translations_on_setting_id", using: :btree

  create_table "settings", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "static_page_translations", force: true do |t|
    t.integer  "static_page_id", null: false
    t.string   "locale",         null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "body"
    t.string   "title"
  end

  add_index "static_page_translations", ["locale"], name: "index_static_page_translations_on_locale", using: :btree
  add_index "static_page_translations", ["static_page_id"], name: "index_static_page_translations_on_static_page_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "email",                  default: "",    null: false
    t.string   "encrypted_password",     default: "",    null: false
    t.boolean  "admin",                  default: false, null: false
    t.boolean  "locked",                 default: false, null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true, using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  create_table "zone_festivals", force: true do |t|
    t.json     "data"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
