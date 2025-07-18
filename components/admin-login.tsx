"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface AdminLoginProps {
  onLogin: (success: boolean) => void
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Check password
    if (password === "Thierry054#") {
      toast({
        title: "Access Granted",
        description: "Welcome to the admin dashboard",
      })
      onLogin(true)
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid password",
        variant: "destructive",
      })
      onLogin(false)
    }

    setLoading(false)
    setPassword("")
  }

  return (
    <div className="max-w-md mx-auto">
      <Card className="border border-border bg-card">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary flex items-center justify-center gap-2">
            <Lock className="h-6 w-6" />
            ADMIN ACCESS
          </CardTitle>
          <p className="text-muted-foreground text-sm">{"> Enter password to access dashboard"}</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-input bg-background text-foreground placeholder:text-muted-foreground"
              required
            />
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={loading}
            >
              {loading ? "AUTHENTICATING..." : "ACCESS SYSTEM"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
