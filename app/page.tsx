"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { FileText, Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { IconFileTextSpark } from '@tabler/icons-react'
export default function HomePage() {
  const [sourceId, setSourceId] = useState("")
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (sourceId.trim()) {
      router.push(`/${sourceId}`)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-4 sm:p-6 ">
      <Card className="w-full max-w-md  overflow-hidden transition-all duration-200 ease-in-out ">
        <CardHeader className="text-center pb-2 ">
          <div className="flex justify-center mb-4">
            <div className="bg-gray-500/10 p-4 rounded-xl">
              <IconFileTextSpark className="h-8 w-8 text-muted-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-extrabold tracking-tighter ">ChatDocs</CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Enter a source ID to start chatting with your PDF document
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 pt-4">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="sourceId" className="ml-1 text-sm font-medium ">
                  Source ID
                </label>
                <Input
                  id="sourceId"
                  placeholder="Enter your source ID"
                  value={sourceId}
                  onChange={(e) => setSourceId(e.target.value)}
                  className="flex-grow bg-gray-100   rounded-full placeholder:text-gray-600   py-3 px-4"
                  required
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className=" ">
          <Button
            onClick={handleSubmit}
            className="rounded-full w-full  transition-all duration-200 p-7  flex items-center justify-center"
            disabled={!sourceId.trim()}
          >
            Start Chatting
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

