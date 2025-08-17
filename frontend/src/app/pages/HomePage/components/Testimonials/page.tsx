import React, { useState } from "react";

export default function TestimonialsSection() {
  const testimonials = [
    [
      {
        name: "Atul Jha",
        image: "assets/homepage/18 (1).jpg", // Replace with the actual path
        text: "This website is all you need to achieve your target band. I was amazed after seeing the same passages and listening tracks during my...",
      },
      {
        name: "Ravishankar-Subramani",
        image: "assets/homepage/8 (1).jpg", // Replace with the actual path
        text: "With great pleasure, I am happy to inform you that my IELTS result is declared on 1st October 2018. I got the following scores: L...",
      },
      {
        name: "David Wagaba",
        image: "assets/homepage/6 (1).jpg", // Replace with the actual path
        text: "Thank you so much for the IELTS online mock tests as they really helped me to achieve a Band 7.5 on my first attempt at the IELTS test. The...",
      },
    ],
    [
      {
        name: "Sarah Johnson",
        image: "assets/homepage/3 (1).jpg", // Replace with the actual path
        text: "The IELTS Online Tests helped me boost my confidence before the exam. Highly recommended for anyone preparing for IELTS!",
      },
      {
        name: "John Doe",
        image: "assets/homepage/default-user.jpg", // Replace with the actual path
        text: "I was able to understand my weaknesses and improve a lot through the detailed test analysis. Great resource!",
      },
      {
        name: "Emily Carter",
        image: "assets/homepage/default-user.jpg", // Replace with the actual path
        text: "The practice tests were just like the real IELTS test. I scored 8.0 on my first attempt thanks to these mock tests!",
      },
    ],
  ];

  const [activePage, setActivePage] = useState(0);

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto text-center">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#2C3E50] mb-8">
          What IELTS test takers say about us
        </h2>

        {/* Testimonials */}
        <div className="flex flex-col md:flex-row justify-center items-start gap-8 mb-8">
          {testimonials[activePage].map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center max-w-xs"
            >
              {/* Avatar */}
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-20 h-20 rounded-full mb-4"
              />
              {/* Name */}
              <h3 className="text-lg font-medium text-[#2C3E50]">
                {testimonial.name}
              </h3>
              {/* Testimonial Text */}
              <p className="text-sm text-gray-500 mt-4 italic">“{testimonial.text}”</p>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-2 mb-8">
          {testimonials.map((_, pageIndex) => (
            <span
              key={pageIndex}
              onClick={() => setActivePage(pageIndex)}
              className={`h-2 w-2 rounded-full cursor-pointer ${
                activePage === pageIndex ? "bg-blue-500" : "bg-gray-300"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}
