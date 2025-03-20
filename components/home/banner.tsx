'use client'
import React from 'react'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { PiPaperPlaneTiltFill } from 'react-icons/pi'

const Banner = () => {
    const [sourceId, setSourceId] = useState("")
    const router = useRouter()
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (sourceId.trim()) {
            router.push(`/${sourceId}`)
        }
    }
    return (
        <Card className="space-y-7 w-full md:py-40  py-20   text-center  flex-col  bg-foreground rounded-3xl  transition-all duration-200 ease-in-out ">
            <CardTitle className="md:hidden block  md:text-8xl text-5xl leading-[60px] font-bold  text-background tracking-[-3px] md:tracking-[-6px] ">Michael Docs </CardTitle>
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
            <CardTitle className="md:block hidden md:text-8xl text-5xl leading-[60px] font-base  text-background tracking-[-3px] md:tracking-[-6px] ">Michael Docs </CardTitle>
        </Card>
    )
}

export default Banner