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

CREATE INDEX idx_posts_author_id ON posts(author_id);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);