'use client'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { FooterTestWriting } from "@/app/pages/LibraryTestPage/Writing/WritingTestDetail/components/footestWriting";
import NavbarTestWriting from "@/app/pages/LibraryTestPage/Writing/WritingTestDetail/components/narbartestWriting";
import { authFreshToken } from "@/lib/auth.fetch";

interface Section {
    title: string;
    content: string;
    imagePath?: string;
}

interface WritingTest {
    _id: string;
    title: string;
    sections: Section[];
}

export default function WritingTestDetail() {

    const [testData, setTestData] = useState<WritingTest | null>(null);

    const [texts, setTexts] = useState<string[]>([]);

    const [wordCounts, setWordCounts] = useState<number[]>([]);

    const [wordCount, setWordCount] = useState(0);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState<string | null>(null);

    const searchParams = useSearchParams();

    const testid = searchParams.get('id');

    const [selectedSection, setSelectedSection] = useState(0);


    useEffect(() => {

        const fetchData = async () => {
            try {
                const res = await authFreshToken(`http://localhost:8080/writing-test/${testid}`);

                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

                const data = await res.json();
                setTestData(data);
            } catch (err: any) {
                console.error("Fetch error:", err);
                setError("Failed to load test.");
            } finally {
                setLoading(false);
            }
        };

        if (testid) fetchData();


    }, [testid]);

    const countWords = (str: string) => {

        const words = str.trim().split(/\s+/).filter(word => word.length > 0);

        return words.length;

    };

    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {

        const value = e.target.value;

        const updatedTexts = [...texts];

        const updatedCounts = [...wordCounts];

        updatedTexts[selectedSection] = value;

        updatedCounts[selectedSection] = countWords(value);

        setTexts(updatedTexts);

        setWordCounts(updatedCounts);

    };

    if (loading) return <div className="p-4">Loading...</div>;

    if (error) return <div className="p-4 text-red-600">{error}</div>;

    return (
        <div className="h-screen bg-darkWhite text-black">

            <NavbarTestWriting userAnswers={texts} testid={testid ?? undefined} />

            <ResizablePanelGroup

                direction="horizontal"

                className="min-h-[200px] max-w-full rounded-lg border md:min-w-[450px]"
            >
                <ResizablePanel defaultSize={50}>
                    <div className="flex flex-col h-full p-6 overflow-auto custom-scrollbar">

                        {Array.isArray(testData?.sections) && testData.sections[selectedSection] && (
                            <div className="mb-4">
                                <h3 className="font-bold text-3xl text-customBlue mb-10">{testData.sections[selectedSection].title}</h3>
                                {testData.sections[selectedSection].imagePath && (
                                    <div className="my-2 mb-10">
                                        <Image
                                            src={`http://localhost:8080/${testData.sections[selectedSection].imagePath}`}
                                            alt="image"
                                            width={600}
                                            height={200}
                                        />
                                    </div>
                                )}
                                <p className="text-lg ">{testData.sections[selectedSection].content}</p>
                            </div>
                        )}
                    </div>

                </ResizablePanel>

                <ResizableHandle withHandle />

                <ResizablePanel defaultSize={50}>

                    <div className="flex h-full p-6 overflow-auto w-full">

                        <div className="flex flex-col w-full space-y-4">

                            <textarea
                                className="w-full h-64 border-2 border-gray-300 bg-white rounded p-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#F9A95A]"
                                placeholder="Type here..."
                                value={texts[selectedSection] || ""}
                                onChange={handleTextChange}
                            />

                            <span className="text-black">Word Count: {wordCount}</span>

                        </div>

                    </div>

                </ResizablePanel>

                <FooterTestWriting

                    sectionInfo={[0, 1]}

                    onSectionChange={setSelectedSection}
                />
            </ResizablePanelGroup>
        </div>
    );
}
