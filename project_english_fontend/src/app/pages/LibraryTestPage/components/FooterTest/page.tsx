import { FooterTestProps } from "@/app/interfaces/FooterTestProps.interface";
import { useState } from "react";


export function FooterTest({ setActiveSectionIndex, sectionInfo }: FooterTestProps) {

    const [activePart, setActivePart] = useState<string>("Part1");


    const togglePart = (part: string, index: number) => {
        setActivePart(part);
        setActiveSectionIndex(index);
    };

    const getActiveSectionIndex = () => {
        return parseInt(activePart.replace("Part", "")) - 1;
    };

    const renderChildButtons = (sectionIndex: number) => {

        if (sectionIndex === getActiveSectionIndex()) {
            const start = sectionIndex * 10 + 1;

            return (
                <div className="hover:border-customBlue p-2 rounded cursor-pointer">
                    {Array.from({ length: 10 }, (_, index) => (
                        <span
                            key={index}
                            className={`text-customBlue rounded-full m-1 border-solid border-2 hover:border-customebrightBlue border-customBlue cursor-pointer 
                                ${index + start < 10 ? "px-3 py-2" : "px-2 py-2"}`}
                        >
                            {start + index}
                        </span>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="left-0 w-full bg-gray-100 shadow-md flex justify-between items-center px-3 py-4 box-border gap-3 cursor-pointer">
            {sectionInfo.map((section) => {
                const partLabel = `Part${section.sectionIndex + 1}`;
                const isActive = activePart === partLabel;

                return (
                    <div
                        key={section.sectionIndex}
                        className="flex-1 px-3 py-3 rounded-lg border border-customebrightBlue"
                        onClick={() => togglePart(partLabel, section.sectionIndex)}
                    >
                        <div className="text-customBlue flex justify-center items-center whitespace-nowrap gap-1">
                            <span className="text-lg font-semibold">{partLabel}:</span>
                            {!isActive && (
                                <span className="text-base">
                                    0 of {section.questionCount}
                                </span>
                            )}
                            {renderChildButtons(section.sectionIndex)}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
