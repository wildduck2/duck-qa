'use client'

import { useState } from 'react'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Paperclip } from 'lucide-react'
import { X } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '~/components/ui/tooltip'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowUp, Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Button } from '~/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '~/components/ui/form'
import { Textarea } from '~/components/ui/textarea'
import { chatSchema, type ChatSchema } from './chat-form.dto'

export default function Chat() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [files, setFiles] = useState<File[]>([])

  const form = useForm<ChatSchema>({
    resolver: zodResolver(chatSchema),
    defaultValues: {
      prompt: '',
      attachments: [],
    },
  })

  const handleFilesAdded = (newFiles: File[]) => {
    // Limit to 5 files total
    const updatedFiles = [...files, ...newFiles].slice(0, 5)
    setFiles(updatedFiles)
    form.setValue('attachments', updatedFiles, { shouldValidate: true })
  }

  const handleRemoveFile = (fileToRemove: File) => {
    const updatedFiles = files.filter((file) => file !== fileToRemove)
    setFiles(updatedFiles)
    form.setValue('attachments', updatedFiles, { shouldValidate: true })
  }

  const onSubmit = async (data: ChatSchema) => {
    setIsSubmitting(true)
    try {
      // Create a FormData object to handle file uploads
      const formData = new FormData()
      formData.append('prompt', data.prompt)

      // Append each file to the FormData
      data.attachments.forEach((file, index) => {
        formData.append(`file-${index}`, file)
      })

      // Simulate API call
      console.log('Submitting:', data.prompt, data.attachments)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Reset form after successful submission
      form.reset()
      setFiles([])
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-3xl">
      <h1 className="text-4xl font-bold text-white text-center mb-8">
        Upload Your Files, Instantly Generate Tests
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="rounded-lg border border-zinc-800 bg-zinc-900/50 overflow-hidden relative">
            <div>
              {files.length > 0 && (
                <div className="flex flex-wrap gap-2 m-2">
                  {files.map((file, index) => (
                    <FilePreview
                      key={`${file.name}-${index}`}
                      file={file}
                      onRemove={handleRemoveFile}
                    />
                  ))}
                </div>
              )}
            </div>
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Type your content here to generate tests..."
                      className="resize-none overflow-auto w-full flex-1 bg-transparent p-3 !text-lg outline-none ring-0 placeholder:text-gray-400 pb-12 h-[200px] placeholder:text-lg border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      {...field}
                    />
                  </FormControl>
                  <div className="px-3 absolute bottom-12 left-0 right-0">
                    <FormMessage className="text-red-500" />
                  </div>
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between p-2 absolute bottom-0 right-0 left-0 z-10">
              <div className="flex items-center gap-2 text-zinc-400 text-sm font-semibold p-2">
                {files.length > 0 && (
                  <span>
                    {files.length} file{files.length !== 1 ? 's' : ''} attached
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <FileUpload
                  onFilesAdded={handleFilesAdded}
                  maxFiles={5 - files.length}
                />

                <Button
                  type="submit"
                  variant="default"
                  size="icon"
                  className="h-8 w-8"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <ArrowUp className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

interface FilePreviewProps {
  file: File
  onRemove: (file: File) => void
}

export function FilePreview({ file, onRemove }: FilePreviewProps) {
  // Function to get file icon based on type
  const getFileIcon = () => {
    if (file.type.startsWith('image/')) {
      return (
        <div className="w-10 h-10 rounded bg-zinc-800 overflow-hidden flex items-center justify-center">
          <img
            src={URL.createObjectURL(file) || '/placeholder.svg'}
            alt={file.name}
            className="w-full h-full object-cover"
          />
        </div>
      )
    }

    return (
      <div className="w-10 h-10 rounded bg-zinc-800 flex items-center justify-center text-zinc-400">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 2V8H20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-3 bg-zinc-800/50 rounded-md p-2 pr-3 group relative">
      {getFileIcon()}
      <div className="flex flex-col min-w-0">
        <span className="text-sm text-zinc-200 truncate w-[172.6px]">
          {file.name}
        </span>
        <span className="text-xs text-zinc-400">
          {formatFileSize(file.size)}
        </span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-6 w-6 absolute -top-2 -right-2 bg-zinc-800 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={() => onRemove(file)}
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  )
}

interface FileUploadProps {
  onFilesAdded: (files: File[]) => void
  maxFiles?: number
}

export function FileUpload({ onFilesAdded, maxFiles = 5 }: FileUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles?.length > 0) {
        onFilesAdded(acceptedFiles)
      }
    },
    [onFilesAdded],
  )

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    maxFiles,
    accept: {
      // 'image/*': ['.png', '.jpg', '.jpeg', '.webp'],
      'application/pdf': ['.pdf'],
      // 'text/plain': ['.txt'],
      // 'application/json': ['.json'],
      // 'text/javascript': ['.js'],
      // 'text/typescript': ['.ts', '.tsx'],
      // 'text/html': ['.html', '.htm'],
      // 'text/css': ['.css'],
    },
  })

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-zinc-400 hover:text-zinc-300"
              onClick={open}
            >
              <Paperclip className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            Attach files (max {maxFiles})
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
