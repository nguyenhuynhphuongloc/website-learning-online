"use client";
import { useState } from 'react';

export default function IELTSStudyPlan() {
  const [activeMasterclass, setActiveMasterclass] = useState<number | string>(2);
  const masterclasses: (number | string)[] = [2, 3, 4, 5, 6, 7, 'Express'];

  return (
    <div className="min-h-screen bg-[url('/images/background.jpg')] bg-cover bg-center relative overflow-hidden">
      {/* Smoke Animation */}
      <div className="absolute inset-0 flex justify-center items-end">
        <svg
          viewBox="0 0 200 200"
          className="w-64 h-64 opacity-50 animate-pulse"
          style={{ filter: 'blur(8px)' }}
        >
          <path
            fill="#94a3b8"
            d="M40 120 Q 100 80 160 120 Q 100 160 40 120"
            className="animate-pulse"
          />
        </svg>
      </div>

      {/* Rocket SVG */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 transform">
        <svg
          className="w-24 h-24 cursor-pointer hover:translate-y-[-4px] transition-transform"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M12 2.5L4 7v4l8 4.5 8-4.5V7l-8-4.5M4 14v4l8 4.5 8-4.5v-4l-8 4.5-8-4.5z"
          />
        </svg>
      </div>

      <div className="relative h-screen flex">
        {/* Left Navigation */}
        <div className="w-1/3 bg-slate-900/80 backdrop-blur-sm p-8 flex flex-col space-y-4">
          {masterclasses.map((num) => (
            <button
              key={num.toString()}
              onClick={() => setActiveMasterclass(num)}
              className={`p-4 rounded-lg text-left transition-all ${
                activeMasterclass === num
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-slate-800/50 hover:bg-slate-700/50 text-slate-300'
              }`}
            >
              <h2 className="text-xl font-bold">
                {typeof num === 'number' ? 
                  `Masterclass ${num}` : 
                  'IELTS Express Speaking & Writing'}
              </h2>
            </button>
          ))}
        </div>

        {/* Right Content Area */}
        <div className="flex-1 bg-white/90 backdrop-blur-sm p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-slate-800">
              {typeof activeMasterclass === 'string' ?
                'IELTS Express Program' :
                `Masterclass ${activeMasterclass} Study Plan`}
            </h1>

            <div className="space-y-6 text-slate-700">
              <p className="text-lg">
                {typeof activeMasterclass === 'string' ?
                  'Intensive 7-day program covering all aspects of IELTS preparation with daily practice tests and personalized feedback.' :
                  `Comprehensive study materials for Masterclass ${activeMasterclass} including video lessons, practice exercises, and mock tests.`}
              </p>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-xl font-semibold mb-4">
                  {typeof activeMasterclass === 'string' ?
                    'Weekly Schedule' :
                    'Daily Study Plan'}
                </h3>
                {/* Scrollable Study Plan Container */}
                <div className="max-h-[60vh] overflow-y-auto pr-4">
                  <ul className="space-y-3">
                    {Array.from({ length: 30 }).map((_, index) => (
                      <li key={index} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                        <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <span className="block font-medium">
                            {typeof activeMasterclass === 'string' ?
                              `Day ${index + 1}: Intensive practice session` :
                              `Day ${index + 1}: Masterclass ${activeMasterclass} materials`}
                          </span>
                          <span className="text-sm text-gray-500">
                            {index % 3 === 0 && 'Speaking exercises'}
                            {index % 3 === 1 && 'Writing tasks'}
                            {index % 3 === 2 && 'Mock test review'}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}