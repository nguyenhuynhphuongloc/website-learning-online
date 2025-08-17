export default function AboutInterGreat() {
  return (
    <section className="bg-blue-50 py-16 px-4 md:px-16">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-6">
        About InterGreat
      </h2>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-5xl mx-auto">
        <div className="flex-1">
          <img
            src="/assets/about-intergreat.png"
            alt="About InterGreat"
            className="w-full h-auto rounded shadow"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <p className="mb-4">
            InterGreat is a leading education platform offering IELTS
            preparation, study abroad consultancy, and more. Our dedicated
            team provides personalized support to help students achieve
            academic and career success.
          </p>
          <div className="flex gap-4 justify-center md:justify-start mt-4">
            <img
              src="/assets/uk-flag.png"
              alt="UK"
              className="w-12 h-12 object-cover rounded"
            />
            <img
              src="/assets/vietnam-flag.png"
              alt="VN"
              className="w-12 h-12 object-cover rounded"
            />
          </div>
        </div>
      </div>
    </section>
  );
};