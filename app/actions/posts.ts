"use server"

import { supabaseServer } from "@/lib/supabase-server"
import { revalidatePath } from "next/cache"

export async function getPosts() {
  const supabase = supabaseServer()
  const { data, error } = await supabase.from("posts").select("*, thumbnail").order("created_at", { ascending: false })
  if (error) {
    console.error("Database error:", error)
    throw new Error(`Failed to fetch posts: ${error.message}`)
  }
  return data || []
}

export async function createPost({
  title,
  content,
  tags,
  thumbnail,
}: {
  title: string
  content: string
  tags: string[]
  thumbnail?: string
}) {
  const supabase = supabaseServer()
  const { error } = await supabase.from("posts").insert([
    {
      title: title.trim(),
      content: content.trim(),
      tags: tags.filter((tag) => tag.trim().length > 0),
      thumbnail: thumbnail || null, // Now thumbnail column exists, so we can directly assign null if empty
    },
  ])

  if (error) {
    console.error("Database error:", error)
    throw new Error(`Failed to create post: ${error.message}`)
  }

  revalidatePath("/blog")
}

export async function updatePost({
  id,
  title,
  content,
  tags,
  thumbnail,
}: {
  id: string
  title: string
  content: string
  tags: string[]
  thumbnail?: string
}) {
  const supabase = supabaseServer()
  const { error } = await supabase
    .from("posts")
    .update({
      title: title.trim(),
      content: content.trim(),
      tags: tags.filter((tag) => tag.trim().length > 0),
      updated_at: new Date().toISOString(),
      thumbnail: thumbnail || null, // Now thumbnail column exists, so we can directly assign null if empty
    })
    .eq("id", id)

  if (error) {
    console.error("Database error:", error)
    throw new Error(`Failed to update post: ${error.message}`)
  }

  revalidatePath("/blog")
}

export async function deletePost(id: string) {
  const supabase = supabaseServer()
  const { error } = await supabase.from("posts").delete().eq("id", id)

  if (error) {
    console.error("Database error:", error)
    throw new Error(`Failed to delete post: ${error.message}`)
  }

  revalidatePath("/blog")
}

export async function getLatestPosts(limit = 3) {
  const supabase = supabaseServer()
  const { data, error } = await supabase
    .from("posts")
    .select("id, title, content, created_at, thumbnail") // Explicitly select thumbnail
    .order("created_at", { ascending: false })
    .limit(limit)

  if (error) {
    console.error("Database error:", error)
    throw new Error(`Failed to fetch latest posts: ${error.message}`)
  }
  return data || []
}
