import { supabaseServer } from "@/lib/supabase-server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Tag, Clock } from "lucide-react" // Import Clock icon
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { calculateReadTime } from "@/lib/read-time" // Import read time utility
import { ImageWithFallback } from "@/components/image-with-fallback" // Import ImageWithFallback

interface BlogPost {
  id: string
  title: string
  content: string
  tags: string[]
  created_at: string
  thumbnail?: string // Added thumbnail
}

export const revalidate = 30

export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const supabase = supabaseServer()
  const { data: post, error } = await supabase.from("posts").select("*, thumbnail").eq("id", params.id).single() // Select thumbnail

  if (error || !post) {
    console.error("Supabase error:", error?.message || "Post not found")
    notFound()
  }

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(new Date(iso))

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Button variant="link" className="mb-8 px-0 text-primary" asChild>
            <Link href="/blog">&larr; Back to Blog</Link>
          </Button>
          <Card className="border border-border bg-card">
            <CardHeader>
              {post.thumbnail && (
                <div className="mb-4 -mt-2">
                  {" "}
                  {/* Adjusted margin for better spacing */}
                  <ImageWithFallback
                    src={post.thumbnail || "/placeholder.svg"}
                    alt={`Thumbnail for ${post.title}`}
                    width={1200}
                    height={600}
                    className="rounded-md object-cover w-full h-64"
                    fallbackSrc="/placeholder.svg?height=600&width=1200"
                  />
                </div>
              )}
              <CardTitle className="text-foreground text-3xl font-bold mb-2">{post.title}</CardTitle>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(post.created_at)}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {calculateReadTime(post.content)} min read
                </div>
                {post.tags?.length > 0 && (
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <MarkdownRenderer content={post.content} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
