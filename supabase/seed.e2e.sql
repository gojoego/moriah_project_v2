INSERT INTO users (
    id,
    display_name,
    email,
    password,
    role
)
SELECT
    '11111111-1111-1111-1111-111111111111',
    'Playwright Login User',
    'e2e-login@moriahproject.org',
    '$2b$10$l6NDd9f7/U0mwx1eVnMWGuXkxBgRHrUOkDShREEj3UAtDmv1hkd8W',
    'user'
WHERE NOT EXISTS (
    SELECT 1
    FROM users
    WHERE LOWER(email) = LOWER('e2e-login@moriahproject.org')
);