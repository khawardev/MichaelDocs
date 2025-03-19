"use client"
import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { IconFileTextSpark } from '@tabler/icons-react'
import GetYoutubeData from "@/components/get-youtubeData"
import { YoutubeCard } from "@/components/youtube-card"
import { fetchYoutubeData } from "@/lib/data"
import { Suspense } from "react"
import { SearchBar } from "@/components/search-bar"
import { Badge } from "@/components/ui/badge"
import { Icons } from "@/components/icons"
import { Send } from "lucide-react"
import { PiPaperPlaneTiltFill } from "react-icons/pi";
import { Pinecone } from '@pinecone-database/pinecone';

export default function HomePage() {
  // const handlefilePinecone = async () => {
  //   try {
  //     const response = await fetch('/api/upload', {
  //       method: 'POST',
  //     });
  //     const data = await response.json();
  //     console.log('File uploaded successfully!');
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // }

  const [sourceId, setSourceId] = useState("")
  const [youtubeData, setyoutubeData] = useState<any[] | undefined>(undefined)
  const router = useRouter()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (sourceId.trim()) {
      router.push(`/${sourceId}`)
    }
  }


  useEffect(() => {
    const fetchdata = async () => {
      const data: any = await fetchYoutubeData()
      setyoutubeData(data);
    }
    fetchdata();
  }, []);

  return (
    <div className="p-4 space-y-4">
      {/* <GetYoutubeData /> */}
      <Card className="space-y-7 w-full md:py-40  py-20   text-center  flex-col  bg-foreground rounded-2xl  transition-all duration-200 ease-in-out ">
        <form onSubmit={handleSubmit}>
          <div className="space-y2 md-flex-center w-full  gap-2">
            <Input
              id="sourceId"
              placeholder="Enter source ID..."
              value={sourceId}
              onChange={(e) => setSourceId(e.target.value)}
              className=" bg-white  md:w-[350px] h-[42px]   rounded-full placeholder:text-gray-600   py-2 px-5"
              required
            />
            <Button
              onClick={handleSubmit}
              disabled={!sourceId.trim()}
              type="submit"
              size="icon"
              className=" rounded-full   border border-black/20 px-10   transition-all duration-200 md:size-10 w-full py-5 flex items-center justify-center"
            >
              <PiPaperPlaneTiltFill className="size-10 " />
            </Button>
          </div>
        </form>
        <CardTitle className="md:text-8xl text-5xl leading-[60px] font-base  text-background tracking-[-3px] md:tracking-[-6px] ">Michael Docs </CardTitle>

      </Card>

      <main >
        {youtubeData?.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-xl text-muted-foreground mb-2">No videos found</p>
            <p className="text-sm text-muted-foreground">Try searching with different keywords</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Suspense
              fallback={
                <div className="col-span-full flex justify-center py-12">
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                    <p className="text-sm text-muted-foreground">Loading videos...</p>
                  </div>
                </div>
              }
            >
              {youtubeData?.map((item: any) => (
                <YoutubeCard key={item.id} data={item} />
              ))}
            </Suspense>
          </div>
        )}
      </main>

    </div>
  )
}

