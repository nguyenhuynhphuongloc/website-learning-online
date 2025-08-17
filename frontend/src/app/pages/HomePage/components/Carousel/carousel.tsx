import * as React from "react"
import Image from "next/image" // Import Image từ Next.js

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel"

export function CarouselDApiDemo() {
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)
    const [count, setCount] = React.useState(0)

    React.useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap() + 1)

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1)
        })
    }, [api])

    return (
        <Carousel
            className="h-[540px] w-full "
            opts={{ loop: true }}
        >
            <CarouselContent className="w-full h-[540px]">
                <CarouselItem className="flex justify-center items-center h-full">
                    <div className="w-full h-full">
                        <Card className="w-full h-full border-none rounded-none bg-cover bg-center bg-no-repeat relative"
                            style={{
                                backgroundImage: "url('/assets/homepage/slider1/hero-bg-2.svg')",
                            }}>
                            <CardContent className="absolute inset-0 flex flex-col items-start justify-center pl-12 space-y-6">
                                <h2 className="text-white text-4xl font-bold">WE TAKE YOUR</h2>
                                <h1 className="text-white text-6xl font-extrabold">
                                    IELTS SCORE HIGHER
                                </h1>
                                <p className="text-teal-300 text-xl">
                                    Get ready for your 2024 IELTS exam by practicing our 100+ IELTS
                                    mock tests <span className="font-bold">for FREE</span>.
                                </p>
                                <div className="flex items-center space-x-3">
                                   
                                    <p className="text-white">
                                        <span className="font-bold">28,000,000</span> students are using
                                        our free services.
                                    </p>
                                </div>
                                <button className="bg-yellow-400 text-blue-900 font-bold py-2 px-6 rounded">
                                    START NOW
                                </button>
                            </CardContent>
                        </Card>
                    </div>
                </CarouselItem>
                <CarouselItem className="flex justify-center items-center h-full">
                    <Card className="w-full h-full border-none rounded-none bg-cover bg-center bg-no-repeat relative bg-customBlue"
                        style={{
                            backgroundImage: "url('/assets/homepage/slider2/hero-bg-5.svg')",
                        }}>
                        <CardContent className="container mx-auto h-full flex flex-col md:flex-row items-center justify-between px-8 py-12">
                            <div className="flex flex-col space-y-4 max-w-lg mb-8 md:mb-0">
                                <div className="flex items-center space-x-6">
                                    <Image
                                        src="/assets/homepage/slider2/intergreat-logo-en.svg"
                                        alt="InterGreat Logo"
                                        width={0}
                                        height={0}
                                        className="w-36 h-auto"
                                    />
                                   
                                </div>

                                {/* Main Title/Text */}
                                <h2 className="text-2xl md:text-3xl font-semibold">Proud to be</h2>
                                <h1 className="text-4xl md:text-6xl font-extrabold">PLATINUM</h1>
                                <h2 className="text-2xl md:text-3xl font-bold">MEMBER</h2>
                                <p className="text-base md:text-lg">
                                    of the British Council Partnership Programme
                                </p>

                                {/* Learn More Button */}
                                <button className="bg-[#ffbc17] text-[#072C51] font-bold py-2 px-6 rounded-md mt-4 w-fit">
                                    LEARN MORE
                                </button>
                            </div>

                            {/* Right Side: Certificate Image */}
                            <div className="flex-shrink-0">
                                <Image
                                    src="/assets/homepage/slider2/IEG-certificate.png"
                                    alt="Certificate"
                                    width={620}
                                    height={460}
                                    className=""
                                />
                            </div>
                        </CardContent>
                    </Card>
                </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className='absolute left-[1rem] top-1/2 transform -translate-y-1/2 z-40  duration-1000' />
            <CarouselNext className='absolute right-[1rem] top-1/2 transform -translate-y-1/2 z-40 duration-1000' />
        </Carousel>
    )
}
