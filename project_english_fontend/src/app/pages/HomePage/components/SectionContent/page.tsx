import Image from 'next/image';
export default function NumberOneForIELTSPreparation() {
  const stats = [
    {
      icon: "/assets/homepage/pins-icon_0_0.png", 
      value: "120+",
      description: "Countries",
    },
    {
      icon: "/assets/homepage/target-icon_0_0.png", 
      value: "28,000,000+",
      description: "Test Takers",
    },
    {
      icon: "/assets/homepage/qa-icon_0_0.png", 
      value: "7,000,000+",
      description: "Completed Tests",
    },
    {
      icon: "/assets/homepage/graduate-icon_0_0.png", 
      value: "100+",
      description: "Academic Tests",
    },
    {
      icon: "/assets/homepage/people-group-icon_0_0.png", 
      value: "20+",
      description: "General Training Tests",
    },
    {
      icon: "/assets/homepage/online-question 1_0_0.png", 
      value: "10,000+",
      description: "Total Questions",
    },
  ];

  return (
    <div className="bg-white py-12">
      <div className="max-w-6xl mx-auto text-center px-4">
        {/* Title */}
        <h2 className="text-3xl font-bold text-[#2C3E50] mb-12">
          Number #1 for IELTS Preparation
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-8 gap-x-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex items-center justify-start md:justify-center space-x-4"
            >
              {/* Icon */}
              <div className="w-12 h-12">
                <Image
                  src={stat.icon}
                  alt={stat.description}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              {/* Text Content */}
              <div className="text-left">
                <h3 className="text-xl font-bold text-[#2C3E50]">
                  {stat.value}
                </h3>
                <p className="text-gray-600 text-sm">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
