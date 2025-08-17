import Footer from "@/app/Shared/Footer/page";
import LiveLessonCard from "@/app/pages/LiveLessionPage/LiveLessionCard";
import Navbar from "@/app/pages/HomePage/components/NavBar/page";


export default function LiveLessonPage() {
   return (
      <div className="">
         <Navbar />
         <div className="mx-auto">
            <h2 className="mt-10 mx-72 font-semibold my-11 text-customBlue text-4xl">Listening Live Lessons</h2>
            <LiveLessonCard />
            <LiveLessonCard />
            <LiveLessonCard />
         </div>
         <Footer />
      </div>
   );
}