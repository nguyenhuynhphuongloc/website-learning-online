interface Teacher {
  id: number;
  name: string;
  img: string;
  title: string;
  description: string;
}
const ourTeachers: Teacher[] = [
  {
    id: 1,
    name: "John Doe",
    img: "/assets/teacher1.png",
    title: "IELTS Expert",
    description: "10+ years experience in IELTS teaching",
  },
  {
    id: 2,
    name: "Jane Smith",
    img: "/assets/teacher2.png",
    title: "Senior Instructor",
    description: "7+ years training students for high band scores",
  },
  {
    id: 3,
    name: "Alex Nguyen",
    img: "/assets/teacher3.png",
    title: "IELTS Speaking Coach",
    description: "Native teacher with modern teaching methods",
  },
];

export default function TeachersSection() {
  return (
    <section className="py-16 px-4 md:px-16 bg-white">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Our Teachers
      </h2>
      <div className="flex flex-col md:flex-row gap-8 justify-center">
        {ourTeachers.map((teacher) => (
          <div
            key={teacher.id}
            className="max-w-sm bg-gray-50 rounded shadow-md p-4 flex flex-col items-center"
          >
            <img
              src={teacher.img}
              alt={teacher.name}
              className="w-32 h-32 object-cover rounded-full mb-4"
            />
            <h3 className="font-semibold text-lg mb-2">{teacher.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{teacher.title}</p>
            <p className="text-center text-gray-700">{teacher.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};