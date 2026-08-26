INSERT INTO resources (
    name,
    description,
    url,
    category,
    resource_type,
    audience,
    format,
    location_scope,
    tags,
    is_active
)
VALUES
(
    'Alliance of Hope',
    'Online support and community for people grieving the suicide of a loved one.',
    'https://allianceofhope.org/',
    'suicide_loss',
    'online_community',
    ARRAY['general', 'adults'],
    ARRAY['online'],
    'international',
    ARRAY['suicide loss', 'peer support', 'grief', 'community'],
    TRUE
),
(
    'AFSP - I''ve Lost Someone',
    'Resources, guides, support groups, and programs for people affected by suicide loss.',
    'https://afsp.org/ive-lost-someone/',
    'suicide_loss',
    'resource_directory',
    ARRAY['general', 'adults', 'families'],
    ARRAY['online'],
    'national',
    ARRAY['suicide loss', 'grief', 'support groups', 'education'],
    TRUE
),
(
    'AFSP Healing Conversations',
    'Peer support connecting suicide loss survivors with trained volunteers who have experienced suicide loss.',
    'https://afsp.org/healing-conversations/',
    'suicide_loss',
    'peer_support',
    ARRAY['general', 'adults'],
    ARRAY['phone', 'online', 'in_person'],
    'national',
    ARRAY['suicide loss', 'peer support', 'one-on-one support'],
    TRUE
),
(
    'The Compassionate Friends',
    'Peer support for families grieving the death of a child, sibling, or grandchild.',
    'https://www.compassionatefriends.org/find-support/',
    'grief_support',
    'support_group',
    ARRAY['parents', 'siblings', 'families', 'adults'],
    ARRAY['online', 'in_person'],
    'national',
    ARRAY['grief', 'family loss', 'child loss', 'sibling loss', 'peer support'],
    TRUE
),
(
    'Dougy Center',
    'Grief support and educational resources for children, teens, young adults, and families.',
    'https://www.dougy.org/grief-support-resources',
    'grief_support',
    'resource_directory',
    ARRAY['children', 'teens', 'young_adults', 'families', 'parents'],
    ARRAY['online', 'in_person'],
    'international',
    ARRAY['grief', 'children', 'teens', 'young adults', 'family support'],
    TRUE
),
(
    'TAPS Suicide Loss Support',
    'Grief and peer support for people affected by the suicide death of a military or veteran loved one.',
    'https://www.taps.org/suicide',
    'suicide_loss',
    'peer_support',
    ARRAY['military_families', 'families', 'adults'],
    ARRAY['phone', 'online', 'in_person'],
    'national',
    ARRAY['suicide loss', 'military', 'veterans', 'peer support', 'grief'],
    TRUE
),
(
    'The Trevor Project',
    'Free confidential crisis support for LGBTQ+ young people by phone, text, and online chat.',
    'https://www.thetrevorproject.org/get-help/',
    'lgbt_support',
    'crisis_line',
    ARRAY['lgbtq_youth', 'teens', 'young_adults'],
    ARRAY['phone', 'text', 'online'],
    'national',
    ARRAY['LGBTQ', 'youth', 'crisis support', 'suicide prevention'],
    TRUE
),
(
    'TrevorSpace',
    'Moderated online community where LGBTQ+ young people ages 13 to 24 can connect with peers.',
    'https://www.thetrevorproject.org/visit-trevorspace/',
    'lgbt_support',
    'online_community',
    ARRAY['lgbtq_youth', 'teens', 'young_adults'],
    ARRAY['online'],
    'international',
    ARRAY['LGBTQ', 'peer support', 'community', 'youth'],
    TRUE
),
(
    '988 Suicide & Crisis Lifeline',
    'Free confidential crisis and emotional support available by phone, text, or online chat.',
    'https://988lifeline.org/get-help/',
    'crisis_support',
    'crisis_line',
    ARRAY['general'],
    ARRAY['phone', 'text', 'online'],
    'national',
    ARRAY['crisis support', 'suicide prevention', 'mental health', 'hotline'],
    TRUE
),
(
    'Crisis Text Line',
    'Free confidential 24/7 crisis support through text messaging with trained volunteer crisis counselors.',
    'https://www.crisistextline.org/',
    'crisis_support',
    'crisis_line',
    ARRAY['general'],
    ARRAY['text', 'online'],
    'national',
    ARRAY['crisis support', 'mental health', 'text support', 'suicide prevention'],
    TRUE
)
ON CONFLICT (url) DO NOTHING;