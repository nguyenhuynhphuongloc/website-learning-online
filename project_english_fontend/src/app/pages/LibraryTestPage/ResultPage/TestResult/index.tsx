'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { useUserAnswers } from "@/context/useranswer.context";
import { removeDots } from "@/app/utils/removeDot";

interface Question {
    id: number;
    type: 'multiple-choice' | 'fill-in-the-blank' | 'true-false';
    question: string;
    answer: string;
    options?: string[];
}

interface AnswerKey {
    part: string;
    questions: Question[];
}

interface TestResultsProps {
    testId: string;
    userAnswers: Record<number, string>;
}

export default function TestResults({ testId, userAnswers }: TestResultsProps) {

  

    const [testResults, setTestResults] = useState<AnswerKey[]>([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestResults = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken");

                const res = await fetch(`http://localhost:8080/reading-test/${testId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${accessToken}`
                    }
                });

                if (!res.ok) throw new Error(`Error: ${res.status}`);

                const data = await res.json();

                console.log('user123',userAnswers)

            

                setTestResults(data.data);
            } catch (error) {
                console.error("Failed to fetch test results", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTestResults();
    }, [testId]);

    const checkAnswer = (questionId: number, userAnswer: string) => {
        const correctAnswer = testResults
            .flatMap((result) => result.questions)
            .find((q) => q.id === questionId)?.answer;

        return userAnswer.trim().toLowerCase() === correctAnswer?.trim().toLowerCase();
    };

    if (loading) return <div className="text-center">Loading...</div>;

    return (
        <div className="p-3 w-full ">
            <h1 className="text-2xl font-bold text-customBlue mb-4">Test Results</h1>

            {testResults.map((result, partIndex) => (

                <div key={`part-${partIndex}-${result.part}`} className="mb-10 mx-56">

                    <h2 className="text-xl font-semibold text-gray-800 mb-3">{result.part}</h2>

                    <div className="grid grid-cols-2 gap-5">

                        {result.questions.map((q, qIndex) => {


                            const userAnswer = userAnswers[q.id] || "";

                            const isCorrect = checkAnswer(qIndex, userAnswer);

                            return (
                                <div key={`q-${result.part}-${q.id}-${qIndex}`} className="inline-flex items-center p-2 bg-white shadow-sm whitespace-nowrap">
                                    <div className="w-8 h-8 p-4 flex items-center justify-center rounded-full bg-[#327846] text-white font-bold text-lg shadow-md mr-2">
                                        {q.id}
                                    </div>

                                     <div className="text-black p-2 ml-2">{q.answer}: </div>

                                    <label className="flex-1 flex justify-between items-center text-customBlue">
                                        <span className="text-customBlue">{userAnswer}</span>
                                        <span className="ml-2">
                                            {isCorrect ? (
                                                <Image src="/assets/ResultingPage/correct-signal-svgrepo-com.svg" alt="Correct" width={20} height={20} />
                                            ) : (
                                                <Image src="/assets/ResultingPage/close-sm-svgrepo-com.svg" alt="Wrong" width={30} height={20} />
                                            )}
                                        </span>
                                    </label>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
}
