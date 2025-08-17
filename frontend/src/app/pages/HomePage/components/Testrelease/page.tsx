// File: TestReleases.tsx

export default function TestReleases() {
  const tests = [
    {
      title: "IELTS Mock Test 2023 December",
      image: "/assets/homepage/IELTS Mock Test 2023-12.jpg", // Replace with the actual path
      rating: 3.4,
      votes: 1886,
    },
    {
      title: "IELTS Mock Test 2023 September",
      image: "/assets/homepage/IELTS Mock Test 2023-09.jpg", // Replace with the actual path
      rating: 3.3,
      votes: 809,
    },
    {
      title: "IELTS Practice Test Volume 8",
      image: "/assets/homepage/PTp1 copy 5.jpg", // Replace with the actual path
      rating: 3.6,
      votes: 1431,
    },
    {
      title: "Prepare for IELTS General Training Volume 2",
      image: "/assets/homepage/IELTS General Training Cover-02.png", // Replace with the actual path
      rating: 3.3,
      votes: 937,
    },
  ];

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-8">
          Latest IELTS test releases:
        </h2>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {tests.map((test, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg overflow-hidden text-center"
            >
              {/* Image */}
              <img
                src={test.image}
                alt={test.title}
                className="w-full h-60 object-cover"
              />

              {/* Title */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {test.title}
                </h3>

                {/* Rating */}
                <div className="flex justify-center items-center text-sm text-gray-600 mb-2">
                  <span className="text-orange-500 font-bold">
                    {test.rating.toFixed(1)}
                  </span>
                  <div className="ml-2 flex items-center">
                    {[...Array(5)].map((_, starIndex) => (
                      <span
                        key={starIndex}
                        className={`${
                          starIndex < Math.floor(test.rating)
                            ? "text-orange-500"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="ml-2">({test.votes} votes)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
