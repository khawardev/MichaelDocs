"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { AlertDialogProps } from "@radix-ui/react-alert-dialog";
import {
  CircleIcon,
  FileIcon,
  LaptopIcon,
  MoonIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { blocksConfig } from "@/config/blocks";
import { cn, getYoutubeThumbnailUrl, getYoutubeVideoId } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Search } from "lucide-react";
import Spinner from "../spinner";
import { fetchYoutubeDataByTitle } from "@/actions/youtube-actions";
import Image from "next/image";
// ... existing code ...

export function CommandMenu({ ...props }: AlertDialogProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [videos, setVideos] = React.useState([]);
  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  const fetchVideos = async (query: string) => {
    setLoading(true);
    try {
      const data: any = await fetchYoutubeDataByTitle(query.toLowerCase());
      setVideos(data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const query = event.currentTarget.value;
      fetchVideos(query);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          "relative h-8 px-2 w-full justify-start rounded-lg bg-background/80 text-sm font-normal text-muted-foreground shadow-none sm:pr-12 md:w-40 lg:w-64"
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <kbd className="sm:flex pointer-events-none hidden select-none items-center font-mono p-[2px] font-medium opacity-100">
          <Search className="shrink-0 size-1 opacity-50" />
        </kbd>
        <span>Search videos...</span>
      </Button>
      <CommandDialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
        <CommandInput placeholder="search videos..." onKeyDown={handleSearch} />
        <CommandList>
          {loading ? (
            <div className="relative h-[110px] flex-center">
              <Spinner />
            </div>
          ) : (
            <>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading={`${videos.length > 0 ? `${videos.length} video found` : ''}`}>
                {videos?.map((video: any) => {
                  const videoId = getYoutubeVideoId(video.videoUrl);
                  const thumbnailUrl = videoId ? getYoutubeThumbnailUrl(videoId) : "/placeholder.svg?height=720&width=1280";
                  return (
                    <CommandItem
                      key={video.id}
                      value={video.videoTitle}
                      onSelect={() => {
                        runCommand(() => router.push(`/youtube/${video.id}`));
                      }}
                      className="flex gap-3"
                    >
                      <div className=" rounded-md  w-[70px] h-[40px] relative">
                        <Image
                          src={thumbnailUrl || "/placeholder.svg"}
                          alt={video.videoTitle}
                          fill
                          className="object-cover rounded-sm "
                        />
                      </div>
                      <div>
                        <div className=" line-clamp-1">{video.videoTitle}</div>
                        <div className="text-xs text-muted-foreground">{video.channelTitle}</div>
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}