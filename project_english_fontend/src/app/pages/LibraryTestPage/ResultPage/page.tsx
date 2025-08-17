'use client';

import Footer from "@/app/Shared/Footer/page";
import Navbar from "@/app/pages/HomePage/components/NavBar/page";
import BandScore from "@/app/pages/LibraryTestPage/ResultPage/BandScore/page";
import CircularProgress from "@/app/pages/LibraryTestPage/ResultPage/CircleProgress/page";
import ModuleTest from "@/app/pages/LibraryTestPage/ResultPage/ModuleTest/page";
import TestResults from "@/app/pages/LibraryTestPage/ResultPage/TestResult";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useUserAnswers } from "@/context/useranswer.context";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { authFreshToken } from "@/lib/auth.fetch";

interface ScoreData {
    timeSpent: number;
    score: number;

}

export default function ResultPage() {

    const searchParams = useSearchParams();

    const testid = searchParams.get('id');

    const testType = searchParams.get('type'); // 'reading' hoặc 'listening'

    const { userAnswers } = useUserAnswers();

    const [isClient, setIsClient] = useState(false);

    const [scoreData, setScoreData] = useState<ScoreData | null>(null);


    const fetchScoreData = useCallback(async () => {

        if (!testid || !testType) return;

        try {

            let endpoint = '';

            if (testType === 'reading') {
                endpoint = `http://localhost:8080/result-reading/${testid}`;
            } else if (testType === 'listening') {
                endpoint = `http://localhost:8080/result-listening/${testid}`;
            } else {
                throw new Error("Invalid test type");
            }

            const res = await authFreshToken(endpoint, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                throw new Error(`Failed to fetch score: ${res.status}`);
            }

            const text = await res.text();

            if (!text) {
                throw new Error("Empty response body");
            }

            const data = JSON.parse(text);

            setScoreData({
                timeSpent: data.timeSpent,
                score: data.score,
            });

        } catch (error) {
            console.error("Error fetching score data:", error);
        }
    }, [testid, testType]);

    useEffect(() => {
        setIsClient(true);
        fetchScoreData();
    }, [fetchScoreData]);

    if (!isClient || !scoreData) {
        return null;
    }

    const { score } = scoreData;

    return (
        <div className="bg-white">
            <Navbar />

            <Avatar className="mx-auto mt-12">
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className="h-25 w-25" />
            </Avatar>

            <div className="h-[200px] gap-16 mb-12">
                <h2 className="text-customBlue text-center text-4xl font-bold mt-5 mb-5">Your score is:</h2>
                <div className="flex justify-center items-center gap-16">
                    <CircularProgress
                        value={score}
                        size={150}
                        strokeWidth={10}
                        progressColor="#D6E4DA"
                        solidColor="#ddd"
                        innerContent={<div className="text-4xl font-bold text-center text-[#37854D]">{score}</div>}
                    />
                </div>
            </div>

            <BandScore />
            {testid && <TestResults testId={testid} userAnswers={userAnswers} />}
            <ModuleTest />

            <Footer />
        </div>
    );
}
