"use client";

export type Payment = {
    course: string;
    entryLevel: string;
    outcome: string;
    courseLength: string;
    price: number;
};



export const columns = (
    handleCourseSelection: (course: Payment, isSelected: boolean) => void,
    selectedCourses: Payment[]
) => [
        {
            accessorKey: "course",
            header: "Course",
            cell: ({ row }: any) => {
                const isSelected = selectedCourses.some(
                    (course) => course.course === row.original.course
                );

                return (
                    <div className="flex">
                        <div className="flex gap-2 mt-2 mr-5">
                            <input
                                type="checkbox"
                                className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                                checked={isSelected}
                                onChange={(e) =>
                                    handleCourseSelection(row.original, e.target.checked)
                                }
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="font-semibold text-xl">{row.original.course}</span>
                            <div className="flex gap-2">
                                <span className="text-sm text-gray-400">
                                    <span className="text-gray-600 text-1xl font-bold">
                                        Entry Level
                                    </span>
                                    : {row.original.entryLevel}
                                </span>
                                <span className="text-sm text-gray-400">
                                    <span className="text-gray-600 text-1xl font-bold">
                                        Outcome:{" "}
                                    </span>
                                    {row.original.outcome}
                                </span>
                            </div>

                            <span className="text-lg text-gray-400">
                                Course Length: {row.original.courseLength}
                            </span>
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: "price",
            header: "Price",
            cell: ({ row }: any) => (
                <span className="font-bold text-lg text-customeBlack">
                    ${row.original.price} USD
                </span>
            ),
        },
    ];
