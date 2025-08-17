'use client';

import VideoComponent from "@/app/pages/LiveLessionPage/DetailLesson/VideoCompoent/page";
import Widget2 from "@/app/pages/LiveLessionPage/DetailLesson/Widget2/page";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Footer from "@/app/Shared/Footer/page";
import Navbar from "@/app/pages/HomePage/components/NavBar/page";



// Simulated fetch function to return a valid YouTube URL
async function fetchVideoData(fileName: string): Promise<{ url: string }> {
    return { url: `https://www.youtube.com/watch?v=${fileName}` };
}

const contentData = {
    listening: [
        "Listening Content 1",
        "Listening Content 2",
        "Listening Content 3",
    ],
    reading: [
        "Reading Content 1",
        "Reading Content 2",
        "Reading Content 3",
    ],
    speaking: [
        "Speaking Content 1",
        "Speaking Content 2",
        "Speaking Content 3",
    ],
    writing: [
        "Writing Content 1",
        "Writing Content 2",
        "Writing Content 3",
    ],
};

type SkillType = keyof typeof contentData;

export default function DetailLession() {

    const [videoUrl, setVideoUrl] = useState<string>("WCm2elbTEZQ");

    const [activeButton, setActiveButton] = useState<SkillType | null>(null);

    const [openStates, setOpenStates] = useState<boolean[]>([false, false, false, false]);

    const [open, setopen] = useState<boolean>(false)

    // Hàm toggle để mở/đóng nội dung theo chỉ số của div
    const toggleContent = (index: number) => {
        setopen(!open);
        setOpenStates((prev) => {
            const newStates = [...prev];
            newStates[index] = !newStates[index];
            return newStates;
        });
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const videoData = await fetchVideoData("WCm2elbTEZQ");
                setVideoUrl(videoData.url);
            } catch (error) {
                console.error("Error fetching video data:", error);
            }
        };
        fetchData();
    }, []);

    const handleButtonClick = (buttonType: SkillType) => {
        setActiveButton((prev) => (prev === buttonType ? null : buttonType));

    };

    return (
        <div className="h-auto bg-customBlue">
            <Navbar />
            <VideoComponent url={videoUrl} />
            <Widget2 />
            <div className="relative mt-10">
                <Image
                    src={`/assets/DetailLesson/spaceship.png`}
                    alt=""
                    height={80}
                    quality={100}
                    width={250}
                    className="rounded-lg mx-auto"
                />
                <Image
                    src={`/assets/DetailLesson/product-price-cloud.png`}
                    alt=""
                    height={180}
                    quality={100}
                    width={550}
                    className="rounded-lg bg-customBlue mx-auto"
                />
                <div className="p-10 absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center text-white space-y-2 z-20 w-full">
                    <h2 className="text-4xl font-bold text-customBlue">Improve All</h2>
                    <h1 className="text-5xl font-semibold text-customebrightBlue">4 IELTS SKILLS</h1>
                    <strong className="text-2xl text-customeBlack">BUY ONCE AND STUDY FOREVER</strong>
                    <span className="text-sm text-black">for just</span>
                    <h3 className="text-3xl font-extrabold text-customRed">$29.99</h3>
                </div>
            </div>

            <div className="bg-[#fff] mt-16 h-auto p-10">
                <h2 className="text-5xl text-customBlue font-bold text-center mb-8"> WHAT YOU WILL LEARN </h2>
                <div className="flex gap-10 justify-center mb-8">
                    {Object.keys(contentData).map((type) => (
                        <div key={type} className="relative w-32 h-12 bg-customebrightBlue rounded-xl">
                            <Button
                                onClick={() => handleButtonClick(type as SkillType)}
                                className={`bg-white text-customBlue rounded-xl w-32 h-12 text-lg border-solid border-2 border-Solid_while_color px-3 py-2  transition-transform duration-300 ${activeButton === type ? "translate-x-4" : ""
                                    }`}
                            >
                                <div className="flex justify-center items-center gap-2 text-lg">
                                    <Image
                                        src={`/assets/listeningTest/review-screen-svgrepo-com.svg`}
                                        alt=""
                                        height={200}
                                        width={20}
                                    />
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </div>
                            </Button>
                        </div>
                    ))}
                </div>

                {/* Content area */}
                {activeButton && (
                    <div className="p-6 bg-[#FFFFFF] rounded-lg text-center shadow-lg max-w-5xl min-h-16 mx-auto">

                        <div className="flex flex-wrap gap-6">
                            {contentData[activeButton].map((content, index) => (
                                <Button key={index} className="text-left bg-white shadow-md p-6 rounded-full  border-[#37854D] border-2 text-customeBlack cursor-text">
                                    {content}
                                </Button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-white">
                <h2 className="text-4xl text-center text-customBlue font-bold">FREQUENTLY ASKED QUESTIONS</h2>

                <div
                    className={`absolute left-36 ${open ? "w-[350px] h-[400px]" : "w-[200px] h-[350px]"
                        } transition-all duration-300 ease-in-out  rounded-lg `}
                >
                    {/* Ảnh lấp đầy thẻ div */}
                    <Image
                        src={`/assets/DetailLesson/icon-faq.png`}
                        alt="FAQ Icon"
                        layout="fill"
                        objectFit="contain" // Hiển thị toàn bộ ảnh mà không bị cắt
                        objectPosition="center" // Căn giữa ảnh trong khung
                        quality={100}
                    />
                </div>

                {/* Lặp qua danh sách div */}
                {openStates.map((isOpen, index) => (
                    <div className="p-4 pl-28" key={index} >
                        <div
                            className="cursor-pointer  text-white mx-96 rounded-lg w-3/6    "
                            onClick={() => toggleContent(index)} // Khi nhấn vào, gọi hàm toggle với chỉ số tương ứng
                        >
                            <div className="bg-customBlue p-3 ">
                                {isOpen ? "Hide Content" : "Show Content"}
                            </div>

                            {isOpen && (
                                <p className="text-2xl text-customBlue p-5 bg-customWhite">
                                    This is the hidden content for div {index + 1}. It shows when you click the button above!
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}
