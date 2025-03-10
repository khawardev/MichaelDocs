"use client"
import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { IconFileTextSpark } from '@tabler/icons-react'
import GetYoutubeData from "@/components/get-youtubeData"
export default function HomePage() {
  const [sourceId, setSourceId] = useState("")
  const router = useRouter()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (sourceId.trim()) {
      router.push(`/${sourceId}`)
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen   ">
      {/* <GetYoutubeData /> */}
      <Card className="w-full overflow-hidden transition-all duration-200 ease-in-out ">
        <CardHeader className="text-center pb-2 ">
          <div className="flex justify-center mb-4">
            <div className="bg-gray-500/5 p-4 rounded-xl">
              <IconFileTextSpark className="h-8 w-8 text-muted-foreground" />
            </div>
          </div>
          <CardTitle className="text-3xl font-extrabold tracking-tighter ">Michael Docs</CardTitle>
          <CardDescription className="text-gray-600 mt-2">
            Enter a source ID to start chatting with your PDF document
          </CardDescription>
          <CardDescription className="text-gray-600 mt-2">
            src_ycexNHY5tKgHbwiVKiYAN
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4 ">
          <form onSubmit={handleSubmit}>
            <div className="md:flex items-center justify-center md:space-y-0 space-y-3 gap-2 ">
              <div className="space-y-2">
                <Input
                  id="sourceId"
                  placeholder="Enter your source ID"
                  value={sourceId}
                  onChange={(e) => setSourceId(e.target.value)}
                  className=" bg-gray-100  md:w-[500px] w-full  rounded-full placeholder:text-gray-600   py-3 px-4"
                  required
                />
              </div>
              <Button
                onClick={handleSubmit}
                className="rounded-full transition-all duration-200 px-4 py-[22px] md:w-[140px] w-full   flex items-center justify-center"
                disabled={!sourceId.trim()}
              >
                Start Chatting
              </Button>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  )
}

