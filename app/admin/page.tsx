"use client"

import { useState, useEffect } from "react"
import { AdminLogin } from "@/components/admin-login"
import { AdminDashboard } from "@/components/admin-dashboard"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if already authenticated
    const authStatus = localStorage.getItem("admin_authenticated")
    if (authStatus === "true") {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (success: boolean) => {
    setIsAuthenticated(success)
    if (success) {
      localStorage.setItem("admin_authenticated", "true")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("admin_authenticated")
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {!isAuthenticated ? <AdminLogin onLogin={handleLogin} /> : <AdminDashboard onLogout={handleLogout} />}
      </div>
    </div>
  )
}
