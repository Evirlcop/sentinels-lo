import { createClient } from "@supabase/supabase-js"

/**
 * Use ONLY on the server (Server Components, Route Handlers, Server Actions).
 * Hardcoded values as requested. For production, consider using environment variables.
 */
export function supabaseServer() {
  return createClient(
    "https://sbojnesivcuawnrpjrfu.supabase.co", // Hardcoded URL
    "sb_publishable_Zumgb4AAjg3WurmjfUS_Nw_-iTjrEiy", // Hardcoded Anon Key
  )
}
