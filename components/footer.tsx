import Link from "next/link"
import { Github, Linkedin, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border py-8 mt-20">
      <div className="container mx-auto px-4 text-center text-muted-foreground">
        <div className="flex justify-center space-x-4 mb-4">
          <Button variant="ghost" size="icon" asChild>
            <a href="https://github.com/Evirlcop" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://www.linkedin.com/in/nshimiyumukiza-thierry-61976a290/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </a>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <a
              href="https://www.instagram.com/occupy_gateways/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
            </a>
          </Button>
        </div>
        <p className="text-sm">&copy; {currentYear} Evilkop Sentinels. All rights reserved.</p>
        <p className="text-xs mt-1">
          Built with{" "}
          <Link href="https://nextjs.org/" className="text-primary hover:underline">
            Next.js
          </Link>{" "}
          and{" "}
          <Link href="https://supabase.com/" className="text-primary hover:underline">
            Supabase
          </Link>
          .
        </p>
      </div>
    </footer>
  )
}
