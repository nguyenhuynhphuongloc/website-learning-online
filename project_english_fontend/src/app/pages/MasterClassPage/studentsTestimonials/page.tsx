// 7. Students Testimonials
//   Mình giả sử có 3 testimonial, mỗi cái có 1 video youtube embed, 
//   hoặc 1 link mp4. Tùy bạn điều chỉnh
export default function StudentsTestimonials() {
  return (
    <section className="bg-blue-50 py-16 px-4 md:px-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
        Students testimonials
      </h2>
      <div className="flex flex-col md:flex-row gap-6 justify-center">
        <div className="bg-white shadow p-4 rounded w-full md:w-1/3">
          <div className="aspect-w-16 aspect-h-9 mb-2">
            {/* Placeholder video */}
            <video controls poster="/assets/student-thumb1.png">
              <source src="/assets/student-test1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <p className="font-semibold">Nguyễn Văn A</p>
          <p className="text-sm text-gray-600">
            “I improved my IELTS score from 6.0 to 7.5 in just 2 months!”
          </p>
        </div>
        <div className="bg-white shadow p-4 rounded w-full md:w-1/3">
          <div className="aspect-w-16 aspect-h-9 mb-2">
            <video controls poster="/assets/student-thumb2.png">
              <source src="/assets/student-test2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <p className="font-semibold">Trần Thị B</p>
          <p className="text-sm text-gray-600">
            “The practice materials and teachers here are the best!”
          </p>
        </div>
        <div className="bg-white shadow p-4 rounded w-full md:w-1/3">
          <div className="aspect-w-16 aspect-h-9 mb-2">
            <video controls poster="/assets/student-thumb3.png">
              <source src="/assets/student-test3.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <p className="font-semibold">Lê Văn C</p>
          <p className="text-sm text-gray-600">
            “Scored band 8.0 overall thanks to IELTS MasterClass!”
          </p>
        </div>
      </div>
    </section>
  );
};