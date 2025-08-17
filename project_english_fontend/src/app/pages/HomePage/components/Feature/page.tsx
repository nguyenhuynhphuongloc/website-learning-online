import React, { useState } from "react";

export default function IELTSFeatures() {
  const features = [
    {
      title: "IELTS Locate and Explain",
      description:
        'Our unique feature allows users to "Locate" the answer within the passage and "Explain" why that answer is correct. Our community loves this feature!',
      image: "assets/homepage/Image_1.jpg", 
    },
    {
      title: "Mock IELTS Band Scores",
      description:
        "Get accurate band scores for your IELTS practice tests with detailed analytics.",
      image: "assets/homepage/Anh2.jpg", 
    },
    {
      title: "IELTS Side by Side",
      description:
        "Compare your answers with correct ones side by side to learn more effectively.",
      image: "assets/homepage/Image3.jpeg", 
    },
    {
      title: "IELTS Question Palette",
      description:
        "Quickly navigate through questions with our easy-to-use question palette.",
      image: "assets/homepage/image4.png", 
    },
    {
      title: "IOT Analytics",
      description:
        "A brand new feature allowing IELTS test takers to track their IELTS learning and achievement progress. View all data like average IELTS band scores and time spent. It even shows what type of questions you need to improve on and for which elements you need to study more.",
      image: "assets/homepage/Anh5.jpg", 
    },
  ];

  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-[#2C3E50] mb-8">
          Our IELTS tests features
        </h2>

        {/* Tabs */}
        <div className="flex overflow-x-auto">
          {features.map((feature, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`py-5 px-8 flex-1 ${
                activeTab === index
                  ? "bg-orange-300 text-customBlue"
                  : "bg-customBlue text-white"
              }`}
            >
              {feature.title}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-gray-100 p-6 flex items-center  space-x-6">
        
          {/* Description */}
          <div className="w-1/2">
            <h3 className="text-2xl font-bold text-[#2C3E50] mb-4">
              {features[activeTab].title}
            </h3>
            <p className="text-gray-600">{features[activeTab].description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
