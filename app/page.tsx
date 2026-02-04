"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { ArrowRight, Code, Shield, Cpu, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import { ImageWithFallback } from "@/components/image-with-fallback"
import { useEffect, useState } from "react"
import { getLatestPosts } from "@/app/actions/posts" // Import the new action
import { calculateReadTime } from "@/lib/read-time" // Import read time utility

// Type for blog posts
interface BlogPost {
  id: string
  title: string
  content: string
  created_at: string
  thumbnail?: string // Added thumbnail
}

// Typing effect component
const TypewriterEffect = ({ text, speed = 100 }: { text: string; speed?: number }) => {
  const [displayedText, setDisplayedText] = useState("")
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index])
        setIndex((prev) => prev + 1)
      }, speed)
      return () => clearTimeout(timeout)
    }
  }, [index, text, speed])

  return <span className="font-mono">{displayedText}</span>
}

export default function HomePage() {
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([])
  const [loadingPosts, setLoadingPosts] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoadingPosts(true)
        const posts = await getLatestPosts(3) // Fetch latest 3 posts
        setLatestPosts(posts)
      } catch (error) {
        console.error("Failed to fetch latest posts:", error)
      } finally {
        setLoadingPosts(false)
      }
    }
    fetchPosts()
  }, [])

  const formatDate = (iso: string) =>
    new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
    }).format(new Date(iso))

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-20 px-4 animated-background">
      {/* Hero Section */}
      <section className="w-full max-w-4xl text-center mb-16">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <ImageWithFallback
              src="https://sbojnesivcuawnrpjrfu.supabase.co/storage/v1/object/public/sentinels/hacker.png"
              alt="Thierry Mukiza Logo" // Updated alt text
              width={120}
              height={120}
              className="rounded-full border border-primary/20 shadow-lg animate-pulse-slow" // Added pulse animation
              fallbackSrc="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgdmlld0JveD0iMCA0MCAxMjAgMTIwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmc+CjxyZWN0IHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiByeT0iNjAiIGZpbGw9IiMzYjgyZjYiLz4KPHN2ZyB4PSIzMCIgeT0iMzAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+CjxwYXRoIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0tMiAxNWwtNS01IDEuNDEtMS40MUwxMCAxNC4xN3o3LjU5LTcuNTlMMTkgMThsLTkgOXoiLz4KPC9zdmc+Cjwvc3ZnPg=="
            />
          </div>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground text-glow">
          <TypewriterEffect text="THIERRY MUKIZA" speed={100} /> {/* Updated text */}
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Hi! I do things with computers!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
            <Link href="/about">
              Explore My Work <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="/blog">Read Blog Posts</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 w-full max-w-6xl">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border border-border bg-card hover:shadow-xl transition-all duration-300 card-glow-hover">
              <CardContent className="p-6 text-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2 text-foreground">Cybersecurity</h3>
                <p className="text-muted-foreground">Reverse engineering, malware analysis, and exploit development</p>
              </CardContent>
            </Card>

            <Card className="border border-border bg-card hover:shadow-xl transition-all duration-300 card-glow-hover">
              <CardContent className="p-6 text-center">
                <Code className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2 text-foreground">Development</h3>
                <p className="text-muted-foreground">C, Python, JavaScript, and low-level programming</p>
              </CardContent>
            </Card>

            <Card className="border border-border bg-card hover:shadow-xl transition-all duration-300 card-glow-hover">
              <CardContent className="p-6 text-center">
                <Cpu className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2 text-foreground">Systems</h3>
                <p className="text-muted-foreground">Binary exploitation, debuggers, and embedded systems</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts Section */}
      <section className="py-16 px-4 w-full max-w-6xl">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-foreground text-center mb-12 text-glow">Latest Intel</h2>
          {loadingPosts ? (
            <div className="text-center text-muted-foreground">Loading latest transmissions...</div>
          ) : latestPosts.length === 0 ? (
            <div className="text-center text-muted-foreground">No recent posts found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {latestPosts.map((post) => (
                <Card
                  key={post.id}
                  className="border border-border bg-card hover:shadow-lg transition-shadow duration-300 card-glow-hover"
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
                      <CardTitle className="text-foreground text-xl font-semibold mb-2 hover:text-primary transition-colors">
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
                    <p className="text-muted-foreground line-clamp-3 mb-4">
                      {post.content.split("\n")[0] || post.content.substring(0, 150) + "..."}
                    </p>
                    <Link href={`/blog/${post.id}`} className="text-primary hover:underline text-sm font-medium">
                      Read more &rarr;
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link href="/blog">View All Blog Posts</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
