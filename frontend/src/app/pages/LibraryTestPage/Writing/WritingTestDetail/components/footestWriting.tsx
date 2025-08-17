import { useState } from "react";



interface FooterWritingTestProps {
    sectionInfo: number[];
    onSectionChange: (index: number) => void;
}

export function FooterTestWriting({ sectionInfo, onSectionChange }: FooterWritingTestProps) {

        return (
            <div className="fixed bottom-0 left-0 w-full bg-gray-100 shadow-md flex justify-between items-center px-3 py-4 box-border gap-3 cursor-pointer">
                {sectionInfo.map((section) => {
                    return (
                        <div
                            key={section}
                            className="flex-1 px-3 py-3 rounded-lg border border-[#F9A95A]"
                            onClick={() => onSectionChange(section)}
                        >
                            <div className="text-customBlue flex justify-center items-center whitespace-nowrap gap-1">
                                <span className="text-lg font-semibold">task {section + 1}</span>
                            </div>
                        </div>
                    );
                   
                })}
            </div>
        )
}
