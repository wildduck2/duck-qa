'use client'

import { useState } from 'react'
import {
  ChevronDown,
  Camera,
  FileCode,
  Upload,
  Layout,
  UserPlus,
  Maximize2,
  Paperclip,
  ArrowUp,
} from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Textarea } from '~/components/ui/textarea'

export default function V0HomeInterface() {
  const [prompt, setPrompt] = useState('')

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black p-4">
      <div className="w-full max-w-3xl">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          What can I help you ship?
        </h1>

        <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 overflow-hidden">
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask v0 to build..."
            className="min-h-24 resize-none text-base bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-zinc-500"
          />

          <div className="flex items-center justify-between border-t border-zinc-800 p-2">
            <div className="flex items-center gap-2 text-zinc-400 text-sm">
              <Button
                variant="ghost"
                size="sm"
                className="text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                <span>No project selected</span>
                <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          <Button
            variant="outline"
            className="bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            <Camera className="mr-2 h-4 w-4" />
            Clone a Screenshot
          </Button>
          <Button
            variant="outline"
            className="bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            <FileCode className="mr-2 h-4 w-4" />
            Import from Figma
          </Button>
          <Button
            variant="outline"
            className="bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload a Project
          </Button>
          <Button
            variant="outline"
            className="bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            <Layout className="mr-2 h-4 w-4" />
            Landing Page
          </Button>
          <Button
            variant="outline"
            className="bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Sign Up Form
          </Button>
        </div>
      </div>
    </div>
  )
}
