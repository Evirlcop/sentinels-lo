-- Drop existing policies on the 'sentinels' bucket to avoid conflicts
DROP POLICY IF EXISTS "Allow public read access on sentinels" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated uploads on sentinels" ON storage.objects;

-- Policy to allow public read access to all files in the 'sentinels' bucket
CREATE POLICY "Allow public read access on sentinels" ON storage.objects
FOR SELECT USING (bucket_id = 'sentinels');

-- Policy to allow authenticated users to upload and manage files in the 'sentinels' bucket
-- This assumes your admin dashboard uses Supabase authentication to sign in users.
CREATE POLICY "Allow authenticated uploads on sentinels" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'sentinels' AND auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated updates on sentinels" ON storage.objects
FOR UPDATE USING (bucket_id = 'sentinels' AND auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated deletes on sentinels" ON storage.objects
FOR DELETE USING (bucket_id = 'sentinels' AND auth.uid() IS NOT NULL);

-- Note: If you have specific subfolders like 'blog_images', you can refine the policies:
-- FOR INSERT WITH CHECK (bucket_id = 'sentinels' AND auth.uid() IS NOT NULL AND storage.foldername(name)[1] = 'blog_images');
-- FOR SELECT USING (bucket_id = 'sentinels' AND storage.foldername(name)[1] = 'blog_images');
-- For simplicity, the above policies apply to the entire 'sentinels' bucket.
