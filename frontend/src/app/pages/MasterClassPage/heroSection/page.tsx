import Image from 'next/image';
import React from 'react';

export default function HeroSection()  {
  
  return (
    <section className="flex flex-col items-center relative bg-cover w-full h-screen"  style={{ background: " white url('/assets/master-class/hero-bg.svg') bottom -1px center no-repeat" }}>
      {/* Background mây - có thể dùng 1 div absolute chứa hình đám mây ở trên */}

      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        Boost your IELTS score with{" "}
        <br />
        <span className="text-blue-700 self-center">IELTS MasterClass</span>

      </h1>
      <div className="flex gap-4">
        <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded">
          Register Now
        </button>
        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded">
          Consultation
        </button>
      </div>
      {/* Hình minh hoạ */}
      <div className="mt-10 flex justify-center items-center">
      </div>
    </section>
  );
};