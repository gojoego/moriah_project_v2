ALTER TABLE resources
ADD CONSTRAINT resources_category_check
CHECK (
    category IN (
        'suicide_loss',
        'grief_support',
        'crisis_support',
        'mental_health',
        'peer_support',
        'lgbt_support'
    )
);

ALTER TABLE resources
ADD CONSTRAINT resources_type_check
CHECK (
    resource_type IN (
        'support_group',
        'crisis_line',
        'peer_support',
        'online_community',
        'resource_directory',
        'educational_resource'
    )
);

ALTER TABLE resources
ADD CONSTRAINT resources_format_check
CHECK (
    format <@ ARRAY[
        'online',
        'in_person',
        'phone',
        'text'
    ]::TEXT[]
);

ALTER TABLE resources
ADD CONSTRAINT resources_audience_check
CHECK (
    audience <@ ARRAY[
        'general',
        'children',
        'teens',
        'young_adults',
        'adults',
        'parents',
        'siblings',
        'spouses_partners',
        'families',
        'lgbtq_youth',
        'military_families'
    ]::TEXT[]
);