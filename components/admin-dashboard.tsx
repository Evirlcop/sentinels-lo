"use client"

import Link from "next/link"

import { useState, useEffect, type FormEvent } from "react"
import { getPosts, createPost, updatePost, deletePost } from "@/app/actions/posts"
import { uploadImage } from "@/app/actions/storage"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, LogOut, Save, Eye, Upload, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import Image from "next/image" // Added import for Image component

interface BlogPost {
  id: string
  title: string
  content: string
  tags: string[]
  created_at: string
  thumbnail?: string // Added thumbnail
}

interface Props {
  onLogout: () => void
}

const ImageWithFallback = ({ src, alt, width, height, className, fallbackSrc }) => {
  const [imageSrc, setImageSrc] = useState(src)

  const handleError = () => {
    setImageSrc(fallbackSrc)
  }

  return (
    <Image
      src={imageSrc || "/placeholder.svg"}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleError}
    />
  )
}

export function AdminDashboard({ onLogout }: Props) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [newPost, setNewPost] = useState({ title: "", content: "", tags: "", thumbnail: "" }) // Added thumbnail
  const [loading, setLoading] = useState(false)
  const [previewMode, setPreviewMode] = useState<string | null>(null)
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    ;(async () => {
      try {
        setPosts(await getPosts())
      } catch (e) {
        toast({ title: "Error", description: (e as Error).message, variant: "destructive" })
      }
    })()
  }, [toast])

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault()
    if (!newPost.title.trim() || !newPost.content.trim()) {
      toast({ title: "Error", description: "Title and content are required", variant: "destructive" })
      return
    }

    setLoading(true)
    try {
      await createPost({
        title: newPost.title.trim(),
        content: newPost.content.trim(),
        tags: newPost.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        thumbnail: newPost.thumbnail.trim() || undefined, // Pass thumbnail
      })
      toast({ title: "Success", description: "Post created successfully" })
      setNewPost({ title: "", content: "", tags: "", thumbnail: "" }) // Reset thumbnail
      setPosts(await getPosts())
    } catch (e) {
      toast({ title: "Create failed", description: (e as Error).message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault()
    if (!editingPost || !editingPost.title.trim() || !editingPost.content.trim()) {
      toast({ title: "Error", description: "Title and content are required", variant: "destructive" })
      return
    }

    setLoading(true)
    try {
      await updatePost({
        ...editingPost,
        title: editingPost.title.trim(),
        content: editingPost.content.trim(),
        thumbnail: editingPost.thumbnail?.trim() || undefined, // Pass thumbnail
      })
      toast({ title: "Success", description: "Post updated successfully" })
      setEditingPost(null)
      setPosts(await getPosts())
    } catch (e) {
      toast({ title: "Update failed", description: (e as Error).message, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return
    try {
      await deletePost(id)
      toast({ title: "Success", description: "Post deleted successfully" })
      setPosts(await getPosts())
    } catch (e) {
      toast({ title: "Delete failed", description: (e as Error).message, variant: "destructive" })
    }
  }

  const handleImageUpload = async () => {
    if (!selectedImageFile) {
      toast({ title: "Error", description: "Please select an image file first.", variant: "destructive" })
      return
    }

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("file", selectedImageFile)
      const url = await uploadImage(formData)
      setUploadedImageUrl(url)
      toast({ title: "Image Uploaded", description: "Markdown URL copied to clipboard!", duration: 3000 })
      navigator.clipboard.writeText(`![Alt Text](${url})`) // Copy full markdown
    } catch (e) {
      toast({ title: "Upload Failed", description: (e as Error).message, variant: "destructive" })
    } finally {
      setLoading(false)
      setSelectedImageFile(null)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold text-foreground">Admin Dashboard</h1>
        <Button
          onClick={onLogout}
          variant="outline"
          className="border-destructive text-destructive hover:bg-destructive/10 bg-transparent"
        >
          <LogOut className="mr-2 h-4 w-4" />
          LOGOUT
        </Button>
      </div>

      {/* IMAGE UPLOAD SECTION */}
      <Card className="border border-border bg-card">
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Image for Posts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedImageFile(e.target.files ? e.target.files[0] : null)}
              className="flex-grow border border-input bg-background text-foreground"
            />
            <Button
              onClick={handleImageUpload}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={loading || !selectedImageFile}
            >
              {loading ? "Uploading..." : "Upload Image"}
            </Button>
          </div>
          {uploadedImageUrl && (
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
              <span className="truncate">{uploadedImageUrl}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => {
                  navigator.clipboard.writeText(`![Alt Text](${uploadedImageUrl})`)
                  toast({ title: "Copied!", description: "Markdown URL copied to clipboard." })
                }}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          )}
          <p className="text-sm text-muted-foreground mt-2">
            Upload images here, then copy the **full markdown format** `![Alt Text](image_url)` and paste it into your
            post content.
          </p>
        </CardContent>
      </Card>

      {/* CREATE NEW POST */}
      <Card className="border border-border bg-card">
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create New Post
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreate} className="space-y-4">
            <Input
              placeholder="Post Title"
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
              className="border border-input bg-background text-foreground"
              required
            />
            <Input
              placeholder="Thumbnail Image URL (optional, e.g., https://via.placeholder.com/800x400)"
              value={newPost.thumbnail}
              onChange={(e) => setNewPost({ ...newPost, thumbnail: e.target.value })}
              className="border border-input bg-background text-foreground"
            />
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Content (Markdown supported)</label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setPreviewMode(previewMode === "new" ? null : "new")}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  {previewMode === "new" ? "Edit" : "Preview"}
                </Button>
              </div>
              {previewMode === "new" ? (
                <Card className="border border-border bg-card">
                  <CardContent className="p-4">
                    <MarkdownRenderer content={newPost.content} />
                  </CardContent>
                </Card>
              ) : (
                <Textarea
                  placeholder="Post Content (supports markdown: # headers, **bold**, *italic*, `code`, etc.)"
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  className="border border-input bg-background text-foreground min-h-40"
                  required
                />
              )}
            </div>
            <Input
              placeholder="Tags (comma separated)"
              value={newPost.tags}
              onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
              className="border border-input bg-background text-foreground"
            />
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled={loading}>
              <Save className="mr-2 h-4 w-4" />
              {loading ? "Creating..." : "Create Post"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* UPDATE FORM */}
      {editingPost && (
        <Card className="border border-border bg-card">
          <CardHeader>
            <CardTitle className="text-primary flex items-center gap-2">
              <Edit className="h-5 w-5" />
              Edit Post
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdate} className="space-y-4">
              <Input
                value={editingPost.title}
                onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                className="border border-input bg-background text-foreground"
                required
              />
              <Input
                placeholder="Thumbnail Image URL (optional)"
                value={editingPost.thumbnail || ""}
                onChange={(e) => setEditingPost({ ...editingPost, thumbnail: e.target.value })}
                className="border border-input bg-background text-foreground"
              />
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Content (Markdown supported)</label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setPreviewMode(previewMode === "edit" ? null : "edit")}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    {previewMode === "edit" ? "Edit" : "Preview"}
                  </Button>
                </div>
                {previewMode === "edit" ? (
                  <Card className="border border-border bg-card">
                    <CardContent className="p-4">
                      <MarkdownRenderer content={editingPost.content} />
                    </CardContent>
                  </Card>
                ) : (
                  <Textarea
                    value={editingPost.content}
                    onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                    className="border border-input bg-background text-foreground min-h-40"
                    required
                  />
                )}
              </div>
              <Input
                value={editingPost.tags.join(", ")}
                onChange={(e) =>
                  setEditingPost({
                    ...editingPost,
                    tags: e.target.value
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean),
                  })
                }
                className="border border-input bg-background text-foreground"
              />

              <div className="flex gap-2">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" disabled={loading}>
                  <Save className="mr-2 h-4 w-4" />
                  {loading ? "Updating..." : "Update Post"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditingPost(null)
                    setPreviewMode(null)
                  }}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* LIST */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Existing Posts ({posts.length})</h2>
        {posts.length === 0 ? (
          <Card className="border border-border bg-card">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No posts found. Create your first post above!</p>
            </CardContent>
          </Card>
        ) : (
          posts.map((post) => (
            <Card key={post.id} className="border border-border bg-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-foreground">{post.title}</CardTitle>
                    <p className="text-muted-foreground text-sm mt-1">
                      {new Date(post.created_at).toLocaleDateString()} at{" "}
                      {new Date(post.created_at).toLocaleTimeString()}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="border-primary text-primary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => {
                        setEditingPost(post)
                        setPreviewMode(null)
                      }}
                      className="bg-primary/20 border border-primary text-primary hover:bg-primary/30"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleDelete(post.id)}
                      className="bg-destructive/20 border border-destructive text-destructive hover:bg-destructive/30"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
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
                <div className="text-muted-foreground">
                  {post.content.length > 200 ? (
                    <>
                      {post.content.substring(0, 200)}...
                      <Button variant="link" className="p-0 h-auto ml-2 text-primary" asChild>
                        <Link href={`/blog/${post.id}`}>Read more</Link>
                      </Button>
                    </>
                  ) : (
                    post.content
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
