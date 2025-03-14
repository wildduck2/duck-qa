'use client'

import type React from 'react'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Textarea } from '~/components/ui/textarea'

export default function ChatPrompt() {
  const [prompt, setPrompt] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return

    // Simulate sending the prompt
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setPrompt('')
      // In a real app, you would send the prompt to an API here
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 p-4">
      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader className="border-b">
          <CardTitle className="text-center text-xl font-medium">
            Describe what you want to build
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A landing page for a coffee shop with a hero section, menu, and contact form"
              className="min-h-32 resize-none text-base"
            />
            <div className="text-sm text-muted-foreground">
              <p>Try:</p>
              <ul className="mt-2 space-y-1">
                <li
                  className="cursor-pointer hover:text-primary"
                  onClick={() =>
                    setPrompt(
                      'A dashboard for tracking daily fitness activities',
                    )
                  }
                >
                  • A dashboard for tracking daily fitness activities
                </li>
                <li
                  className="cursor-pointer hover:text-primary"
                  onClick={() =>
                    setPrompt(
                      'A blog homepage with featured posts and newsletter signup',
                    )
                  }
                >
                  • A blog homepage with featured posts and newsletter signup
                </li>
                <li
                  className="cursor-pointer hover:text-primary"
                  onClick={() =>
                    setPrompt(
                      'An e-commerce product page with image gallery and reviews',
                    )
                  }
                >
                  • An e-commerce product page with image gallery and reviews
                </li>
              </ul>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end border-t p-4">
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={!prompt.trim() || isLoading}
            className="gap-2"
          >
            {isLoading ? 'Generating...' : 'Generate'}
            <Send className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
