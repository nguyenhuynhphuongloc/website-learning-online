import React from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';

export default function WhyChooseSection() {
  return (
    <section className=" bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl text-cyan-300 font-bold mb-4">Why study IELTS with
            <Image
              alt="IOT Global Logo"
              src="/assets/master-class/cm-logo.svg"
              width={32}
              height={32}
              className="inline-block h-auto w-auto"
            />
          </h2>
        </div>

        {/* grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 */}

        {/* Grid of benefits */}
        <div className="flex flex-wrap">
          {/* Item 1 */}
          <section className="flex-1 max-w-[410px] relative mt-8">
            <div className="bg-blue-50 rounded-lg px-6 pt-7 pb-10 ml-6 mb-6">
              <div className="bg-white text-6xl font-bold text-blue-600 w-20 -mt-14 left-16 absolute flex items-center justify-center">
                1
              </div>

              {/* Icon and heading in the same div */}
              <div className="flex items-center gap-4">
                {/* Computer/Video Icon */}
                <div className="relative -left-6 -top-1 rounded-xl bg-white">
                  <div className=" w-24 h-24 rounded-full flex items-center justify-center">
                    <Image
                      alt="IOT Global Logo"
                      src="/assets/master-class/why-choose-icon-1.svg"
                      width={65}
                      height={65}
                      className="inline-block "
                    />
                  </div>
                </div>

                {/* Heading */}
                <h3 className="text-cyan-700 text-3xl font-bold">
                  Maximum 14 students per class
                </h3>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed">
                Small class sizes can create a better learning environment, encouraging interaction
                and individual student development, helping them to focus effectively and fully
                realize their potential.
              </p>
            </div>
          </section>

          {/* Item 2 */}
          <section className="flex-1 max-w-[410px] relative mt-8">
            <div className="bg-orange-50 rounded-lg px-6 pt-7 pb-10 ml-6 mb-6">
              <div className="bg-white text-6xl font-bold text-orange-600 w-20 -mt-14 left-16 absolute flex items-center justify-center">
                2
              </div>

              {/* Icon and heading in the same div */}
              <div className="flex items-center gap-4">
                {/* Computer/Video Icon */}
                <div className="relative -left-6 -top-1 rounded-xl bg-white">
                  <div className=" w-24 h-24 rounded-full flex items-center justify-center">
                    <Image
                      alt="IOT Global Logo"
                      src="/assets/master-class/why-choose-icon-2.svg"
                      width={65}
                      height={65}
                      className="inline-block"
                    />
                  </div>
                </div>

                {/* Heading */}
                <h3 className="text-cyan-700 text-3xl font-bold">
                  Highly qualified teachers
                </h3>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed">
                Our experienced teachers with effective teaching methods will help students develop all four key IELTS skills – Listening, Speaking, Reading, and Writing. Students will also regularly receive insights and strategies for the IELTS exam from their teachers.
              </p>
            </div>
          </section>


          {/* Item 3 */}
          <section className="flex-1 max-w-[400px] h-auto relative mt-8">
            <div className="bg-green-50 rounded-lg px-6 pt-7 pb-10 ml-6 mb-6 h-full w-full">
              <div className="bg-white text-6xl font-bold text-green-600 w-20 -mt-14 left-16 absolute flex items-center justify-center">
                3
              </div>

              {/* Icon and heading in the same div */}
              <div className="flex items-center gap-4">
                {/* Computer/Video Icon */}
                <div className="relative -left-6 -top-1 rounded-xl bg-white">
                  <div className=" w-24 h-24 rounded-full flex items-center justify-center">
                    <Image
                      alt="IOT Global Logo"
                      src="/assets/master-class/why-choose-icon-3.svg"
                      width={65}
                      height={65}
                      className="inline-block ml-2"
                    />
                  </div>
                </div>

                {/* Heading */}
                <h3 className="text-cyan-700 text-3xl font-bold">
                  Unique course materials
                </h3>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed">
                Our course curriculum is designed to equip students with the knowledge, strategies, and secrets to tackle the IELTS test in a balanced and effective manner.
              </p>
            </div>
          </section>


          {/* Item 4 - Learning Approach */}
          <section className="lg:col-span-3 relative bg-pink-50 rounded-lg md:pl-6 md:pr-8 lg:pl-6 lg:pr-18 mt-10 ml-6 mb-36">
            <div className='flex items-center justify-center h-20'>
              {/* “4” Badge in the top-left corner */}
              <div className="absolute -top-8 md:left-6 w-16 h-16 bg-white rounded-lg items-center justify-center flex">
                {/* <div className='bg-corner-shadow-right w-3 h-3'></div> */}
                <div className="text-3xl font-bold text-navy-800">4</div>
                {/* <div className='bg-corner-shadow-left  w-3 h-3'></div> */}
              </div>

              {/* Heading */}
              <div className="absolute -top-3 md:-left-8 bg-white rounded-lg mb-4 md:ml-28 lg:ml-36">
                <h5 className=" z-10 text-center md:text-left md:text-3xl font-bold text-navy-800 m-2">
                  Comprehensive learning approach
                </h5>
              </div>
            </div>

            {/* Introductory Paragraphs */}
            <div className="z-10 text-gray-700 flex h-30">
              <p className="mb-3 w-2/3 h-2/3 text-base p-2">
                Our IELTS MasterClass course is designed comprehensively by combining two important methods:
                the <strong>“Learning Pyramid”</strong> model and the <strong>“Spaced Repetition”</strong> technique.
                <br />
                <br />
                The <strong>“Spaced Repetition”</strong> method is a crucial tool for reinforcing knowledge. Instead of
                learning once and forgetting, this method involves repeatedly reviewing information over
                increasing intervals, helping to store the knowledge long-term and improve the ability to
                apply it in real-life situations.
              </p>
              {/* Space Repetition chart */}
              <div className="bg-white rounded-3xl p-2 w-[349px] h-[313px] absolute -top-8 right-8">
                <Image
                  src="/assets/master-class/why-choose-ex-2.png"
                  alt="Spaced Repetition Graph"
                  width={349}
                  height={313}
                  className="h-full w-full"
                />
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="relative z-10 flex flex-cols gap-4 mt-10">
              {/* Left Column: Learning Pyramid & image */}
              <div className="space-y-6">
                <div className="p-4 flex items-center justify-center relative -top-16 w-[413px] h-[458px] ">
                  <Image
                    src="/assets/master-class/why-choose-img-2.png"
                    alt="Learning Pyramid"
                    width={413}
                    height={458}
                    className="w-full h-full"
                  />
                </div>

                {/* “Learning Pyramid” info at the bottom (yellow box) */}
                <div className='bg-white p-4 rounded-lg -bottom-20 absolute w-2/3'>
                <div className="bg-yellow-50 p-4 rounded-lg ">
                  <h5 className="text-xl font-bold text-navy-800 mb-2">Learning Pyramid</h5>
                  <p className="text-gray-700 italic">
                    The “Learning Pyramid” involves building new knowledge on top of what has already been
                    learned. Rather than solely focusing on new information, it connects with what you
                    already know for deeper understanding and further development.
                  </p>
                </div>
                </div>

              </div>

              {/* Right Column: Space Repetition + “Triple…” section */}
              <div className="flex flex-col space-y-6">
                {/* “Triple the effectiveness…” block */}
                <div className="bg-white rounded-lg shadow p-4">
                  <h3 className="text-2xl font-bold mb-3">
                    <span className="bg-yellow-400 text-white px-3 py-1 rounded">Triple</span>
                    <span className="ml-2">the effectiveness compared to a standard course</span>
                  </h3>
                  <p className="text-gray-700 mb-3">
                    With the “Learning Pyramid” model, learning is not just about passive listening but
                    involves an active participation process. It incorporates active learning methods such
                    as group discussions, hands-on practice, and teaching others, thereby maximizing the
                    ability to absorb and retain knowledge in the brain.
                  </p>
                  <p className="text-gray-700">
                    By integrating these two methods, we have created a dynamic and interactive learning
                    environment that ensures you not only achieve high scores in your IELTS exam but also
                    develop the ability to use English confidently and proficiently in your daily life.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Item 5 - Knowledge Distribution */}
          <section className="lg:col-span-3 bg-blue-50 rounded-lg p-6">
            <div className="flex items-center mb-6">
              <span className="text-2xl font-bold text-blue-600 mr-4">5</span>
              <h5 className="text-xl font-semibold">Distribute the amount of knowledge scientifically</h5>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-600 mb-4">Our course is designed with a well-balanced distribution of knowledge to ensure that students have an engaging, exciting learning experience and maximize their learning effectiveness.</p>
                <p className="text-gray-600">We often use educational games and interactive learning activities to end lessons with energy and enthusiasm.</p>
              </div>
              <div className="flex justify-center items-center">
                <Image
                  alt="Online Learning"
                  src="/assets/master-class/why-choose-img-3.png"
                  width={1000}
                  height={1000}
                  className="max-w-full h-auto"
                />
              </div>
            </div>
          </section>

          {/* Item 6 - LMS */}
          <section className="lg:col-span-3 bg-gray-50 rounded-lg p-6">
            <div className="flex items-center mb-6">
              <span className="text-2xl font-bold text-gray-600 mr-4">6</span>
              <h5 className="text-xl font-semibold">Online Learning Management System (LMS)</h5>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((num) => (
                  <Image
                    key={num}
                    alt={`System Screenshot`}
                    src={'/assets/master-class/system--learning-${num}.png'}
                    width={0}
                    height={0}
                    className="w-full h-auto rounded-lg shadow-md"
                  />
                ))}
              </div>
              <div>
                <p className="text-gray-600 mb-4">We are excited to show you our very own online learning system, made by InterGreat. It&apos;s packed with the latest artificial intelligence (AI) technology and we put a ton of time, effort, and money into making it.</p>
                <p className="text-gray-600">This LMS product stands as our strong commitment to providing a high-quality learning environment.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};
