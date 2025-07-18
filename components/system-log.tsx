"use client"

import { useState, useEffect } from "react"
import { Terminal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatePresence, motion } from "framer-motion" // Import motion for animations

interface LogEntry {
  id: number
  message: string
  type: "info" | "warning" | "error" | "success"
}

export function SystemLog() {
  const [isOpen, setIsOpen] = useState(false)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [logIdCounter, setLogIdCounter] = useState(0)

  // Simulate log entries
  useEffect(() => {
    const interval = setInterval(() => {
      const newLog: LogEntry = {
        id: logIdCounter,
        message: `[${new Date().toLocaleTimeString()}] System: Initializing module ${Math.floor(
          Math.random() * 1000,
        )}...`,
        type: "info",
      }
      setLogs((prevLogs) => [...prevLogs.slice(-9), newLog]) // Keep last 10 logs
      setLogIdCounter((prev) => prev + 1)
    }, 5000) // Add a new log every 5 seconds

    // Add an initial log
    setLogs([{ id: 0, message: `[${new Date().toLocaleTimeString()}] System: Boot sequence initiated.`, type: "info" }])
    setLogIdCounter(1)

    return () => clearInterval(interval)
  }, []) // Empty dependency array means this runs once on mount

  const logVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, x: -20 },
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        variant="outline"
        size="icon"
        className="rounded-full shadow-lg bg-card border-primary/20 hover:bg-primary/10 transition-all duration-300"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close system log" : "Open system log"}
      >
        {isOpen ? <X className="h-5 w-5 text-primary" /> : <Terminal className="h-5 w-5 text-primary" />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-16 right-0 w-80 md:w-96"
          >
            <Card className="border border-primary/30 bg-card/90 backdrop-blur-sm shadow-lg">
              <CardHeader className="p-4 pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-bold text-primary flex items-center gap-2">
                  <Terminal className="h-5 w-5" />
                  System Log
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0 h-64 overflow-y-auto text-sm font-mono text-muted-foreground">
                <AnimatePresence initial={false}>
                  {logs.map((log) => (
                    <motion.p
                      key={log.id}
                      variants={logVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.2 }}
                      className={`mb-1 ${
                        log.type === "error"
                          ? "text-destructive"
                          : log.type === "warning"
                            ? "text-yellow-500"
                            : log.type === "success"
                              ? "text-green-500"
                              : ""
                      }`}
                    >
                      {log.message}
                    </motion.p>
                  ))}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
