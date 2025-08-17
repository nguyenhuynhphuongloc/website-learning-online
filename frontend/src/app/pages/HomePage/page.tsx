'use client'
import { HeaderHomePage } from "@/app/pages/HomePage/components/Banner/page";
import Footer from "@/app/Shared/Footer/page";
import Navbar from "@/app/pages/HomePage/components/NavBar/page";
import IELTSFeatures from "@/app/pages/HomePage/components/Feature/page";
import NumberOneForIELTSPreparation from "@/app/pages/HomePage/components/SectionContent/page";
import WhyUseIELTSOnlineTests from "@/app/pages/HomePage/components/WhyUseIELTS/page";
import { CarouselDApiDemo } from "@/app/pages/HomePage/components/Carousel/carousel";
import LiveLessonsSection from "@/app/pages/HomePage/components/LiveLessonSession/page";
import TestimonialsSection from "@/app/pages/HomePage/components/Testimonials/page";


export default function Homepage() {


    return (
        <div className="">
            <Navbar />
            <CarouselDApiDemo />
            <LiveLessonsSection />
            <WhyUseIELTSOnlineTests />
            <NumberOneForIELTSPreparation />
            <TestimonialsSection />
            <IELTSFeatures />
            <Footer />
        </div>
    )
}
