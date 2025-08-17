export default function OverviewSection() {
  return (
    <section className="py-16 px-4 md:px-16 bg-white">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
        Overview of IELTS MasterClass
      </h2>
      <div className="max-w-4xl mx-auto">
        {/* Video mp4 tĩnh */}
        <video
          width="100%"
          controls
          className="mx-auto rounded shadow-lg"
          poster="/assets/video-poster.png" // poster tạm
        >
          <source src="/assets/overview-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};
