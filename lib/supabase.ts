import { createClient } from "@supabase/supabase-js"

// Client-side Supabase client
// Hardcoded values as requested. For production, consider using environment variables.
export const supabase = createClient(
  "https://sbojnesivcuawnrpjrfu.supabase.co",
  "sb_publishable_Zumgb4AAjg3WurmjfUS_Nw_-iTjrEiy",
)
