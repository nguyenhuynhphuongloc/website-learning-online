'use client';

import { useState } from 'react';

export default function UploadForm() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [message, setMessage] = useState('');
    const [selectedTestType, setSelectedTestType] = useState<'reading' | 'listening' | 'speaking' | 'writing' | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile || !selectedTestType) {
            setMessage('Please select a test type and file first.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const res = await fetch(`http://localhost:8080/${selectedTestType}-test/create-${selectedTestType}-test`, {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                setMessage('Upload successful!');
                setSelectedFile(null);
            } else {
                setMessage('Upload failed.');
            }
        } catch (error) {
            console.error(error);
            setMessage('An error occurred.');
        }
    };

    return (
        <div className="mx-auto flex items-center justify-center w-[600px]">
            <div className="bg-white p-24 rounded shadow-md w-full border">
                <h1 className="text-2xl font-bold mb-6 text-customBlue text-center">Select Test Type</h1>

                <div className="grid grid-cols-2 gap-4 mb-6">
                    {['reading', 'listening', 'speaking', 'writing'].map((type) => {
                        const typeColors: Record<string, string> = {
                            reading: 'bg-green-600 hover:bg-green-700',
                            listening: 'bg-red-600 hover:bg-red-700',
                            speaking: 'bg-purple-600 hover:bg-purple-700',
                            writing: 'bg-yellow-600 hover:bg-yellow-700',
                        };

                        const inactiveClasses = 'bg-gray-200 text-gray-700 hover:bg-gray-300';

                        return (
                            <button
                                key={type}
                                onClick={() => {
                                    setSelectedTestType(type as any);
                                    setSelectedFile(null);
                                    setMessage('');
                                }}
                                className={`px-4 py-2 rounded text-black transition-all ${selectedTestType === type ? typeColors[type] : inactiveClasses
                                    }`}
                            >
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </button>
                        );
                    })}
                </div>

                (
                <>
                    <h2 className="text-lg font-semibold text-center mb-4 capitalize">
                        Upload JSON for {selectedTestType} test
                    </h2>

                    <input
                        type="file"
                        accept=".json"
                        onChange={handleFileChange}
                        className="mb-4 block w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:border-blue-400"
                    />

                    <button
                        onClick={handleUpload}
                        className="bg-customBlue text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
                    >
                        Upload
                    </button>

                    {message && <p className="mt-4 text-sm text-center text-gray-700">{message}</p>}
                </>
                )
            </div>
        </div>
    );
}
