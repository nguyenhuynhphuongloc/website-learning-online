'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { FooterTest } from "@/app/pages/LibraryTestPage/components/FooterTest/page";
import NavbarTest from "@/app/pages/LibraryTestPage/components/NavbarTest/page";
import ExportQuestionTypes from "@/app/pages/LibraryTestPage/Reading/ReadingTestDetail/questions/questions";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup
} from "@/components/ui/resizable";
import { useUserAnswers } from '@/context/useranswer.context';
import { authFreshToken } from '@/lib/auth.fetch';

export interface Question {
    id: number;
    type: 'multiple-choice' | 'fill-in-the-blank' | 'true-false';
    question: string;
    answer: string;
    options?: string[];
}

export interface Section {
    content: string;
    title: string;
    questions: Question[];
}

export interface Test {
    _id: string;
    title: string;
    section: Section[];
}

function renderContentWithLineBreaks(content: string) {

    return content.split('\n\n').map((paragraph, index) => (
        <p key={index} className="mb-4 whitespace-pre-line">
            {paragraph}
        </p>
    ));

}

export default function ReadingTestDetail() {

    const searchParams = useSearchParams();

    const type = searchParams.get('type');

    const id = searchParams.get('id');

    const [data, setData] = useState<Test | null>(null);

    const [loading, setLoading] = useState<boolean>(true);

    const [error, setError] = useState<string | null>(null);

    const [activeSectionIndex, setActiveSectionIndex] = useState<number>(0);

    const { userAnswers, setUserAnswers } = useUserAnswers();

    const handleAnswerChange = (questionId: number, answer: string) => {

        setUserAnswers((prev: any) => ({
            ...prev,
            [questionId]: answer,
        }));

    };

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                const res = await authFreshToken(`http://localhost:8080/reading-test/full/${id}`);

                if (!res.ok) {
                    throw new Error("Failed to fetch reading test data");
                }

                const json = await res.json();
                const test = json.data ?? json;

                const formattedData: Test = {
                    _id: test._id,
                    title: test.title,
                    section: (test.section || []).map((sec: any) => ({
                        content: sec.content ?? '',
                        title: sec.title ?? '',
                        questions: (sec.questions || []).map((q: any, index: number) => ({
                            id: q.id ?? index,
                            type: q.type,
                            question: q.question,
                            answer: q.answer,
                            options: q.options ?? []
                        }))
                    }))
                };

                setData(formattedData);
            } catch (err) {
                console.error('Failed to fetch test data:', err);
                setError('Failed to load test data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    return (
        <div className="flex flex-col h-screen bg-darkWhite">

            <NavbarTest
                id={id ?? ''}
                userAnswers={userAnswers}
                sectionInfo={data?.section.map(sec => ({
                    sectionTitle: sec.title,
                    questionCount: sec.questions.length
                })) ?? []}
                data={data}
                type={type || ''}
            />

            <div className="flex-grow overflow-hidden flex flex-col">

                <ResizablePanelGroup direction="horizontal" className="min-h-[200px] max-w-full rounded-lg border md:min-w-[450px] h-full pb-24">

                    <ResizablePanel defaultSize={50} className="overflow-auto max-h-full">

                        <div className="p-4 text-black h-full overflow-y-auto custom-scrollbar">

                            {loading && <p>Loading...</p>}

                            {error && <p className="text-red-500">{error}</p>}

                            {!loading && !error && data && data.section[activeSectionIndex] && (
                                <div>

                                    <h2 className="font-semibold text-xl mb-2">{data.title}</h2>

                                    <ul className="pl-4 scroll-my-12 list-none">

                                        {renderContentWithLineBreaks(data.section[activeSectionIndex].content)}

                                    </ul>

                                </div>
                            )}

                        </div>

                    </ResizablePanel>

                    <ResizableHandle withHandle className='' />

                    <ResizablePanel defaultSize={50} className="h-full">

                        <div className="p-4 overflow-y-auto h-full custom-scrollbar">

                            {data && data.section[activeSectionIndex] && (

                                <ExportQuestionTypes

                                    testData={[{ ...data, section: [data.section[activeSectionIndex]] }]}

                                    userAnswers={userAnswers}

                                    onAnswerChange={handleAnswerChange}

                                />
                            )}

                        </div>

                    </ResizablePanel>

                </ResizablePanelGroup>

            </div>

            {/* Footer Test, ensuring it stays at the bottom */}
            <div className="mt-auto">

                {data && (

                    <FooterTest

                        setActiveSectionIndex={setActiveSectionIndex}

                        sectionInfo={data.section.map((sec, index) => ({

                            sectionIndex: index,

                            questionCount: sec.questions.length

                        }))}
                    />
                )}

            </div>

        </div>
    );
}
