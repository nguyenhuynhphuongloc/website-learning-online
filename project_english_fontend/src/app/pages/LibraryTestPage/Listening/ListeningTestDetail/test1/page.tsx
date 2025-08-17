'use client';

import NavbarTest from "@/app/pages/LibraryTestPage/components/NavbarTest/page";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils"
import { FaVolumeUp } from "react-icons/fa";

export default function ListeningTestDetail() {
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null); // Định nghĩa kiểu dữ liệu cho state audio

    const [isPlaying, setIsPlaying] = useState(false); // Trạng thái phát/pause của audio

    const [duration, setDuration] = useState(0); // Thời gian của audio

    const [currentTime, setCurrentTime] = useState(0); // Thời gian hiện tại của audio

    const [volume, setVolume] = useState(0.33); // Volume state (initial value is 33%)

    const URL = "/sounds/2.7.mp3"; // Đảm bảo đúng đường dẫn đến file âm thanh

    // Tính phần trăm tiến trình phát của audio
    const progressPercentage = (currentTime / duration) * 100 || 0;

    // Cập nhật chiều rộng của slider với duration của audio
    const width = duration;

    useEffect(() => {
        const audioElement = new Audio(URL); // Tạo phần tử audio
        setAudio(audioElement); // Cập nhật state audio

        audioElement.onloadedmetadata = () => {
            setDuration(audioElement.duration); // Lấy duration của audio khi metadata được tải
        };

        // Cập nhật thời gian hiện tại khi audio đang phát
        const timeUpdateInterval = setInterval(() => {
            if (audioElement) {
                setCurrentTime(audioElement.currentTime); // Cập nhật thời gian hiện tại của audio
            }
        }, 1000); // Cập nhật mỗi giây

        // Dọn dẹp khi component unmount
        return () => {
            audioElement.pause(); // Dừng audio khi component unmount
            clearInterval(timeUpdateInterval); // Dừng interval
        };
    }, []); // Chạy effect này khi component được mount lần đầu tiên

    if (audio == null) {
        console.log("audio lỗi");
        return null;
    }

    const togglePlay = () => {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying); // Lật trạng thái phát/pause
    };

    // Hàm lùi lại 5 giây
    const rewind5Seconds = () => {
        if (audio) {
            const newTime = Math.max(audio.currentTime - 5, 0); // Lùi lại 5 giây nhưng không nhỏ hơn 0
            audio.currentTime = newTime;
            setCurrentTime(newTime); // Cập nhật currentTime state
        }
    };

    // Hàm lùi lại 5 giây và tiếp tục phát
    const rewind5SecondsAndPlay = () => {
        if (audio) {
            const newTime = Math.max(audio.currentTime + 5, 0); // Lùi lại 5 giây nhưng không nhỏ hơn 0
            audio.currentTime = newTime;
            setCurrentTime(newTime); // Cập nhật currentTime state
        }
    };

    // Cập nhật thời gian phát khi slider thay đổi
    const handleSliderChange = (value: number[]) => {
        if (audio) {
            audio.currentTime = value[0]; // Cập nhật thời gian phát khi người dùng thay đổi slider
            setCurrentTime(value[0]); // Cập nhật currentTime state
        }
    };

    const handleVolumeChange = (value: number[]) => {
        if (audio) {
            const newVolume = value[0] / 100; // Convert to a value between 0 and 1
            audio.volume = newVolume; // Update the volume of the audio
            setVolume(newVolume); // Update volume state
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds}`; // Định dạng với 2 chữ số cho giây
    };

    return (
        <div className="h-screen bg-darkWhite">

            <div className="">
                <div className="flex gap-[16px]  items-center p-5 relative bg-customWhite mt-1">

                    <Button
                        className="bg-customebrightBlue text-customWhite rounded-full w-10 h-10 text-2xl ml-10"
                        onClick={rewind5Seconds}
                    />
                    <Button
                        className="bg-customebrightBlue text-customWhite rounded-full w-14 h-14 text-2xl  ml-5"
                        onClick={togglePlay}
                    />
                    <Button
                        className="bg-customebrightBlue text-customWhite rounded-full w-10 h-10 text-2xl  ml-5"
                        onClick={rewind5SecondsAndPlay}
                    />

                    <div className="text-xl ml-5 mr-2">
                        {formatTime(duration - currentTime)} {/* Giảm dần thời gian */}
                    </div>

                    <Slider
                        defaultValue={[0]} // Giá trị mặc định là 0
                        value={[progressPercentage]} // Đồng bộ giá trị của slider với tiến trình phát của audio
                        max={100} // Giá trị tối đa của slider bằng với duration của audio
                        step={1} // Bước nhảy của slider là 1
                        className={cn("w-[70%]")} // Đặt chiều rộng của slider
                    />

                    <FaVolumeUp size={24} color="blue" className="ml-5" />

                    <Slider
                        value={[volume * 100]} // Display volume as percentage
                        max={100}
                        onValueChange={handleVolumeChange}
                        className={cn("w-[10%]")}
                    />


                </div>
            </div>
        </div>
    );
}
