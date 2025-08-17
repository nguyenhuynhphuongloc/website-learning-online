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
import { FaCheckCircle, FaSpinner } from "react-icons/fa"; // Thêm icon từ react-icons

export default function LibraryListeningTest() {
    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState("");
    const [attempts, setAttempts] = useState<Record<string, number>>({});
    const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
    const [listeningTests, setListeningTests] = useState<{ _id: string; title: string, isCompleted: boolean }[]>([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(6);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true); // Thêm trạng thái loading

    const handleClick = (testId: string) => {
        router.push(`/pages/LibraryTestPage/Listening/ListeningTestDetail?id=${testId}&type=listening`);
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

    const fetchListeningTests = useCallback(async () => {
        setIsLoading(true); // Start loading
        try {
            const res = await authFreshToken(
                `http://localhost:8080/listening-test/getAll-listening-test?page=${page}&limit=${limit}`,
                {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!res.ok) {
                throw new Error(`Failed to fetch: ${res.status}`);
            }

            const data = await res.json();

            console.log("Listening tests data:", data);

            const tests = data?.data || [];

            console.log(tests)

            setListeningTests(tests);

            if (data.totalPages) {
                setTotalPages(data.totalPages);
            }
        } catch (err) {
            console.error("Error fetching listening tests:", err);
        } finally {
            setIsLoading(false); // End loading
        }
    }, [page, limit]);


    useEffect(() => {
        fetchListeningTests();
    }, [fetchListeningTests]);

    const filteredTests = listeningTests.filter((test) =>
        test?.title?.toLowerCase().includes(searchQuery.toLowerCase()) || false
    );

    return (
        <div className="min-h-screen relative bg-customWhite">
            <Navbar />

            <div className="h-auto px-4 py-4 sm:px-6 lg:px-8">
                <div className="flex mx-auto max-w-4xl flex-wrap gap-6">
                    <div className="flex-[2] w-full">
                        <h2 className="text-5xl font-bold text-customBlue mb-6 text-center sm:text-left">
                            IELTS Listening Tests
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
                                {isLoading ? (
                                    <div className="flex justify-center items-center h-64">
                                        <FaSpinner className="animate-spin text-customBlue" size={40} />
                                    </div>
                                ) : filteredTests.length > 0 ? (
                                    filteredTests.map((test) => {
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
                                                    <h3 className="text-lg text-customBlue font-semibold">
                                                        {test.title}
                                                    </h3>
                                                    <div className="relative" style={{ width: "80px", height: "80px" }}>
                                                        <svg
                                                            className="w-full h-full"
                                                            viewBox="0 0 36 36"
                                                            style={{ transform: "rotate(-90deg)" }}
                                                        >

                                                        </svg>

                                                        <div className="absolute inset-0 flex flex-col items-center justify-center text-sm font-semibold text-black">
                                                            {test.isCompleted && (
                                                                <FaCheckCircle className="inline-block ml-2 text-green-500" size={35} />
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                {isExpanded && (
                                                    <div className="mt-2">
                                                        <p className="text-sm text-customBlue">
                                                            Progress: {percentage}%
                                                        </p>
                                                        <p className="text-sm text-customBlue">
                                                            Attempts: {attemptsCount}
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="text-center py-10 text-customBlue">
                                        No tests found.
                                    </div>
                                )}
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
                                                    ? "bg-customBlue text-white"
                                                    : "bg-white text-black hover:bg-customBlue hover:text-white"
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