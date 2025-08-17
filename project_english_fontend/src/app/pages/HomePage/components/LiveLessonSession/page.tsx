import React from "react";
import Image from "next/image";
import {
  CalendarIcon,
  ClockIcon,
  UsersIcon,
  ChatBubbleBottomCenterTextIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/solid';

export default function LiveLessonsSection() {
  const lessons = [
    {
      type: "Writing",
      title: "Academic Writing Task 1 - Comparing Two Charts",
      instructor: "Soheila A.",
      image: "/assets/homepage/1 Aug.jpg",
      avatar: "/assets/homepage/soheila.jpg",
      attendees: "1,050+ Attending",
      date: "13/01/2025",
      time: "20:00 - 21:00 (GMT +7)",
      language: "English",
      price: "Free",
      buttonColor: "bg-[#F8B84E]",
      borderColor: "border-orange-500",
      textColor: "text-[#F8B84E]",
      organization: "InterGreat Education Group",
      orgLogo: "/assets/homepage/icon.png",
      shadowColor: "hover:shadow-glow-orange",
    },
    {
      type: "Speaking",
      title: "Buổi học thử IELTS miễn phí tháng 1/2025 - Trình độ 5.0",
      instructor: "Thầy Hoàng Anh",
      image: "/assets/homepage/blogimage11.jpg",
      avatar: "/assets/homepage/thao1.png",
      attendees: "50+ Attending",
      date: "14/01/2025",
      time: "20:00 - 21:00 (GMT +7)",
      language: "Vietnamese",
      price: "Free",
      buttonColor: "bg-[#DB6278]",
      borderColor: "border-red-500",
      organization: "InterGreat Education Group",
      orgLogo: "/assets/homepage/icon.png",
      shadowColor: "hover:shadow-glow-red",
    },
    {
      type: "Reading",
      title: "Reading - Matching Headings",
      instructor: "Soheila A.",
      image: "/assets/homepage/ws1.jpg",
      avatar: "/assets/homepage/soheila.jpg",
      attendees: "1,150+ Attending",
      date: "16/01/2025",
      time: "20:00 - 21:00 (GMT +7)",
      language: "English",
      price: "Free",
      buttonColor: "bg-[#4AA564]",
      borderColor: "border-green-500",
      organization: "InterGreat Education Group",
      orgLogo: "/assets/homepage/icon.png",
      shadowColor: "hover:shadow-glow-green",
    },
  ];

  return (
    <div className="bg-[#F0F4F8] py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {lessons.map((lesson, index) => (
            <div
              key={index}
              className={`border ${lesson.borderColor} rounded-lg shadow-md bg-white transition duration-300 ${lesson.shadowColor}`}
            >
              <div className={`${lesson.buttonColor} text-white text-xs uppercase font-semibold px-3 py-1 rounded-t-lg`}>
                {lesson.type}
              </div>

              {/* Lesson image */}
              <div className="relative">
                <a href="#">
                  <div className="w-full h-36 relative">
                    <Image
                      src={lesson.image}
                      alt={lesson.title}
                      fill
                      className="object-cover rounded-t"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                </a>

                {/* Avatar */}
                <a href="#" className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                  <div className="w-14 h-14 relative rounded-full border-4 overflow-hidden object-cover shadow-md">
                    <Image
                      src={lesson.avatar}
                      alt={lesson.instructor}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </div>
                </a>
              </div>

              {/* Title and Info */}
              <div className="pt-8 px-4 pb-4 text-center">
                <a href="#" className="block mb-1">
                  <h3 className="text-base font-bold text-[#2C3E50] leading-snug">{lesson.title}</h3>
                </a>
                <p className="text-gray-500 text-xs">{lesson.instructor}</p>

                <div className="flex items-center justify-center mt-2 text-gray-600 text-xs">
                  <Image
                    src={lesson.orgLogo}
                    alt={lesson.organization}
                    width={20}
                    height={20}
                    className="mr-1 object-contain"
                  />
                  <span>{lesson.organization}</span>
                </div>
              </div>

              <hr className="border-gray-200" />

              {/* Lesson Info */}
              <div className="px-4 py-3">
                <ul className="space-y-1 text-xs text-[#2C3E50]">
                  <li className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-orange-500" />
                    <span>{lesson.date}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ClockIcon className="w-4 h-4 text-orange-500" />
                    <span>{lesson.time}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <UsersIcon className="w-4 h-4 text-orange-500" />
                    <span>{lesson.attendees}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ChatBubbleBottomCenterTextIcon className="w-4 h-4 text-orange-500" />
                    <span>{lesson.language}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CurrencyDollarIcon className="w-4 h-4 text-orange-500" />
                    <span>{lesson.price}</span>
                  </li>
                </ul>
              </div>

              {/* Join Button */}
              <div className="px-4 pb-4">
                <a
                  href="#"
                  className={`block ${lesson.buttonColor} text-white text-sm text-center font-semibold py-2 rounded-lg hover:opacity-90 transition`}
                >
                  Join
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Explore More */}
        <div className="mt-8 text-center">
          <a
            href="#"
            className="inline-block bg-blue-600 text-white text-sm font-semibold py-2 px-6 rounded-full hover:bg-blue-700 transition"
          >
            Explore More
          </a>
        </div>
      </div>
    </div>
  );
}
