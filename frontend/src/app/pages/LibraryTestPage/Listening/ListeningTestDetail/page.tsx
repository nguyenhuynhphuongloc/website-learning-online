'use client';
import NavbarTest from "@/app/pages/LibraryTestPage/components/NavbarTest/page";
import { useEffect, useState } from "react";
import { FooterTest } from "@/app/pages/LibraryTestPage/components/FooterTest/page";
import { useSearchParams } from 'next/navigation';
import { useUserAnswers } from "@/context/useranswer.context";
import { Test } from "@/app/pages/LibraryTestPage/Reading/ReadingTestDetail/page";
import ExportQuestionTypes from "@/app/pages/LibraryTestPage/Reading/ReadingTestDetail/questions/questions";
import { authFreshToken } from "@/lib/auth.fetch";
import { NavbarPlayer } from "@/app/pages/LibraryTestPage/Listening/ListeningTestDetail/NavbarPlayer/page";



export default function ListeningTestDetail() {

    const searchParams = useSearchParams();

    const id = searchParams.get('id');

    const type = searchParams.get('type');

    const [audio, setAudio] = useState<HTMLAudioElement | null>(null); // Định nghĩa kiểu dữ liệu cho state audio

    const [isPlaying, setIsPlaying] = useState(false); // Trạng thái phát/pause của audio

    const [duration, setDuration] = useState(0); // Thời gian của audio

    const [currentTime, setCurrentTime] = useState(0); // Thời gian hiện tại của audio

    const [volume, setVolume] = useState(0.33); // Volume state (initial value is 33%)

    const [testData, setTestData] = useState<Test | null>(null);

    const [loading, setLoading] = useState(true);

    const { userAnswers, setUserAnswers } = useUserAnswers();

    const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);


    const handleAnswerChange = (questionId: number, answer: string) => {
        setUserAnswers((prev: any) => ({
            ...prev,
            [questionId]: answer,
        }));
    };

    const progressPercentage = (currentTime / duration) * 100 || 0;


    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                const res = await authFreshToken(`http://localhost:8080/listening-test/${id}`);

                if (!res.ok) {
                    throw new Error("Failed to fetch test data");
                }

                const data = await res.json();
                setTestData(data);

                const audioElement = new Audio(data.audio); // Tạo một đối tượng Audio mới với URL audio
                setAudio(audioElement); // Lưu trữ đối tượng Audio vào state

            } catch (error) {
                console.error("Failed to fetch test data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        if (!audio) return;

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
        };

        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [audio]);

    if (loading || !testData || !audio) {
        return <div className="text-center mt-10">Đang tải đề thi...</div>;
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
        <div className="flex flex-col h-screen bg-darkWhite">

            {/* Thanh điều hướng trên */}
            <NavbarTest
                id={id ?? ''}
                userAnswers={userAnswers}
                sectionInfo={testData?.section.map(sec => ({
                    sectionTitle: sec.content,
                    questionCount: sec.questions.length
                })) ?? []}
                data={testData}

                type={type || ''}
            />

            {/* Thanh điều khiển audio */}
            <NavbarPlayer
                duration={duration}
                currentTime={currentTime}
                volume={volume}
                progressPercentage={progressPercentage}
                onRewind={rewind5Seconds}
                onPlayPause={togglePlay}
                onForward={rewind5SecondsAndPlay}
                onVolumeChange={handleVolumeChange}
                formatTime={formatTime}
                isPlaying={isPlaying}
            />

      
            <div className="flex-1 overflow-y-auto px-4 py-2">
                {testData && testData.section[activeSectionIndex] && (
                    <ExportQuestionTypes
                        testData={[{ ...testData, section: [testData.section[activeSectionIndex]] }]}
                        userAnswers={userAnswers}
                        onAnswerChange={handleAnswerChange}
                    />
                )}
            </div>

     
            {testData && (
                <FooterTest
                    setActiveSectionIndex={setActiveSectionIndex}
                    sectionInfo={testData.section.map((sec, index) => ({
                        sectionIndex: index,
                        questionCount: sec.questions.length
                    }))}
                />
            )}
        </div>
    );

}
