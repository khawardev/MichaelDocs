// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Download, Loader2 } from "lucide-react";

// export default function YoutubeConverter() {
//     const [url, setUrl] = useState("");
//     const [audioUrl, setAudioUrl] = useState<string | null>(null);
//     const [videoTitle, setVideoTitle] = useState<string | null>(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [debugInfo, setDebugInfo] = useState<string | null>(null);

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setIsLoading(true);
//         setError(null);
//         setDebugInfo(null);

//         try {
//             console.log("Starting conversion for URL:", url);
//             const result: any = await convertYoutubeToAudio(url);
//             console.log("Conversion result:", result);

//             if (result.success) {
//                 setAudioUrl(result.audioUrl);
//                 setVideoTitle(result.title);
//             } else {
//                 setError(result.error);
//                 // If there's detailed error info, show it
//                 if (result.debugInfo) {
//                     setDebugInfo(result.debugInfo);
//                 }
//             }
//         } catch (err: any) {
//             console.error("Conversion error:", err);
//             setError("An unexpected error occurred. Please try again.");
//             setDebugInfo(err?.message || "No additional error details available");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <div className="container mx-auto max-w-xl py-10">
//             <Card>
//                 <CardHeader>
//                     <CardTitle>YouTube to Audio Converter</CardTitle>
//                     <CardDescription>
//                         Enter a YouTube URL to convert it to audio
//                     </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <form onSubmit={handleSubmit} className="space-y-4">
//                         <div className="flex flex-col space-y-2">
//                             <Input
//                                 type="text"
//                                 placeholder="https://www.youtube.com/watch?v=..."
//                                 value={url}
//                                 onChange={(e) => setUrl(e.target.value)}
//                                 className="w-full"
//                                 required
//                             />
//                         </div>
//                         <Button type="submit" className="w-full" disabled={isLoading}>
//                             {isLoading ? (
//                                 <>
//                                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                                     Converting...
//                                 </>
//                             ) : (
//                                 "Convert to Audio"
//                             )}
//                         </Button>
//                     </form>

//                     {error && (
//                         <Alert variant="destructive" className="mt-4">
//                             <AlertDescription>{error}</AlertDescription>
//                         </Alert>
//                     )}

//                     {debugInfo && (
//                         <div className="mt-2 p-4 bg-gray-100 rounded text-xs overflow-auto max-h-32">
//                             <p className="font-mono">{debugInfo}</p>
//                         </div>
//                     )}

//                     {audioUrl && (
//                         <div className="mt-6 space-y-4">
//                             <h3 className="text-lg font-medium">{videoTitle}</h3>
//                             <audio
//                                 controls
//                                 className="w-full"
//                                 src={audioUrl}
//                             >
//                                 Your browser does not support the audio element.
//                             </audio>
//                             <div className="flex justify-end">
//                                 <Button
//                                     variant="outline"
//                                     className="flex items-center gap-2"
//                                     asChild
//                                 >
//                                     <a href={audioUrl} download={`${videoTitle}.mp3`}>
//                                         <Download className="h-4 w-4" />
//                                         Download Audio
//                                     </a>
//                                 </Button>
//                             </div>
//                         </div>
//                     )}
//                 </CardContent>
//                 <CardFooter className="flex justify-center text-sm text-muted-foreground">
//                     Enter any YouTube video URL to convert it to an audio file
//                 </CardFooter>
//             </Card>
//         </div>
//     );
// }