CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
    id UUID NOT NULL DEFAULT gen_random_uuid(),

    display_name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,

    role TEXT NOT NULL DEFAULT 'user'
        CHECK (role IN ('user', 'admin', 'moderator')),

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT users_pkey PRIMARY KEY (id),

    CONSTRAINT users_display_name_not_empty
        CHECK (TRIM(display_name) <> ''),

    CONSTRAINT users_email_not_empty
        CHECK (TRIM(email) <> '')
);

CREATE UNIQUE INDEX IF NOT EXISTS users_email_unique_lower
ON users (LOWER(email));

CREATE TABLE IF NOT EXISTS posts (
    id UUID DEFAULT gen_random_uuid(),

    author_id UUID NOT NULL,
    deceased_name TEXT NOT NULL,
    background TEXT,
    content TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'published',

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT posts_pkey PRIMARY KEY (id),

    CONSTRAINT posts_author_fkey
        FOREIGN KEY (author_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    CONSTRAINT posts_status_check
        CHECK (status IN ('draft', 'published', 'hidden'))
);

CREATE INDEX IF NOT EXISTS idx_posts_author_id
ON posts(author_id);

CREATE INDEX IF NOT EXISTS idx_posts_status
ON posts(status);

CREATE INDEX IF NOT EXISTS idx_posts_created_at
ON posts(created_at DESC);