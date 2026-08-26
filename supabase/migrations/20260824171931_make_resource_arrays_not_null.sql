UPDATE resources
SET audience = '{}'
WHERE audience IS NULL;

UPDATE resources
SET format = '{}'
WHERE format IS NULL;

UPDATE resources
SET tags = '{}'
WHERE tags IS NULL;

ALTER TABLE resources
ALTER COLUMN audience SET DEFAULT '{}',
ALTER COLUMN audience SET NOT NULL,
ALTER COLUMN format SET DEFAULT '{}',
ALTER COLUMN format SET NOT NULL,
ALTER COLUMN tags SET DEFAULT '{}',
ALTER COLUMN tags SET NOT NULL;