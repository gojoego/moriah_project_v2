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

    CONSTRAINT users_display_name_not_empty CHECK (TRIM(display_name) <> ''),
    CONSTRAINT users_email_not_empty CHECK (TRIM(email) <> '')
);

CREATE UNIQUE INDEX IF NOT EXISTS users_email_unique_lower
ON users (LOWER(email));