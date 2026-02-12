#!/bin/bash

psql moriah_dev -f db/migrations/001_create_users.sql
psql moriah_dev -f db/migrations/002_create_posts.sql

echo "migrations completed!"
