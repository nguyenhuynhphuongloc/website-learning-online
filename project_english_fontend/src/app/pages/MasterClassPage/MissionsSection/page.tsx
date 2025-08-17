"use client";
import { useState } from 'react';

export default function MissionsSection() {
  return (
    <div className="max-w-6xl mx-auto p-8 space-y-12">
      {/* Title Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Missions of IELTS MasterClass
        </h1>
        <h2 className="text-2xl font-semibold text-red-600">
          Study IELTS with IELTS MasterClass
        </h2>
      </div>

      {/* Course Sections */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Course Content */}
        <article className="group relative p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-red-100">
          <div className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-300 group-hover:border-[3px] group-hover:border-red-300 group-hover:m-[2px]"></div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Course content</h3>
          <ul className="space-y-3 text-gray-600">
            {[
              'Designed by former IELTS examiners',
              'Content and difficulty level close to the actual test',
              'Packed with tips and tricks to help you get better score',
              'Crafted with international design standards',
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <div className="w-1 h-1 mt-2 mr-3 bg-red-500 rounded-full"></div>
                {item}
              </li>
            ))}
          </ul>
        </article>

        {/* Teaching Method */}
        <article className="group relative p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-red-100">
          <div className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-300 group-hover:border-[3px] group-hover:border-red-300 group-hover:m-[2px]"></div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Teaching method</h3>
          <ul className="space-y-3 text-gray-600">
            {[
              'Customized teaching methods for each individual',
              'Highly interactive with visuals, sound, and group discussions',
              'Mini-games to boost knowledge uptake',
              'Maximize knowledge gained from each session',
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <div className="w-1 h-1 mt-2 mr-3 bg-red-500 rounded-full"></div>
                {item}
              </li>
            ))}
          </ul>
        </article>

        {/* IELTS Tutors */}
        <article className="group relative p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-red-100">
          <div className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-300 group-hover:border-[3px] group-hover:border-red-300 group-hover:m-[2px]"></div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">IELTS Tutors</h3>
          <ul className="space-y-3 text-gray-600">
            {[
              'IELTS Overall score of 8.0+',
              'Vietnamese and international teaching certifications',
              'Certified with IELTS, CELTA, DELTA',
              'Minimum 5 years teaching experience',
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <div className="w-1 h-1 mt-2 mr-3 bg-red-500 rounded-full"></div>
                {item}
              </li>
            ))}
          </ul>
        </article>

        {/* Operation & Technology */}
        <div className="space-y-8">
          <article className="group relative p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-red-100">
            <div className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-300 group-hover:border-[3px] group-hover:border-red-300 group-hover:m-[2px]"></div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Operation</h3>
            <ul className="space-y-3 text-gray-600">
              {[
                'Operated by InterGreat Education Group',
                '15 years of experience',
                'Trained millions of successful students',
                'International quality standards',
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-1 h-1 mt-2 mr-3 bg-red-500 rounded-full"></div>
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="group relative p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-red-100">
            <div className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-300 group-hover:border-[3px] group-hover:border-red-300 group-hover:m-[2px]"></div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Advanced technology</h3>
            <ul className="space-y-3 text-gray-600">
              {[
                'Custom-built LMS system',
                'AI-powered learning paths',
                'Spaced Repetition integration',
                'Science-backed memory techniques',
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-1 h-1 mt-2 mr-3 bg-red-500 rounded-full"></div>
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </div>
  );
}