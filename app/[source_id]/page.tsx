"use client"

import { useParams } from "next/navigation"
import { ChatInterface } from "@/components/chat-interface"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

export default function ChatPage() {
  const params = useParams()
  const sourceId = params.source_id as string

  return (
    <div className="flex flex-col h-screen ">
      <main className="flex items-center justify-center h-full ">
        <div className="w-full">
          <ChatInterface sourceId={sourceId} />
        </div>
      </main>
    </div>
  )
}

