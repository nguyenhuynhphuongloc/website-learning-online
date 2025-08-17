import { useState, useEffect } from "react";

interface Band {
    band: string;
    correctAnswersRange: string;
    skillLevel: string;
    description: string;
}

const bands: Band[] = [
    {
        band: "1",
        correctAnswersRange: "0-4",
        skillLevel: "Non-user",
        description:
            "You have no real communication skills except for the most basic.",
    },
    {
        band: "2",
        correctAnswersRange: "5-9",
        skillLevel: "Intermittent user",
        description:
            "You have great difficulty understanding spoken and written English.",
    },
    {
        band: " 3",
        correctAnswersRange: "10-15",
        skillLevel: "Extremely limited user",
        description:
            "You can understand and communicate only the most basic information in familiar situations.",
    },
    {
        band: " 4",
        correctAnswersRange: "16-22",
        skillLevel: "Limited user",
        description:
            "You can handle basic communication in your field, but with frequent breakdowns.",
    },
    {
        band: " 5",
        correctAnswersRange: "23-29",
        skillLevel: "Modest user",
        description:
            "You have a partial command of the language, coping with overall meaning in most situations, though with frequent mistakes.",
    },
    {
        band: " 6",
        correctAnswersRange: "30-32",
        skillLevel: "Competent user",
        description:
            "You have an operational command of the language, though with occasional inaccuracies, inappropriate usage and misunderstandings in some situations. Generally, you handle complex language well and understand detailed reasoning.",
    },
    {
        band: "7",
        correctAnswersRange: "30-32",
        skillLevel: "Competent user",
        description:
            "You have an operational command of the language, though with occasional inaccuracies, inappropriate usage and misunderstandings in some situations. Generally, you handle complex language well and understand detailed reasoning.",
    },
    {
        band: "8",
        correctAnswersRange: "30-32",
        skillLevel: "Competent user",
        description:
            "You have an operational command of the language, though with occasional inaccuracies, inappropriate usage and misunderstandings in some situations. Generally, you handle complex language well and understand detailed reasoning.",
    },
    {
        band: "9",
        correctAnswersRange: "30-32",
        skillLevel: "Competent user",
        description:
            "You have an operational command of the language, though with occasional inaccuracies, inappropriate usage and misunderstandings in some situations. Generally, you handle complex language well and understand detailed reasoning.",
    },
];

export default function BandScore() {
    const [selectedBand, setSelectedBand] = useState<Band | null>(null);
    const [score, setScore] = useState<number>(2); // Example: User's score

    // Automatically select the band based on the user's score
    const selectBandByScore = (score: number) => {
        const selected = bands.find((band) => {
            const [min, max] = band.correctAnswersRange.split("-").map(Number);
            return score >= min && score <= max;
        });
        setSelectedBand(selected || null);
    };

    // Update the selected band when the score changes
    useEffect(() => {
        selectBandByScore(score);
    }, [score]);

    return (
        <div className="flex items-center justify-center">
            <div className="mx-auto w-full max-w-[800px]">
                <h2 className="text-2xl text-customBlue mb-4">Band Score:</h2>

                <div className="flex space-x-4">
                    {bands.map((band) => {
                        const isUserBand = band === selectedBand;
                        return (
                            <div
                                key={band.band}
                                className={`cursor-pointer font-bold w-8 h-8 flex items-center justify-center rounded-full border ${isUserBand
                                        ? "bg-customebrightBlue text-black"
                                        : "border-green-600 hover:border-green-400 text-black"
                                    } ${!isUserBand && selectedBand?.band === band.band
                                        ? "border-b-4 border-green-600 text-black"
                                        : ""
                                    }`}
                                onClick={() => setSelectedBand(band)}
                            >
                                {band.band.trim()}
                            </div>
                        );
                    })}
                </div>

                {selectedBand && (
                    <div className="mt-4 p-4 rounded-md max-w-[800px] text-[#294563]">
                        <p>
                            <strong>Correct Answers:</strong> {selectedBand.correctAnswersRange}
                        </p>
                        <div className="border-b border-gray-300 my-2"></div>
                        <p>
                            <strong>Skill Level:</strong> {selectedBand.skillLevel}
                        </p>
                        <div className="border-b border-gray-300 my-2"></div>
                        <p>
                            <strong>Description:</strong> {selectedBand.description}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

