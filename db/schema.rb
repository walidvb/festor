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

ActiveRecord::Schema.define(version: 20160112144333) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_stat_statements"
  enable_extension "plpgsql"

  create_table "active_admin_comments", force: true do |t|
    t.string   "namespace"
    t.text     "body"
    t.string   "resource_id",   null: false
    t.string   "resource_type", null: false
    t.integer  "author_id"
    t.string   "author_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "active_admin_comments", ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id", using: :btree
  add_index "active_admin_comments", ["namespace"], name: "index_active_admin_comments_on_namespace", using: :btree
  add_index "active_admin_comments", ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id", using: :btree

  create_table "admin_users", force: true do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "admin_users", ["email"], name: "index_admin_users_on_email", unique: true, using: :btree
  add_index "admin_users", ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true, using: :btree

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
    t.string   "origin"
    t.string   "link"
    t.text     "profile_picture_meta"
    t.integer  "position"
    t.string   "type"
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

  create_table "bookmarks", force: true do |t|
    t.integer  "user_id"
    t.integer  "chapter_id"
    t.integer  "paragraph_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "schedule_id",  null: false
  end

  add_index "bookmarks", ["schedule_id"], name: "index_bookmarks_on_schedule_id", using: :btree

  create_table "books", force: true do |t|
    t.string   "title"
    t.string   "author"
    t.text     "blurb_long"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "chapters_count",                  default: 0
    t.integer  "subscriptions_count",             default: 0
    t.string   "slug"
    t.text     "sample"
    t.string   "mood_board_image_file_name"
    t.string   "mood_board_image_content_type"
    t.integer  "mood_board_image_file_size"
    t.datetime "mood_board_image_updated_at"
    t.string   "author_image_file_name"
    t.string   "author_image_content_type"
    t.integer  "author_image_file_size"
    t.datetime "author_image_updated_at"
    t.string   "author_twitter"
    t.string   "praise_image_file_name"
    t.string   "praise_image_content_type"
    t.integer  "praise_image_file_size"
    t.datetime "praise_image_updated_at"
    t.string   "hashtag"
    t.integer  "draft_comments_count",            default: 0
    t.integer  "published_comments_count",        default: 0
    t.integer  "deleted_comments_count",          default: 0
    t.integer  "chapters_total",                  default: 10
    t.boolean  "is_private",                      default: true
    t.text     "author_about_long"
    t.integer  "chapter_price_gbp",                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       null: false
    t.integer  "chapter_price_usd"
    t.integer  "chapter_price_eur"
    t.string   "splash_header_file_name"
    t.string   "splash_header_content_type"
    t.integer  "splash_header_file_size"
    t.datetime "splash_header_updated_at"
    t.string   "splash_thumbnail_file_name"
    t.string   "splash_thumbnail_content_type"
    t.integer  "splash_thumbnail_file_size"
    t.datetime "splash_thumbnail_updated_at"
    t.text     "splash_video"
    t.boolean  "custom_price",                    default: false
    t.string   "twitter_text"
    t.text     "dedication"
    t.integer  "count_of_fake_users",             default: 0
    t.text     "styles",                          default: "/* mobile */\n@media (max-width:767px){\n}\n\n/* < Tablet / sm */\n@media (min-width:767px){\n}\n\n/* < md */\n@media (min-width:991px){\n}\n\n/* < lg */\n@media (min-width:1200px){\n}"
    t.string   "promo_message"
    t.string   "header_image_file_name"
    t.string   "header_image_content_type"
    t.integer  "header_image_file_size"
    t.datetime "header_image_updated_at"
    t.string   "square_image_file_name"
    t.string   "square_image_content_type"
    t.integer  "square_image_file_size"
    t.datetime "square_image_updated_at"
    t.text     "square_image_base64"
    t.string   "blurb_short"
    t.text     "preview"
    t.text     "copyright",                       default: "<p>\nPublished by The Pigeonhole YYYY\n</p>\n<p>\nCopyright &copy; XXXX YYYY\n</p>\n<p>\nThe right of XXXX to be identified as author of this work has been asserted in accordance with Section 77 of the Copyright, Designs and Patents Act 1988.\n</p>\n<p>This book is sold to you subject to the condition that it shall not, by way of trade or otherwise, be lent, resold, hired out, or otherwise circulated without the publisher’s prior consent in any format, form of binding or cover, other than that in which it is published and without a similar condition including this condition being imposed on the subsequent purchaser.</p>\n<p>\nPigeonhole Publishing Ltd. Reg. No. 8519825\n</p>"
    t.string   "email_header_image_file_name"
    t.string   "email_header_image_content_type"
    t.integer  "email_header_image_file_size"
    t.datetime "email_header_image_updated_at"
    t.integer  "chapter_price_egp"
    t.integer  "chapter_price_inr"
    t.integer  "chapter_price_kes"
    t.integer  "chapter_price_mxn"
    t.integer  "chapter_price_ngn"
    t.integer  "chapter_price_zar"
    t.text     "facebook_conversion_tracking"
    t.text     "custom_thank_you",                default: "As promised we let you decide to pay what you think <em>book title</em> is worth."
    t.boolean  "previewable",                     default: false
    t.integer  "subscription_email_preview_id"
    t.integer  "subscription_email_live_id"
    t.integer  "chapter_price_chf"
    t.integer  "chapter_price_aud"
    t.text     "email_header_image_base64"
    t.text     "author_about_short"
    t.text     "why_we_like_it"
    t.string   "tweets"
    t.text     "blurb"
    t.boolean  "promoted_to_front_page",          default: false
  end

  create_table "chapters", force: true do |t|
    t.text     "body"
    t.integer  "book_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "title"
    t.string   "file_file_name"
    t.string   "file_content_type"
    t.integer  "file_file_size"
    t.datetime "file_updated_at"
    t.string   "all_chapters_until_self_file_name"
    t.string   "all_chapters_until_self_content_type"
    t.integer  "all_chapters_until_self_file_size"
    t.datetime "all_chapters_until_self_updated_at"
    t.integer  "position"
    t.text     "annotated_body"
    t.string   "tile_title"
    t.string   "tile_description"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
  end

  create_table "charges", force: true do |t|
    t.integer  "user_id",                            null: false
    t.integer  "book_id"
    t.string   "stripe_customer_id"
    t.string   "stripe_charge_id"
    t.integer  "first_chapter"
    t.integer  "number_of_chapters"
    t.integer  "amount"
    t.string   "currency"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "one_off",            default: false
    t.string   "stripe_token"
    t.integer  "discount",           default: 0
    t.string   "description"
    t.boolean  "test",               default: false
  end

  add_index "charges", ["book_id"], name: "index_charges_on_book_id", using: :btree
  add_index "charges", ["user_id"], name: "index_charges_on_user_id", using: :btree

  create_table "comments", force: true do |t|
    t.integer  "user_id"
    t.integer  "holder_id"
    t.integer  "commentable_id"
    t.string   "commentable_type"
    t.string   "commentable_url"
    t.string   "commentable_title"
    t.string   "commentable_state"
    t.string   "anchor"
    t.string   "title"
    t.string   "contacts"
    t.text     "raw_content"
    t.text     "content"
    t.string   "view_token"
    t.string   "state",             default: "draft"
    t.string   "ip",                default: "undefined"
    t.string   "referer",           default: "undefined"
    t.string   "user_agent",        default: "undefined"
    t.integer  "tolerance_time"
    t.boolean  "spam",              default: false
    t.integer  "parent_id"
    t.integer  "lft"
    t.integer  "rgt"
    t.integer  "depth",             default: 0
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "competitions", force: true do |t|
    t.string   "page_title"
    t.string   "subtitle"
    t.string   "facebook_message",          default: "Know writers? Tell them."
    t.string   "facebook_meta_desc"
    t.string   "twitter_message",           default: "Know writers? Tell them."
    t.string   "twitter_shared_text"
    t.string   "header"
    t.text     "message"
    t.string   "button_message"
    t.string   "button_call_to_action"
    t.string   "button_text"
    t.integer  "book_id"
    t.string   "header_image_file_name"
    t.string   "header_image_content_type"
    t.integer  "header_image_file_size"
    t.datetime "header_image_updated_at"
    t.string   "thumbnail_file_name"
    t.string   "thumbnail_content_type"
    t.integer  "thumbnail_file_size"
    t.datetime "thumbnail_updated_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "ribbon_text",               default: "Competition"
    t.boolean  "active",                    default: false
  end

  create_table "data_migrations", id: false, force: true do |t|
    t.string "version", null: false
  end

  add_index "data_migrations", ["version"], name: "unique_data_migrations", unique: true, using: :btree

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

  create_table "discount_tokens", force: true do |t|
    t.datetime "expiration_date"
    t.integer  "amount",          default: 1
    t.string   "token"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "threshold"
    t.integer  "creator_id"
  end

  add_index "discount_tokens", ["token"], name: "index_discount_tokens_on_token", using: :btree

  create_table "discounts", force: true do |t|
    t.integer  "amount",            default: 1
    t.integer  "book_id"
    t.integer  "user_id"
    t.integer  "referrer_id"
    t.datetime "consumed_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "source",            default: "manual"
    t.integer  "discount_token_id"
  end

  create_table "emails", force: true do |t|
    t.string   "title"
    t.string   "subject"
    t.text     "body"
    t.integer  "book_id"
    t.datetime "scheduled_for"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "indestructible", default: false
    t.boolean  "approved",       default: false
    t.boolean  "sent",           default: false
    t.integer  "delayed_job_id"
    t.text     "kindle_body"
    t.string   "type"
  end

  create_table "event_dates", force: true do |t|
    t.integer  "event_id"
    t.datetime "start"
    t.datetime "end"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "event_dates", ["event_id"], name: "index_event_dates_on_event_id", using: :btree

  create_table "event_translations", force: true do |t|
    t.integer  "event_id",     null: false
    t.string   "locale",       null: false
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
  end

  add_index "event_translations", ["event_id"], name: "index_event_translations_on_event_id", using: :btree
  add_index "event_translations", ["locale"], name: "index_event_translations_on_locale", using: :btree

  create_table "events", force: true do |t|
    t.string   "slug"
    t.string   "type"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "location_id"
    t.string   "main_image_file_name"
    t.string   "main_image_content_type"
    t.integer  "main_image_file_size"
    t.datetime "main_image_updated_at"
    t.string   "buy_link"
    t.string   "category"
    t.boolean  "featured"
    t.integer  "position"
    t.integer  "price"
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

  create_table "faqs", force: true do |t|
    t.text     "question"
    t.text     "answer"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "highlights", force: true do |t|
    t.integer "user_id"
    t.integer "chapter_id"
    t.integer "start_wid",  null: false
    t.integer "end_wid",    null: false
  end

  add_index "highlights", ["chapter_id"], name: "index_highlights_on_chapter_id", using: :btree
  add_index "highlights", ["user_id"], name: "index_highlights_on_user_id", using: :btree

  create_table "home_pages", force: true do |t|
    t.string   "main_heading"
    t.string   "main_subheading"
    t.string   "call_to_action"
    t.string   "book_heading"
    t.integer  "book_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "home_pages", ["book_id"], name: "index_home_pages_on_book_id", using: :btree

  create_table "job_postings", force: true do |t|
    t.string   "title"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "position"
  end

  create_table "links", force: true do |t|
    t.integer  "linkable_id"
    t.string   "text_to_show"
    t.string   "url"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "linkable_type"
  end

  create_table "locations", force: true do |t|
    t.string   "name"
    t.text     "address"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "picture_file_name"
    t.string   "picture_content_type"
    t.integer  "picture_file_size"
    t.datetime "picture_updated_at"
  end

  create_table "optimizely_experiments", force: true do |t|
    t.string   "experiment_id"
    t.boolean  "active",        default: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "title"
  end

  create_table "paragraphs", force: true do |t|
    t.integer  "chapter_id"
    t.integer  "paragraph_id"
    t.integer  "draft_comments_count",     default: 0
    t.integer  "published_comments_count", default: 0
    t.integer  "deleted_comments_count",   default: 0
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "paragraphs", ["chapter_id"], name: "index_paragraphs_on_chapter_id", using: :btree

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

  create_table "pre_sign_ups", force: true do |t|
    t.string   "email"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name"
    t.boolean  "android_wanted"
  end

  create_table "reading_positions", force: true do |t|
    t.integer  "user_id"
    t.integer  "chapter"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "schedule_id", null: false
    t.integer  "pid"
  end

  add_index "reading_positions", ["schedule_id"], name: "index_reading_positions_on_schedule_id", using: :btree
  add_index "reading_positions", ["user_id"], name: "index_reading_positions_on_user_id", using: :btree

  create_table "schedules", force: true do |t|
    t.integer  "book_id",           null: false
    t.datetime "publish_date"
    t.integer  "publish_frequency"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "owner_id"
  end

  add_index "schedules", ["book_id"], name: "index_schedules_on_book_id", using: :btree
  add_index "schedules", ["owner_id"], name: "index_schedules_on_owner_id", using: :btree

  create_table "setting_translations", force: true do |t|
    t.integer  "setting_id", null: false
    t.string   "locale",     null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "about"
  end

  add_index "setting_translations", ["locale"], name: "index_setting_translations_on_locale", using: :btree
  add_index "setting_translations", ["setting_id"], name: "index_setting_translations_on_setting_id", using: :btree

  create_table "settings", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "splash_pages", force: true do |t|
    t.text     "subtitle"
    t.text     "message"
    t.string   "button_message"
    t.integer  "book_id"
    t.string   "header_image_file_name"
    t.string   "header_image_content_type"
    t.integer  "header_image_file_size"
    t.datetime "header_image_updated_at"
    t.string   "thumbnail_file_name"
    t.string   "thumbnail_content_type"
    t.integer  "thumbnail_file_size"
    t.datetime "thumbnail_updated_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "active",                    default: false
    t.string   "button_text"
    t.string   "button_call_to_action"
    t.string   "facebook_message",          default: "Read along with your friends and family"
    t.string   "twitter_message",           default: "Let your followers know on Twitter"
    t.string   "facebook_meta_desc"
    t.string   "twitter_tweet"
  end

  add_index "splash_pages", ["book_id"], name: "index_splash_pages_on_book_id", using: :btree

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

  create_table "static_pages", force: true do |t|
    t.integer  "position"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "news",                      default: true
    t.boolean  "public",                    default: false
    t.string   "header_image_file_name"
    t.string   "header_image_content_type"
    t.integer  "header_image_file_size"
    t.datetime "header_image_updated_at"
    t.string   "slug"
    t.text     "header_image_meta"
    t.boolean  "requires_authentication",   default: false
  end

  create_table "subscriptions", force: true do |t|
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "unsubscribed_at_chapter"
    t.integer  "last_chapter_read"
    t.integer  "last_seen_at_chapter"
    t.string   "reading_on"
    t.integer  "schedule_id",             null: false
  end

  add_index "subscriptions", ["schedule_id", "user_id"], name: "index_subscriptions_on_schedule_id_and_user_id", using: :btree
  add_index "subscriptions", ["schedule_id"], name: "index_subscriptions_on_schedule_id", using: :btree
  add_index "subscriptions", ["user_id"], name: "index_subscriptions_on_user_id", using: :btree

  create_table "tiles", force: true do |t|
    t.integer  "chapter_id"
    t.integer  "book_id"
    t.text     "body"
    t.string   "type"
    t.date     "release_date"
    t.boolean  "preview",            default: false
    t.string   "title"
    t.string   "description"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "paragraph_id"
  end

  add_index "tiles", ["book_id"], name: "index_tiles_on_book_id", using: :btree
  add_index "tiles", ["chapter_id"], name: "index_tiles_on_chapter_id", using: :btree

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

end
