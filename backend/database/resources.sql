CREATE TABLE IF NOT EXISTS resources (
    id UUID DEFAULT gen_random_uuid(),

    name TEXT NOT NULL, 
    description TEST NOT NULL,
    url TEXT NOT NULL, 

    category TEXT NOT NULL, 
    resource_type TEXT NOT NULL, 
    audience TEXT[], 
    format TEXT[], 
    location_scope TEXT, 
    tags TEXT[],

    is_active BOOLEAN NOT NULL DEFAULT TRUE, 

    created_at TIMESTAMPTZ NOT NULL DEFAULT now(), 
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT resource_pkey PRIMARY KEY (id),
    CONSTRAINT resource_url_unique UNIQUE (url)
);

CREATE INDEX idx_resources_category
ON resources(category);

CREATE INDEX idx_resources_resource_type
ON resources(resource_type);

CREATE INDEX idx_resources_is_active
ON resources(is_active)

