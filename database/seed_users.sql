INSERT INTO users (id, email, display_name, role)
VALUES 
    (gen_random_uuid(), 'joe@moriahproject.org', 'Joe', 'admin'),
    (gen_random_uuid(), 'admin@moriahproject.org', 'Admin', 'admin'),
    (gen_random_uuid(), 'test@test.org', 'Test', 'user'),
    (gen_random_uuid(), 'testuser@moriahproject.org', 'Test User', 'user'),
    (gen_random_uuid(), 'maria@moriahproject.org', 'Maria', 'user'),
    (gen_random_uuid(), 'david@moriahproject.org', 'David', 'user'),
    (gen_random_uuid(), 'sarah@moriahproject.org', 'Sarah', 'user'),
    (gen_random_uuid(), 'micah@moriahproject.org', 'Micah', 'user'),
    (gen_random_uuid(), 'elena@moriahproject.org', 'Elena', 'user'),
    (gen_random_uuid(), 'james@moriahproject.org', 'James', 'moderator');