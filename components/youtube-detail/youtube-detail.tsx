import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { YoutubeData } from "@/lib/data"
import { getYoutubeVideoId, parseStructuredData } from "@/lib/utils"
import { Calendar, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import Link from "next/link"
import { Button } from "../ui/button"
import { formatDistanceToNow } from "date-fns"
import getRelativeTime from "@/hooks/client-functions"

interface YoutubeDetailProps {
    data: YoutubeData
}

export function YoutubeDetail({ data }: YoutubeDetailProps) {
    const videoId = getYoutubeVideoId(data.videoUrl)

    // Parse structured data
    const peopleData = parseStructuredData(data.peopleDatabase, "people")
    const toolData = parseStructuredData(data.toolDatabase, "tool")
    const caseStudiesData = parseStructuredData(data.caseStudies, "caseStudies")
    const useCasesData = parseStructuredData(data.useCases, "useCases")
    const summaryData = parseStructuredData(data.summary, "summary")
    const implicationsData = parseStructuredData(data.implications, "implications")
    const articleIdeasData = parseStructuredData(data.articleIdeas, "articleIdeas")
    const opportunitiesData = parseStructuredData(data.opportunities, "opportunities")
    const risksData = parseStructuredData(data.risks, "risks")
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <div className="flex items-center justify-between gap-2 text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <span className=" text-sm">{getRelativeTime(data.date)}</span>
                   </div>
                    <Link target="_blank" rel="noopener noreferrer" href={data.videoUrl}>
                        <Button
                            size={'sm'}
                            variant={'ghost'}
                            className="rounded-full text-muted-foreground"
                        >
                            watch 
                            <ExternalLink className="h-2 w-2" />
                        </Button>
                    </Link>
                </div>
                <h1 className="text-3xl font-bold">{data.videoTitle}</h1>
                <div className="flex items-center gap-2">
                    <span className="text-lg text-muted-foreground">{data.channelTitle}</span>
                </div>
            </div>

            <div className="aspect-video bg-muted border md:rounded-3xl rounded-2xl overflow-hidden relative">
                {videoId ? (
                    <iframe
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title={data.videoTitle}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute  top-0 left-0 w-full h-full rounded-lg"
                    ></iframe>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-muted-foreground">Video not available</p>
                    </div>
                )}
            </div>

            <Tabs defaultValue="transcript" className="w-full">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full md:w-fit">
                    <TabsTrigger value="transcript">Transcript</TabsTrigger>
                    <TabsTrigger value="databases">Databases</TabsTrigger>
                    <TabsTrigger value="analysis">Analysis</TabsTrigger>
                    <TabsTrigger value="ideas">Ideas</TabsTrigger>
                </TabsList>

                <TabsContent value="transcript" className="space-y-4 mt-4">
                    <Card className="border bg-accent">
                        <CardHeader>
                            <CardTitle>Video Transcript</CardTitle>
                        </CardHeader>
                        <CardContent className=" h-[40vh] overflow-y-auto" >
                            <p className="whitespace-pre-line">{data.videoTranscript}</p>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="databases" className="space-y-6 mt-4">
                    <Card className="border bg-accent">
                        <CardHeader>
                            <CardTitle>People Database</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {Object.entries(peopleData).map(([key, value], index) => (
                                    <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2">
                                        <div className="font-medium text-muted-foreground">{key}:</div>
                                        <div className="md:col-span-3">{value}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border bg-accent">
                        <CardHeader>
                            <CardTitle>Tool Database</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {Object.entries(toolData).map(([key, value], index) => (
                                    <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2">
                                        <div className="font-medium text-muted-foreground">{key}:</div>
                                        <div className="md:col-span-3">{value}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border bg-accent">
                        <CardHeader>
                            <CardTitle>Case Studies</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {Object.entries(caseStudiesData).map(([key, value], index) => (
                                    <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2">
                                        <div className="font-medium text-muted-foreground">{key}:</div>
                                        <div className="md:col-span-3">{value}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border bg-accent">
                        <CardHeader>
                            <CardTitle>Use Cases</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {Object.entries(useCasesData).map(([key, value], index) => (
                                    <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2">
                                        <div className="font-medium text-muted-foreground">{key}:</div>
                                        <div className="md:col-span-3">{value}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="analysis" className="space-y-6 mt-4">
                    <Card className="border bg-accent">
                        <CardHeader>
                            <CardTitle>Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {Object.entries(summaryData).map(([key, value], index) => (
                                    <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2">
                                        <div className="font-medium text-muted-foreground">{key}:</div>
                                        <div className="md:col-span-3">{value}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border bg-accent">
                        <CardHeader>
                            <CardTitle>Implications</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {Object.entries(implicationsData).map(([key, value], index) => (
                                    <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2">
                                        <div className="font-medium text-muted-foreground">{key}:</div>
                                        <div className="md:col-span-3">{value}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="ideas" className="space-y-6 mt-4">
                    <Card className="border bg-accent">
                        <CardHeader>
                            <CardTitle>Article Ideas</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {Object.entries(articleIdeasData).map(([key, value], index) => (
                                    <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2">
                                        <div className="font-medium text-muted-foreground">{key}:</div>
                                        <div className="md:col-span-3">{value}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border bg-accent">
                        <CardHeader>
                            <CardTitle>Opportunities</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {Object.entries(opportunitiesData).map(([key, value], index) => (
                                    <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2">
                                        <div className="font-medium text-muted-foreground">{key}:</div>
                                        <div className="md:col-span-3">{value}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border bg-accent">
                        <CardHeader>
                            <CardTitle>Risks</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {Object.entries(risksData).map(([key, value], index) => (
                                    <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-2">
                                        <div className="font-medium text-muted-foreground">{key}:</div>
                                        <div className="md:col-span-3">{value}</div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

