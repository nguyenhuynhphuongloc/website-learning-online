export default function WhyUseIELTSOnlineTests() {
  const features = [
    {
      icon: "/assets/homepage/why-folders_0_0.png", 
      title: "Take recent actual IELTS Tests",
      description:
        "Real IELTS Listening and IELTS Reading tests based on actual IELTS tests and following the Cambridge IELTS book format.",
    },
    {
      icon: "/assets/homepage/why-online-meeting_0_0.png", 
      title: "Community-driven",
      description:
        "Created by our community of IELTS teachers, previous IELTS examiners, and IELTS exam takers.",
    },
    {
      icon: "/assets/homepage/why-online-meeting-2_0_0.png",
      title: "Comprehensive analytics tool",
      description:
        "Our IELTS Analytics is a tool that allows you to set a target IELTS band score, analyze your progress, and find how to improve.",
    },
    {
      icon: "/assets/homepage/why-bullets_0_0.png", 
      title: "View IELTS Score and Answer Explanations",
      description:
        "After taking our IELTS mock tests with real audio, you can check your Listening or Reading band score and view your answer sheets.",
    },
    {
      icon: "/assets/homepage/why-online-booking_0_0.png", 
      title: "FREE to use",
      description:
        "Our online IELTS tests are always free. We are here to help users for study abroad, immigration, and finding jobs.",
    },
    {
      icon: "/assets/homepage/why-chat-icon_0_0.png", 
      title: "Increase your IELTS band score",
      description:
        "Using our online tests for IELTS preparation is proven to help students improve by 0.5 - 1.5.",
    },
  ];

  return (
    <div className="bg-customBlue py-16 text-white">
      <div className="container mx-auto px-4 text-center t">
        {/* Title */}
        <h2 className="text-5xl font-bold text-red mb-12">
          Why use IELTS Online Tests?
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Icon */}
              <div className="w-16 h-16 mb-4">
               
              </div>
              {/* Title */}
              <h3 className="text-lg font-semibold text-customRed mb-2">
                {feature.title}
              </h3>
              {/* Description */}
              <p className="text-darkWhite text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
