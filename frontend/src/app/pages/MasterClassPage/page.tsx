import React from "react";
import { HeaderHomePage } from "@/app/pages/HomePage/components/Banner/page";
import Footer from "@/app/Shared/Footer/page";
import HeroSection from "./heroSection/page";
import WhyStudyIELTS from "./whyStudyIELTS/page";
import IELTSStudyPlan from "./IELTSStudyPlan/page";
import OverviewSection from "./OverviewSection/page";
import MissionsSection from "./MissionsSection/page";
import TeachersSection from "./ourTeacher/page";
import StudentsTestimonials from "./studentsTestimonials/page";
import OurHappyStudents from "./ourHappyStudents/page";
import AboutInterGreat from "./aboutInterGreat/page";
import AchievementsSection from "./Achievements/page";
import ValuedPartners from "./valuedPartners/page";
import PricingSection from "./pricingSection/page";
import StudyEverywhere from "./studyEverywhere/page";
import Navbar from "@/app/pages/HomePage/components/NavBar/page";

// ====== TẠO CÁC COMPONENT ======
export default function MasterClass() {

  // ====== APP CHÍNH ======
  return (
    <div className="">
      <Navbar />
      <div
        style={{ fontFamily: "Nunito, sans-serif" }}
        className="flex flex-col items-center justify-center text-black min-h-screen"
      >
        <HeroSection />
        <WhyStudyIELTS />
      </div>
      <Footer />
    </div>
  );

};