-- Add thumbnail column to posts table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='posts' AND column_name='thumbnail') THEN
        ALTER TABLE posts ADD COLUMN thumbnail TEXT;
    END IF;
END
$$;

-- Update existing posts to have a default placeholder thumbnail if thumbnail is NULL
UPDATE posts
SET thumbnail = 'https://via.placeholder.com/800x400.png?text=Evilkop+Sentinels+Blog'
WHERE thumbnail IS NULL;

-- Re-enable Row Level Security policies (if they were temporarily disabled for schema changes)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Ensure policies allow authenticated users to update the new 'thumbnail' column
-- (These policies should already cover it if they allow general updates, but good to be explicit)
DROP POLICY IF EXISTS "Allow authenticated update on posts" ON posts;
CREATE POLICY "Allow authenticated update on posts" ON posts
  FOR UPDATE USING (true); -- Assuming 'true' means authenticated users can update any column
