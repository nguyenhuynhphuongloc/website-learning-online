
import { list } from '@vercel/blob'
import { Button } from "@/components/ui/button";
import { MdPlayArrow, MdPause, MdSkipNext, MdSkipPrevious } from 'react-icons/md';

type BlobData = {
    url: string
}




// Function to fetch video data
export async function fetchVideoData(fileName: string): Promise<BlobData> {
    const { blobs } = await list({
        prefix: fileName,
        limit: 1,
    })

    if (blobs.length === 0) {
        throw new Error('Video file not found')
    }

    return blobs[0]
}

// Video component
import { useState } from "react";


export default function VideoComponent({ url }: { url: string }) {
    const [showVideo, setShowVideo] = useState(false);

    return (
        
            <div className="mt-10 mx-auto">
                {showVideo ? (
                    <video
                        controls
                        preload="none"
                        className="w-full max-w-3xl rounded-lg shadow-lg mx-auto "
                        aria-label="Video player"
                    >
                        <source src={"/video/sobin.mp4"} type="video/mp4" />
                        
                    </video>
                ) : (
                    <div
                        className="w-full max-w-4xl h-[500px] bg-gray-200 rounded-2xl shadow-lg cursor-pointer hover:bg-gray-300 transition-all duration-300 mx-auto flex flex-col justify-between"
                    >
                        <div className="p-2">
                            <h2 className="text-4xl text-center font-semibold text-white mt-4">
                                IELTS
                            </h2>
                            <h2 className="text-6xl text-center font-bold text-customBlue mt-4">
                                Live Lessons
                            </h2>
                            <h2 className="text-6xl text-center font-bold text-customBlue mt-4">
                                (Recorded)
                            </h2>
                            <div className="flex items-center mt-5">
                                <Button
                                    onClick={() => setShowVideo(true)}
                                    className="p-6 bg-customebrightBlue mx-auto font-bold rounded-full"
                                >
                                    GET ACCESS TO ALL LIVE LESSON
                                </Button>
                            </div>
                        </div>
                        <div className="w-full h-24 bg-customBlue">
                            <div className='flex items-center h-2 w-3/5'>
                                <div className='bg-red-700 h-2 w-full'></div>
                                <div className='bg-red-700 h-5 w-5 rounded-full'></div>
                            </div>
                            <div className='flex justify-center my-6 gap-2'>
                                
                                <MdSkipPrevious size={32} />
                                <div className='rounded-full bg-[#fff] '>
                                    <MdPlayArrow size={36} />
                                </div>
                                
                                <MdSkipNext size={32} />
                            </div>
                           
                        </div>
                    </div>
                )}
            </div>
    );
}
