import { supabaseServer } from "@/lib/supabase-server"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Calendar, Clock } from "lucide-react" // Import Clock icon
import { MarkdownRenderer } from "@/components/markdown-renderer"
import Link from "next/link"
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

export default async function BlogPage() {
  const supabase = supabaseServer()
  const { data: posts = [], error } = await supabase
    .from("posts")
    .select("*, thumbnail") // Select thumbnail
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Supabase error:", error.message)
  }

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
    }).format(new Date(iso))

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">Blog</h1>
            <p className="text-xl text-muted-foreground">
              Thoughts, tutorials, and insights from the digital underground
            </p>
          </div>

          {error && (
            <Card className="border border-destructive bg-destructive/10">
              <CardContent className="p-8 text-center text-destructive-foreground">
                Error loading posts. Please try again later.
              </CardContent>
            </Card>
          )}

          {!error && posts.length === 0 && (
            <Card className="border border-border bg-card">
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground text-xl">No posts found. Check back later...</p>
              </CardContent>
            </Card>
          )}

          {!error && posts.length > 0 && (
            <div className="space-y-8">
              {posts.map((post: BlogPost) => (
                <Card
                  key={post.id}
                  className="border border-border bg-card hover:shadow-lg transition-shadow duration-300"
                >
                  <CardContent className="p-6">
                    <Link href={`/blog/${post.id}`} className="block">
                      {post.thumbnail && (
                        <div className="mb-4">
                          <ImageWithFallback
                            src={post.thumbnail || "/placeholder.svg"}
                            alt={`Thumbnail for ${post.title}`}
                            width={800}
                            height={400}
                            className="rounded-md object-cover w-full h-48"
                            fallbackSrc="/placeholder.svg?height=400&width=800"
                          />
                        </div>
                      )}
                      <CardTitle className="text-foreground text-2xl font-semibold mb-2 hover:text-primary transition-colors">
                        {post.title}
                      </CardTitle>
                    </Link>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(post.created_at)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {calculateReadTime(post.content)} min read
                      </div>
                    </div>
                    <div className="text-muted-foreground line-clamp-3 mb-4">
                      <MarkdownRenderer
                        content={post.content.split("\n")[0] || post.content.substring(0, 200) + "..."}
                      />
                    </div>
                    <Link href={`/blog/${post.id}`} className="text-primary hover:underline text-sm font-medium">
                      Read more &rarr;
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
