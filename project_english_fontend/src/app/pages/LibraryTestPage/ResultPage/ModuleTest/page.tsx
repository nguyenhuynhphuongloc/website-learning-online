"use client";

import { useEffect, useState } from "react";
import Image from "next/image"; // Import Image từ Next.js
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";

export default function ModuleTest() {
    const [isClient, setIsClient] = useState(false);

    const router = useRouter()

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return null;
    }
   

    return (
        <div className="w-full p-6">
            <h2 className="text-xl font-bold text-customBlue mb-6">
                Other modules in this test:
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Module 1 */}
                <div className="p-5 flex flex-col items-center gap-4 h-auto rounded-lg ">
                    <Image
                        src="/assets/ResultingPage/read-svgrepo-com.svg"
                        alt="Module 1"
                        width={80}
                        height={120}
                        className="rounded-lg object-cover"
                    />
                    <Button
                        onClick={() => router.push('./')}
                        className="w-full bg-green-700 hover:bg-green-800 text-white"
                    >
                        Take Test
                    </Button>
                    <Button
                        onClick={() => console.log("Details Module 1")}
                        className="w-full bg-green-900 hover:bg-green-800 text-white"
                    >
                        View Solution
                    </Button>
                </div>

                {/* Module 2 */}
                <div className="p-5 flex flex-col items-center gap-4 h-auto rounded-lg  ">
                    <Image
                        src="/assets/ResultingPage/microphone-svgrepo-com.svg"
                        alt="Module 2"
                        width={80}
                        height={120}
                        className="rounded-lg object-cover"
                    />
                    <Button
                        onClick={() => console.log("Start Module 2")}
                        className="w-full bg-customRed hover:bg-red-600 text-white"
                    >
                        Start
                    </Button>
                    <Button
                        onClick={() => console.log("Details Module 2")}
                        className="w-full bg-customRed hover:bg-red-600 text-white"
                    >
                        Details
                    </Button>
                </div>

                {/* Module 3 */}
                <div className="p-5 flex flex-col items-center gap-4 h-auto rounded-lg  ">
                    <Image
                        src="/assets/ResultingPage/pencil-svgrepo-com.svg"
                        alt="Module 3"
                        width={80}
                        height={120}
                        className="rounded-lg object-cover"
                    />
                    <Button
                        onClick={() => console.log("Start Module 3")}
                        className="w-full bg-customYellow text-white hover:bg-yellow-500"
                    >
                        Start
                    </Button>
                    <Button
                        onClick={() => console.log("Details Module 3")}
                        className="w-full bg-yellow-600 text-white hover:bg-customYellow"
                    >
                        Details
                    </Button>
                </div>
            </div>
        </div>

    );
}
