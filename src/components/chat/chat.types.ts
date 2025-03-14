import { LucideIcon } from 'lucide-react'

export interface ToolbarButton {
  icon: LucideIcon
  onClick?: () => void
  className: string | ((isRecording: boolean) => string)
  isFileInput?: boolean
  isRecording?: boolean
}
