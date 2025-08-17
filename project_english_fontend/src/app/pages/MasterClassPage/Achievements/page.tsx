export default function AchievementsSection() {
  return (
    <section className="py-16 px-4 md:px-16 bg-white">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Our Achievements
      </h2>
      <p className="text-center mb-6">
        We are grateful for the awards we have received.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <div className="bg-gray-100 p-4 rounded shadow">
          <p>Best LMS</p>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
          <p>IELTS Excellence Award</p>
        </div>
        <div className="bg-gray-100 p-4 rounded shadow">
          <p>Top Education Platform</p>
        </div>
      </div>
    </section>
  );
};