'use client';

import Footer from "@/app/Shared/Footer/page";
import Navbar from "@/app/pages/HomePage/components/NavBar/page";
import { Input } from "@/components/ui/input";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { authFreshToken } from "@/lib/auth.fetch";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function LibraryReadingTest() {

    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState("");

    const [attempts] = useState<Record<string, number>>({});

    const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

    const [readingTests, setReadingTests] = useState<{ _id: string; title: string, isCompleted: boolean }[]>([]);

    const [isLoading, setIsLoading] = useState(true); // Thêm trạng thái loading

    const [page, setPage] = useState(2);

    const [limit] = useState(6);

    const [totalPages, setTotalPages] = useState(1);

    const handleClick = (testId: string) => {

        router.push(`/pages/LibraryTestPage/Reading/ReadingTestDetail?id=${testId}&type=reading`);

    };

    const userProgress: Record<string, number> = {
        "Test 1": 7.5,
        "Test 2": 6.0,
        "Test 3": 9.0,
        "Test 4": 5.0,
    };

    const toggleCard = (test: string) => {
        setExpandedCards((prev) => ({ ...prev, [test]: !prev[test] }));
    };

    const fetchReadingTests = useCallback(async () => {
        setIsLoading(true);

        try {
            const res = await authFreshToken(
                `http://localhost:8080/reading-test/getAll-reading-test?page=${page}&limit=${limit}`,
                {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json"
                        // No Authorization here, handled by authFreshToken
                    }
                }
            );

            if (!res.ok) {
                console.error(`Failed to fetch reading tests: ${res.status}`);
                return;
            }

            const data = await res.json();
            console.log("Reading tests data:", data);

            const tests = data?.data || [];
            setReadingTests(tests);

            if (data.totalPages) {
                setTotalPages(data.totalPages);
            }

        } catch (err) {
            console.error("Error fetching reading tests:", err);
        } finally {
            setIsLoading(false);
        }
    }, [page, limit]);



    useEffect(() => {
        fetchReadingTests();
    }, [fetchReadingTests]);

    const filteredTests = readingTests.filter((test) =>
        test.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen relative bg-customWhite">

            <Navbar />

            <div className="h-auto px-4 py-4 sm:px-6 lg:px-8">

                <div className="flex mx-auto max-w-4xl flex-wrap gap-6">

                    <div className="flex-[2] w-full">

                        <h2 className="text-5xl font-bold text-customBlue mb-6 text-center sm:text-left">
                            IELTS Reading Tests
                        </h2>

                        <div className="w-full max-w-2xl mx-auto mb-8">
                            <Input
                                type="text"
                                placeholder="Search tests..."
                                className="rounded-full w-full px-4 py-2 border text-sm sm:text-base lg:text-lg text-black"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="overflow-hidden transition-all duration-500 ease-in-out h-auto bg-white rounded-3xl">
                            <div
                                className="grid gap-4 px-5 py-5"
                                style={{
                                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                                }}
                            >
                                {filteredTests.map((test) => {

                                    const score = userProgress[test.title] || 0;

                                    const percentage = ((score / 9) * 100).toFixed(1);

                                    const attemptsCount = attempts[test.title] || 0;

                                    const isExpanded = expandedCards[test.title] || false;

                                    return (
                                        <div
                                            key={test._id}
                                            className="border-2 rounded-2xl border-[#D6E4DA] shadow-md p-4 bg-white hover:shadow-lg transition-shadow duration-200 flex flex-col justify-between cursor-pointer"
                                            onClick={() => handleClick(test._id)}
                                            style={{ height: isExpanded ? "auto" : "130px" }}
                                        >
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-lg text-customBlue font-semibold">{test.title}</h3>
                                                <div className="relative" style={{ width: "80px", height: "80px" }}>
                                                    <svg className="w-full h-full" viewBox="0 0 36 36">

                                                    </svg>
                                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-sm font-semibold text-black">
                                                        {test.isCompleted && (
                                                            <FaCheckCircle className="inline-block ml-2 text-green-500" size={35} />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <p className="text-sm text-customBlue">Attempts: {attemptsCount}</p>
                                        </div>
                                    );
                                })}

                            </div>
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <Pagination className="mt-6">
                                <PaginationContent className="gap-4">
                                    <PaginationItem>
                                        <PaginationPrevious
                                            className="bg-white hover:bg-customBlue text-black border border-gray-300"
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (page > 1) setPage((prev) => prev - 1);
                                            }}
                                        />
                                    </PaginationItem>

                                    {Array.from({ length: totalPages }).map((_, i) => (
                                        <PaginationItem key={i}>
                                            <PaginationLink
                                                href="#"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setPage(i + 1);
                                                }}
                                                className={`border border-gray-300 ${page === i + 1
                                                    ? 'bg-customBlue text-white'  // Trang đang chọn
                                                    : 'bg-white text-black hover:bg-customBlue hover:text-white'
                                                    }`}
                                            >
                                                {i + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}

                                    <PaginationItem>
                                        <PaginationNext
                                            className="bg-white hover:bg-customBlue text-black border border-gray-300"
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (page < totalPages) setPage((prev) => prev + 1);
                                            }}
                                        />
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
