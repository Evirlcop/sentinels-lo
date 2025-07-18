export function calculateReadTime(text: string): number {
  const wordsPerMinute = 200 // Average reading speed
  const words = text.split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return minutes
}
