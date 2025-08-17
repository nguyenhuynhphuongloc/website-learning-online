import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { FaVolumeUp } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { TbPlayerSkipForward } from "react-icons/tb";
import { TbPlayerSkipBack } from "react-icons/tb";
import { RiPlayLargeFill, RiPauseFill } from "react-icons/ri";
import { TbPlayerPauseFilled } from "react-icons/tb";

export function NavbarPlayer({
    duration,
    currentTime,
    volume,
    progressPercentage,
    onRewind,
    onPlayPause,
    onForward,
    onVolumeChange,
    formatTime,
    isPlaying, // Thêm isPlaying vào props
}: NavbarPlayerProps) {
    return (
        <div className="w-full bg-customWhite h-10 flex items-center px-4 py-8">

            <div className="flex gap-4 items-center w-full justify-center">
                {/* Rewind Button */}
                <TbPlayerSkipBack className="cursor-pointer text-customeBlack text-xl hover:text-customebrightBlue" onClick={onRewind} />

                {/* Play/Pause Button */}
                <Button
                    className="bg-customebrightBlue text-customWhite rounded-full w-8 h-8 text-2xl px-2 py-2 hover:bg-customeDarkBlue"
                    onClick={onPlayPause}
                >
                    {isPlaying ? <TbPlayerPauseFilled /> : <RiPlayLargeFill />}  {/* Thay đổi giữa Play và Pause */}
                </Button>

                {/* Forward Button */}
                <TbPlayerSkipForward className="cursor-pointer text-customeBlack text-xl hover:text-customebrightBlue" onClick={onForward} />

                {/* Remaining Time */}
                <div className="text-base ml-12 text-customBlue">
                    {formatTime(duration - currentTime)}
                </div>

                <Slider
                    value={[progressPercentage]} // Progress as percentage
                    max={100} // Max is 100%
                    step={1}
                    className={cn("w-[60%] h-2 ml-0 cursor-pointer bg-gray-200 ")}
                />

                {/* Volume Icon */}
                <FaVolumeUp size={22} className="ml-5 text-customebrightBlue cursor-pointer hover:text-customeDarkBlue " />

                {/* Volume Slider */}
                <Slider
                    value={[volume * 100]} // Volume as percentage
                    max={100}
                    onValueChange={onVolumeChange}
                    className={cn("w-[15%] h-2 cursor-pointer bg-gray-200")}
                />
            </div>
        </div>
    );
}
