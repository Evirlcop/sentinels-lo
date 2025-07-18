"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface MarkdownRendererProps {
  content: string
}

/**
 * Renders markdown without an external syntax-highlighting package.
 * Code blocks are styled via Tailwind for readability, avoiding bundler issues.
 */
export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="markdown-content prose prose-blue dark:prose-invert max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ inline, className, children, ...props }) {
            // render inline or block the same – Tailwind handles styling
            return inline ? (
              <code className="px-1 py-0.5 rounded bg-muted font-mono text-sm" {...props}>
                {children}
              </code>
            ) : (
              <pre className="p-4 rounded-lg overflow-x-auto bg-muted" {...props}>
                <code className={`${className ?? ""} font-mono text-sm`}>{children}</code>
              </pre>
            )
          },
          img: ({ ...props }) => <img {...props} style={{ maxWidth: "100%", height: "auto" }} />,
          a: ({ ...props }) => <a target="_blank" rel="noopener noreferrer" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
