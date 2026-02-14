INSERT INTO posts (author_id, deceased_name, background, content, status)
SELECT 
    u.id, 
    'Moriah',
    'She was always into health and fitness and really inspired me to take better care of myself', 
    'I am sorry that you were in pain and I am sorry that I did not reach out to you after I left the city',
    'published'
FROM users u 
WHERE u.email = 'joe@moriahproject.org'
AND NOT EXISTS (
    SELECT 1 FROM posts p 
    WHERE p.author_id = u.id 
    AND p.deceased_name = 'Moriah'
);

INSERT INTO posts (author_id, deceased_name, background, content, status)
SELECT 
    u.id,
    'Daniel',
    'You were the quiet strength in our family and always showed up when it mattered most.',
    'I wish I had told you how much your steadiness meant to me. I carry your lessons with me every day.',
    'published'
FROM users u
WHERE u.email = 'admin@moriahproject.org'
AND NOT EXISTS (
    SELECT 1 FROM posts p 
    WHERE p.author_id = u.id 
    AND p.deceased_name = 'Daniel'
);

INSERT INTO posts (author_id, deceased_name, background, content, status)
SELECT 
    u.id,
    'Lena',
    'We met in college and bonded over late night study sessions and terrible cafeteria coffee.',
    'I am sorry I didn’t recognize how much you were carrying. I hope you know you were deeply loved.',
    'published'
FROM users u
WHERE u.email = 'test@test.org'
AND NOT EXISTS (
    SELECT 1 FROM posts p 
    WHERE p.author_id = u.id 
    AND p.deceased_name = 'Lena'
);

INSERT INTO posts (author_id, deceased_name, background, content, status)
SELECT 
    u.id,
    'Chris',
    'You had the biggest laugh in the room and somehow made everyone feel included.',
    'There are so many things I still want to tell you. I miss our long talks more than I can explain.',
    'draft'
FROM users u
WHERE u.email = 'testuser@moriahproject.org'
AND NOT EXISTS (
    SELECT 1 FROM posts p 
    WHERE p.author_id = u.id 
    AND p.deceased_name = 'Chris'
);

INSERT INTO posts (author_id, deceased_name, background, content, status)
SELECT 
    u.id,
    'Isabella',
    'You were my older sister and my protector growing up.',
    'I wish I had been able to protect you too. I think about you every single day.',
    'published'
FROM users u
WHERE u.email = 'maria@moriahproject.org'
AND NOT EXISTS (
    SELECT 1 FROM posts p 
    WHERE p.author_id = u.id 
    AND p.deceased_name = 'Isabella'
);

INSERT INTO posts (author_id, deceased_name, background, content, status)
SELECT 
    u.id,
    'Marcus',
    'We trained together for our first marathon and pushed each other past our limits.',
    'I replay our last conversation often. I hope you found the peace you were searching for.',
    'published'
FROM users u
WHERE u.email = 'david@moriahproject.org'
AND NOT EXISTS (
    SELECT 1 FROM posts p 
    WHERE p.author_id = u.id 
    AND p.deceased_name = 'Marcus'
);

INSERT INTO posts (author_id, deceased_name, background, content, status)
SELECT 
    u.id,
    'Noah',
    'You were the creative one in our friend group, always writing music and dreaming big.',
    'Your songs still play in my car. I hope you knew how much light you brought into our lives.',
    'hidden'
FROM users u
WHERE u.email = 'micah@moriahproject.org'
AND NOT EXISTS (
    SELECT 1 FROM posts p 
    WHERE p.author_id = u.id 
    AND p.deceased_name = 'Noah'
);

INSERT INTO posts (author_id, deceased_name, background, content, status)
SELECT 
    u.id,
    'Sofia',
    'You were my cousin, but more like a sister to me.',
    'I wish I had called you that night. I carry both regret and gratitude in equal measure.',
    'published'
FROM users u
WHERE u.email = 'elena@moriahproject.org'
AND NOT EXISTS (
    SELECT 1 FROM posts p 
    WHERE p.author_id = u.id 
    AND p.deceased_name = 'Sofia'
);

INSERT INTO posts (author_id, deceased_name, background, content, status)
SELECT 
    u.id,
    'Thomas',
    'We worked together for years and shared more conversations than I can count.',
    'I hope you know that you mattered deeply to so many people, even when you couldn’t see it.',
    'published'
FROM users u
WHERE u.email = 'james@moriahproject.org'
AND NOT EXISTS (
    SELECT 1 FROM posts p 
    WHERE p.author_id = u.id 
    AND p.deceased_name = 'Thomas'
);
