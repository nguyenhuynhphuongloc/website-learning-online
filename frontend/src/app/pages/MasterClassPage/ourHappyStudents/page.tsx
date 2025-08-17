export default function OurHappyStudents() {
  return (
    <section className="py-16 px-4 md:px-16 bg-white">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Our Happy Students
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <img src="/assets/happy-student1.png" alt="Happy student 1" />
        <img src="/assets/happy-student2.png" alt="Happy student 2" />
        <img src="/assets/happy-student3.png" alt="Happy student 3" />
        <img src="/assets/happy-student4.png" alt="Happy student 4" />
      </div>
    </section>
  );
};