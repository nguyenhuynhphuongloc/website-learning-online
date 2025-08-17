// components/ChatBox.tsx

'use client';

import React, { useState } from 'react';

const ChatBox = () => {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState<string[]>([]);

    const sendMessage = () => {
        if (message.trim() !== '') {
            setChat((prevChat) => [...prevChat, `You: ${message}`]);
            setMessage('');
        }
    };

    return (
        <div className="fixed bottom-2 right-5 w-[400px] h-[500px] bg-white border-2 border-gray-500 rounded-lg shadow-lg z-50 flex flex-col">
            {/* Header */}
            <div className="bg-blue-500 text-white font-semibold text-lg p-3 rounded-t-lg">
                Chatbox
            </div>

            {/* Khung chat */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
                {chat.map((msg, index) => (
                    <div key={index} className="p-2 text-black text-sm">
                        {msg}
                    </div>
                ))}
            </div>

            {/* Ô nhập */}
            <div className="flex items-center p-3 border-1">
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Nhập tin nhắn..."
                    className="flex-1 p-2 border-2 border-customBlue rounded-md bg-white text-black 
               hover:border-blue-500  transition duration-300"
                />
                <button
                    onClick={sendMessage}
                    className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Gửi
                </button>
            </div>
        </div>
    );
};

export default ChatBox;
