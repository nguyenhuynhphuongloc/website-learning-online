'use client';

import Image from 'next/image';

export default function PartnerSection() {
  const partners = [
    {
      name: "British Council",
      logo: "/assets/homepage/british-council.png", // Đường dẫn bắt đầu bằng / khi dùng với Image
    },
    {
      name: "IELTS",
      logo: "/assets/homepage/ielts-registration-center.png",
    },
    {
      name: "The University of Law",
      logo: "/assets/homepage/the-law-university-2.png",
    },
    {
      name: "University of Huddersfield",
      logo: "/assets/homepage/huddersfield-university.png",
    },
    {
      name: "Florida International University",
      logo: "/assets/homepage/florida-university.png",
    },
    {
      name: "University of Illinois Chicago",
      logo: "/assets/homepage/UIC-Chicago-universityy.png",
    },
  ];

  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Left Text Section */}
          <div className="col-span-1">
            <h2 className="text-3xl font-bold text-[#2C3E50] mb-4">Partner</h2>
            <p className="text-gray-600 leading-relaxed">
              IELTS Online IOT has reached extensive cooperation with overseas
              institutions, international education non-profit organizations, and
              IELTS test bureaus to provide a brand new IELTS learning platform for
              IELTS students around the world.
            </p>
          </div>

          {/* Partner Logos Section */}
          <div className="col-span-2 grid grid-cols-2 md:grid-cols-3 gap-6">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={128}
                  height={64}
                  className="object-contain mb-2"
                />
                <p className="text-gray-700 text-sm font-medium">
                  {partner.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
