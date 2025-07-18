"use server"

import { supabaseServer } from "@/lib/supabase-server"
import { v4 as uuidv4 } from "uuid" // For unique file names

export async function uploadImage(formData: FormData) {
  const supabase = supabaseServer()
  const file = formData.get("file") as File

  if (!file) {
    throw new Error("No file provided for upload.")
  }

  // Generate a unique file name to prevent collisions
  const fileExtension = file.name.split(".").pop()
  const fileName = `${uuidv4()}.${fileExtension}`
  const filePath = `blog_images/${fileName}` // Store in a 'blog_images' subfolder

  const { data, error } = await supabase.storage.from("sentinels").upload(filePath, file, {
    cacheControl: "3600",
    upsert: false, // Do not overwrite existing files
  })

  if (error) {
    console.error("Supabase storage upload error:", error)
    throw new Error(`Failed to upload image: ${error.message}`)
  }

  // Get the public URL of the uploaded file
  const { data: publicUrlData } = supabase.storage.from("sentinels").getPublicUrl(filePath)

  if (!publicUrlData || !publicUrlData.publicUrl) {
    throw new Error("Failed to get public URL for the uploaded image.")
  }

  return publicUrlData.publicUrl
}
