"use client"
import axios from "axios";
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTypingAnimation } from "@/hooks/use-typing-animation"
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PiPaperPlaneTiltFill } from "react-icons/pi";
type Message = {
  id: string
  role: "user" | "assistant"
  content: string
}

export function ChatInterface({ sourceId, videoTitle }: any) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)


  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    let header = {
      headers: {
        "x-api-key": `${process.env.NEXT_PUBLIC_CHATPDF_API_KEY}`,
        "Content-Type": "application/json",
      },
    };
    let body: any = {
      sourceId: sourceId,
      messages: [
        {
          role: "user",
          content: input,
        },
      ],
    };
    try {
      const response = await axios
        .post("https://api.chatpdf.com/v1/chats/message", body, header)
        .then((response: any) => {
          return response.data.content;
        })
        .catch((error: any) => {
          console.error("Error:", error.message);
          console.log("Response:", error.response.data);
        });
      console.log(response, 'response -----------');

      if (response) {
        const assistantMessage: Message = {
          id: Date.now().toString(),
          role: "assistant",
          content: response || "Sorry, I couldn't process your request.",
        }

        setMessages((prev) => [...prev, assistantMessage])
      } else {
        const assistantMessage: Message = {
          id: Date.now().toString(),
          role: "assistant",
          content: "Sorry, there was an error processing your request.",
        }

        setMessages((prev) => [...prev, assistantMessage])
      }
    } catch (error) {
      console.error("Error sending message:", error)
      const assistantMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: "Sorry, there was an error connecting to the server.",
      }

      setMessages((prev) => [...prev, assistantMessage])
    } finally {
      setIsLoading(false)
      inputRef.current?.focus()
    }
  }

  return (
    <div className="flex flex-col w-full   md:h-[79vh] h-[85vh]  overflow-hidden">
      <div className="text-center ">
        <h2 className="text-lg font-semibold mb-4 ">{videoTitle}</h2>
      </div>
      <div
        ref={chatContainerRef}
        className="flex-grow overflow-y-auto  scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
      >
        <div className=" mx-auto space-y-6">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground my-12">
              <p className="md:text-lg text-sm ">Start a conversation about your document</p>
              <p className="md:text-sm text-xs">Ask questions about the content of the PDF</p>
            </div>
          ) : (
            messages.map((message) => <MessageBubble key={message.id} message={message} />)
          )}
          {isLoading && (
            <div className="flex justify-start w-full">
              <div className="message-bubble assistant-message ">
                <div className="flex items-center space-x-2 ">
                  <div className="typing-indicator py-1.5">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <form onSubmit={handleSendMessage} className="flex justify-center items-center gap-3  pt-1">
        <Input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message..."
          disabled={isLoading}
          className="flex-grow bg-gray-100   rounded-full placeholder:text-gray-600   py-3 px-4"
        />
        <Button
          type="submit"
          size="icon"
          disabled={isLoading}
          className=" rounded-full  transition-all duration-200 size-10 px-4 flex items-center justify-center"
        >
          <PiPaperPlaneTiltFill className="size-14 " />
        </Button>
      </form>
    </div>
  )
}

function MessageBubble({ message }: { message: Message }) {
  const isAssistant = message.role === "assistant"
  const { displayText, isComplete } = useTypingAnimation(message.content, isAssistant ? 10 : 0)

  return (
    <div className={`flex w-full gap-1 ${isAssistant ? "justify-start" : "justify-end"}`}>

      <div className={`message-bubble ${isAssistant ? "assistant-message " : "user-message"}`}>
        {isAssistant ?
          <div>
            <div className=" space-y-3 markdown-body ">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{displayText}</ReactMarkdown>
            </div>
          </div>
          :
          message.content
        }
      </div>
    </div>
  )
}

