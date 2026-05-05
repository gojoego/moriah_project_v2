INSERT INTO users (id, email, password, display_name, role)
VALUES 
    (gen_random_uuid(), 'joe@moriahproject.org', '$2b$10$Lb4H1j82mXA7SRECDDUOMOBlC.bMMJy8Xxqkd1SgmgTahoVdussRi', 'Joe', 'admin'),
    (gen_random_uuid(), 'admin@moriahproject.org', '$2b$10$Lb4H1j82mXA7SRECDDUOMOBlC.bMMJy8Xxqkd1SgmgTahoVdussRi', 'Admin', 'admin'),
    (gen_random_uuid(), 'test@test.org', '$2b$10$Lb4H1j82mXA7SRECDDUOMOBlC.bMMJy8Xxqkd1SgmgTahoVdussRi', 'Test', 'user'),
    (gen_random_uuid(), 'testuser@moriahproject.org', '$2b$10$Lb4H1j82mXA7SRECDDUOMOBlC.bMMJy8Xxqkd1SgmgTahoVdussRi', 'Test User', 'user'),
    (gen_random_uuid(), 'maria@moriahproject.org', '$2b$10$Lb4H1j82mXA7SRECDDUOMOBlC.bMMJy8Xxqkd1SgmgTahoVdussRi', 'Maria', 'user'),
    (gen_random_uuid(), 'david@moriahproject.org', '$2b$10$Lb4H1j82mXA7SRECDDUOMOBlC.bMMJy8Xxqkd1SgmgTahoVdussRi', 'David', 'user'),
    (gen_random_uuid(), 'sarah@moriahproject.org', '$2b$10$Lb4H1j82mXA7SRECDDUOMOBlC.bMMJy8Xxqkd1SgmgTahoVdussRi', 'Sarah', 'user'),
    (gen_random_uuid(), 'micah@moriahproject.org', '$2b$10$Lb4H1j82mXA7SRECDDUOMOBlC.bMMJy8Xxqkd1SgmgTahoVdussRi', 'Micah', 'user'),
    (gen_random_uuid(), 'elena@moriahproject.org', '$2b$10$Lb4H1j82mXA7SRECDDUOMOBlC.bMMJy8Xxqkd1SgmgTahoVdussRi', 'Elena', 'user'),
    (gen_random_uuid(), 'james@moriahproject.org', '$2b$10$Lb4H1j82mXA7SRECDDUOMOBlC.bMMJy8Xxqkd1SgmgTahoVdussRi', 'James', 'moderator')
ON CONFLICT DO NOTHING;