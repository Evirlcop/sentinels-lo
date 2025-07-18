"use client"

import { Github, Linkedin, Instagram, ExternalLink, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageWithFallback } from "@/components/image-with-fallback"
import { motion } from "framer-motion" // Import motion for animations

export default function AboutPage() {
  const skills = [
    "C",
    "Python",
    "Bash",
    "Batch",
    "JavaScript",
    "Browser Exploitation Framework",
    "Beautiful Soup",
    "PowerShell scripting",
    "Machine Learning",
    "AI",
    "Embedded Systems",
    "Assembly Languages",
    "x86 Binary Exploitation",
  ]

  const interests = [
    "Reverse engineering",
    "Malware analysis and development",
    "Exploit development",
    "Writing debuggers",
    "Keyloggers",
    "Android RATs",
    "Assembly languages",
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div className="text-center mb-12" initial="hidden" animate="visible" variants={containerVariants}>
            <motion.div className="flex justify-center mb-6" variants={itemVariants}>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <ImageWithFallback
                  src="https://sbojnesivcuawnrpjrfu.supabase.co/storage/v1/object/public/sentinels/hacker.png"
                  alt="Profile"
                  width={150}
                  height={150}
                  className="rounded-full border border-primary/20 shadow-lg"
                  fallbackSrc="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiByeD0iNzUiIGZpbGw9IiMzYjgyZjYiLz4KPHN2ZyB4PSI0NSIgeT0iNDUiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJ3aGl0ZSI+CjxwYXRoIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMnM0LjQ4IDEwIDEwIDEwIDEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAyem0tMiAxNWwtNS01IDEuNDEtMS40MUwxMCAxNC4xN2w3LjU5LTcuNTlMMTkgOGwtOSA5eiIvPgo8L3N2Zz4KPC9zdmc+"
                />
              </motion.div>
            </motion.div>
            <motion.h1
              className="text-4xl md:text-6xl font-bold text-foreground mb-4 text-glow"
              variants={itemVariants}
            >
              About Me
            </motion.h1>
            <motion.p className="text-xl text-muted-foreground max-w-2xl mx-auto" variants={itemVariants}>
              Stop 🛑! I am Thierry Nshimiyumukiza From Rwanda. I do stuff 🙂
            </motion.p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Bio Section */}
            <motion.div variants={itemVariants}>
              <Card className="border border-border bg-card hover:shadow-xl transition-all duration-300 card-glow-hover">
                <CardHeader>
                  <CardTitle className="text-primary flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    I’m someone who loves taking things apart to understand how they really work — especially when it
                    comes to computers.
                  </p>
                  <p>
                    Right now, I’m diving into reverse engineering, malware analysis, and binary exploitation, learning
                    how systems behave from the inside out.
                  </p>
                  <p>
                    I’m not in a rush — just steadily dissecting and learning everything I can, from low-level assembly
                    all the way up to high-level software and how it all ties into hardware.
                  </p>
                  <p>
                    It's about building a deep, ground-up understanding of how things work — and sometimes, how they
                    break.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Education */}
            <motion.div variants={itemVariants}>
              <Card className="border border-border bg-card hover:shadow-xl transition-all duration-300 card-glow-hover">
                <CardHeader>
                  <CardTitle className="text-primary">Education</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    <ImageWithFallback
                      src="https://sbojnesivcuawnrpjrfu.supabase.co/storage/v1/object/public/sentinels/bracu.png"
                      alt="BRAC University"
                      width={60}
                      height={60}
                      className="rounded-lg border border-border"
                      fallbackSrc="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiByeD0iOCIgZmlsbD0iIzNiODJmNiIvPgo8dGV4dCB4PSIzMCIgeT0iMzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkJSQUM8L3RleHQ+Cjwvc3ZnPg=="
                    />
                    <div>
                      <h3 className="text-lg font-semibold">BRAC University</h3>
                      <p className="text-primary text-sm">2023 - 2027</p>
                      <Button variant="link" className="p-0 h-auto text-primary" asChild>
                        <a href="https://www.bracu.ac.bd/" target="_blank" rel="noopener noreferrer">
                          Visit Website <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <ImageWithFallback
                      src="https://sbojnesivcuawnrpjrfu.supabase.co/storage/v1/object/public/sentinels/lycee.jpeg"
                      alt="Lycée de Kigali"
                      width={60}
                      height={60}
                      className="rounded-lg border border-border"
                      fallbackSrc="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiByeD0iOCIgZmlsbD0iIzNiODJmNiIvPgo8dGV4dCB4PSIzMCIgeT0iMzUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmllbGw9IndoaXRlIiB0ZXh0LWFuY2hvcjpsbWlkZGxlIj5MeWPDqWUKPC90ZXh0Pgo8L3N2Zz4="
                    />
                    <div>
                      <h3 className="text-lg font-semibold">Lycée de Kigali</h3>
                      <p className="text-primary text-sm">2019 - 2022</p>
                      <Button variant="link" className="p-0 h-auto text-primary" asChild>
                        <a href="https://lyceedekigali.ac.rw/" target="_blank" rel="noopener noreferrer">
                          Visit Website <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            {/* Interests */}
            <motion.div variants={itemVariants}>
              <Card className="border border-border bg-card hover:shadow-xl transition-all duration-300 card-glow-hover">
                <CardHeader>
                  <CardTitle className="text-primary">Core Interests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-3">
                    {interests.map((interest, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm">{interest}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Skills */}
            <motion.div variants={itemVariants}>
              <Card className="border border-border bg-card hover:shadow-xl transition-all duration-300 card-glow-hover">
                <CardHeader>
                  <CardTitle className="text-primary">Technical Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                      <motion.span
                        key={index}
                        className="relative px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-xs rounded-full overflow-hidden cursor-pointer skill-chip" // Added skill-chip class
                        whileHover={{ scale: 1.05, boxShadow: "0 0 8px rgba(var(--primary), 0.5)" }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.03 }}
                      >
                        <span className="relative z-10">{skill}</span> {/* Ensure text is above pseudo-element */}
                      </motion.span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Social Links */}
          <motion.div initial="hidden" animate="visible" variants={itemVariants}>
            <Card className="border border-border bg-card hover:shadow-xl transition-all duration-300 card-glow-hover">
              <CardHeader>
                <CardTitle className="text-primary text-center">Connect With Me</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline" size="lg" className="hover:bg-primary/10 bg-transparent" asChild>
                    <a href="https://github.com/Evirlcop" target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub: Evirlcop
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>

                  <Button variant="outline" size="lg" className="hover:bg-primary/10 bg-transparent" asChild>
                    <a
                      href="https://www.linkedin.com/in/nshimiyumukiza-thierry-61976a290/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="mr-2 h-4 w-4" />
                      LinkedIn
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>

                  <Button variant="outline" size="lg" className="hover:bg-primary/10 bg-transparent" asChild>
                    <a
                      href="https://www.instagram.com/occupy_gateways/?hl=en"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram className="mr-2 h-4 w-4" />
                      @occupy_gateways
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
