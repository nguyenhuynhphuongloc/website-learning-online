import { useState } from 'react';

type QuestionType = 'multiple-choice' | 'fill-in-the-blank' | 'true-false';

interface Question {
    id: number;
    type: QuestionType;
    question: string;
    answer: string;
    options?: string[];
}

export interface Section {
    title: string;
    questions: Question[];
}

interface Test {
    _id: string;
    title: string;
    section: Section[];
}
export default function ExportQuestionTypes({
    testData,
    userAnswers,
    onAnswerChange,
}: {
    testData: Test[];
    userAnswers: Record<number, string>;
    onAnswerChange: (questionId: number, answer: string) => void;
}) {
    return (
        
        <div className="p-4 text-black">
            {testData.map((test) => (
                <div key={test._id}>
                    {test.section.map((section, sectionIndex) => (
                        <div key={`${test._id}-section-${sectionIndex}`} className="mb-8">
                            <h2 className="text-xl font-bold mb-4">{section.title}</h2>
                            <ul className="pl-4 space-y-4">
                                {section.questions.map((q) => (
                                    <li key={q.id} className="border p-4 rounded-md shadow">
                                        <p className="mb-2 font-medium text-lg text-gray-800">
                                            <span className="font-bold mr-2 text-customBlue">{q.id}.</span> {q.question}
                                        </p>
                                        {/* Multiple choice */}
                                        {q.type === 'multiple-choice' && q.options && (
                                            <div className="space-y-2">
                                                {q.options.map((opt, i) => {
                                                    const optionLetter = opt.trim().charAt(0).toUpperCase(); // Lấy chữ đầu tiên
                                                    return (
                                                        <label key={`${q.id}-option-${i}`} className="flex items-center space-x-2">
                                                            <input
                                                                type="radio"
                                                                name={`mcq-${q.id}`}
                                                                value={opt}
                                                                checked={userAnswers[q.id] === optionLetter}
                                                                onChange={() => onAnswerChange(q.id, optionLetter)}
                                                                className="peer hidden"
                                                            />
                                                            <span className="w-5 h-5 border-2 border-gray-600 rounded-full inline-block peer-checked:bg-cyan-400 peer-checked:border-transparent"></span>
                                                            <span>
                                                                <strong></strong> {opt}
                                                            </span>
                                                        </label>
                                                    );
                                                })}
                                            </div>
                                        )}
                                        {/* Fill in the blank */}
                                        {q.type === 'fill-in-the-blank' && (
                                            <input
                                                type="text"
                                                maxLength={10}
                                                className="border border-gray-300 p-2 w-full rounded bg-white focus:border-blue-600 focus:ring focus:ring-blue-200"
                                                placeholder="Your answer..."
                                                value={userAnswers[q.id] || ''}
                                                onChange={(e) => onAnswerChange(q.id, e.target.value)}
                                            />
                                        )}
                                        {/* True/False */}
                                        {q.type === 'true-false' && (
                                            <div className="space-x-4">
                                                {['True', 'False', 'Not given'].map((val) => (
                                                    <label key={`${q.id}-${val}`} className="items-center space-x-2">
                                                        <input
                                                            type="radio"
                                                            name={`tf-${q.id}`}
                                                            value={val}
                                                            checked={userAnswers[q.id] === val}
                                                            onChange={() => onAnswerChange(q.id, val)}
                                                            className="peer hidden"
                                                        />
                                                        <span className="w-5 h-5 border-2 border-gray-600 rounded-full inline-block peer-checked:bg-cyan-400 peer-checked:border-transparent"></span>
                                                        <span>{val}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

