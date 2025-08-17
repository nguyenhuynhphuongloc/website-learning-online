import { Button } from "@/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@radix-ui/react-navigation-menu";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { TfiAlignJustify } from "react-icons/tfi";
import { TfiFullscreen } from "react-icons/tfi";
import { CiLogout } from "react-icons/ci";
import Modal from "@/app/Shared/Modal/mobal_review";
import ModalSubmit from "@/app/Shared/Modal/mobal_submit";
import Image from "next/image"; // Import Image từ Next.js
import { Test } from "@/app/pages/LibraryTestPage/Reading/ReadingTestDetail/page";
import axios from "axios";
import { user } from "@nextui-org/react";
import { authFreshToken } from "@/lib/auth.fetch";


interface SectionInfo {
    sectionTitle: string;
    questionCount: number;
    // Add any other properties necessary
}

interface NavbarTestProps {
    userAnswers: Record<number, string>;
    sectionInfo: SectionInfo[]; // Update to SectionInfo[] type
    data: Test | null; // 👈 Thêm dòng này
    id: string
    type: string;
}


export default function NavbarTest({ userAnswers, sectionInfo, data, id, type }: NavbarTestProps) {

    const searchParams = useSearchParams();

    const router = useRouter();


    const [showMobalReview, setShowMobalReview] = useState(false);

    const [showMobalSubmit, setShowMobalSubmit] = useState(false);

    const openModal = () => setShowMobalReview(true);

    const closeModal = () => setShowMobalReview(false);

    const openModalSubmit = () => setShowMobalSubmit(true);

    const closeModalSubmit = () => setShowMobalSubmit(false);

    const handleFullscreen = () => {

        if (!document.fullscreenElement) {

            document.documentElement

                .requestFullscreen()

                .catch((err) => {

                    console.error(`Error attempting to enable full-screen mode: ${err.message}`);

                });

        } else {
            document.exitFullscreen().catch((err) => {
                console.error(`Error attempting to exit full-screen mode: ${err.message}`);
            });
        }
    };

    const convertScoreToBand = (correctAnswers: number): number => {
        switch (true) {
            case correctAnswers >= 39: return 9.0;
            case correctAnswers >= 37: return 8.5;
            case correctAnswers >= 35: return 8.0;
            case correctAnswers >= 33: return 7.5;
            case correctAnswers >= 30: return 7.0;
            case correctAnswers >= 27: return 6.5;
            case correctAnswers >= 23: return 6.0;
            case correctAnswers >= 19: return 5.5;
            case correctAnswers >= 15: return 5.0;
            case correctAnswers >= 13: return 4.5;
            case correctAnswers >= 10: return 4.0;
            case correctAnswers >= 6: return 3.5;
            case correctAnswers >= 3: return 3.0;
            case correctAnswers >= 1: return 2.5;
            default: return 0.0;
        }
    };

    const calculateScore = (): number => {
        if (!data || !data.section) return 0;

        let score = 0;

        for (const section of data.section) {
            for (const question of section.questions) {
                const userAnswer = userAnswers[question.id]?.trim().toLowerCase() ?? '';
                const correctAnswer = typeof question.answer === 'string'
                    ? question.answer.trim().toLowerCase()
                    : '';

                if (userAnswer === correctAnswer) {
                    score++;
                }
            }
        }

        return score;

    };

    const onSubmit = async () => {

        const correctAnswers = calculateScore();

        const bandScore = convertScoreToBand(correctAnswers);

        const payload = {
            testId: id,
            numberOfCorrectAnswers: correctAnswers,
            score: bandScore,
            completedAt: new Date(),
        };

        const apiBase =
            type === 'listening'
                ? 'http://localhost:8080/result-listening'
                : 'http://localhost:8080/result-reading';

        const resultPageUrl = `/pages/LibraryTestPage/ResultPage?id=${id}&type=${type}`;

        try {
            // Gửi POST (store)
            const response = await authFreshToken(`${apiBase}/store-result`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                console.log("Result submitted successfully");
                alert("Kết quả đã được nộp thành công!");
                router.push(resultPageUrl);
            } else if (response.status === 409) {
                // Nếu đã nộp -> gửi PATCH (update)
                console.log("Result already submitted. Updating instead...");

                const updateRes = await authFreshToken(`${apiBase}/update-result`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });

                if (updateRes.ok) {
                    alert("Cập nhật kết quả thành công!");
                    router.push(resultPageUrl);
                } else {
                    console.error("Error updating result:", await updateRes.text());
                    alert("Không thể cập nhật kết quả.");
                }
            } else {
                console.error("Lỗi submit:", await response.text());
                alert("Đã có lỗi xảy ra. Vui lòng thử lại.");
            }
        } catch (error: any) {
            console.error("Lỗi không xác định:", error);
            alert("Đã có lỗi xảy ra. Vui lòng thử lại.");
        }
    };


    return (

        <nav className="p-3 text-black font-bold text-lg bg-customWhile1 h-20">
            <NavigationMenu>

                <div className="flex items-center justify-between mx-auto h-full">

                    <div className="flex items-center space-x-4">

                        <div className="text-white font-bold text-lg">
                            <CiLogout className="text-3xl text-customeBlack cursor-pointer" />
                        </div>

                    </div>

                    <div className="flex items-center justify-between">

                        <NavigationMenuList className="flex space-x-4">

                            <div className="flex items-center justify-center gap-6 mr-2">
                                <Image
                                    src={`/assets/listeningTest/note-svgrepo-com (1).svg`}
                                    alt=""
                                    height={200}
                                    width={20}
                                    className="cursor-pointer"
                                />
                                <TfiAlignJustify className="text-2xl text-customeBlack cursor-pointer" />
                                <TfiFullscreen
                                    className="text-2xl text-customeBlack cursor-pointer"
                                    onClick={handleFullscreen}
                                />
                            </div>

                            <NavigationMenuItem className="flex items-center">
                                <Button
                                    onClick={openModal}
                                    className="bg-customWhile1 text-customBlue rounded-full w-32 h-12 text-lg border-solid border-2 border-Solid_while_color mr-3 px-3 py-2 hover:bg-customelightWhite"
                                >
                                    <div className="flex justify-center items-center gap-2 text-lg">
                                        <Image
                                            src={`/assets/listeningTest/review-screen-svgrepo-com.svg`}
                                            alt=""
                                            height={200}
                                            width={20}
                                        />
                                        Review
                                    </div>
                                </Button>

                                {/* Render Modal only if showMobalReview is true */}
                                {showMobalReview && (
                                    <Modal
                                        invisible={showMobalReview}
                                        closeModal={closeModal}
                                        userAnswers={userAnswers}
                                        sectionInfo={sectionInfo} // Pass the section info
                                    />
                                )}

                                <Button
                                    className="bg-customebrightBlue text-white rounded-full px-11 py-6 text-base hover:bg-customebrightBlue"
                                    onClick={openModalSubmit}
                                >
                                    Submit
                                </Button>

                                {/* Modal Submit */}
                                {showMobalSubmit && (
                                    <ModalSubmit
                                        invisible={showMobalSubmit}
                                        closeModal={closeModalSubmit}
                                        onSubmit={onSubmit}
                                    />
                                )}

                            </NavigationMenuItem>

                        </NavigationMenuList>
                    </div>
                </div>
            </NavigationMenu>
        </nav>
    );
}
