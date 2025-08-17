'use client'

export default function Footer() {
  return (
    <footer>
      {/* Dark Footer Section */}
      <div className="bg-customBlue text-white w-full">

        <div className="max-w-7xl mx-auto px-6 py-8 grid md:grid-cols-12 gap-4">

          <div className=" col-span-4 space-y-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#contact" className="hover:underline">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#privacy" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#sitemap" className="hover:underline">
                    Site Map
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:underline">
                    Frequently Asked Questions
                  </a>
                </li>
                <li>
                  <a href="#terms" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
                <li>
                  <a href="#testimonials" className="hover:underline">
                    Testimonials
                  </a>
                </li>
                <li>
                  <a href="#careers" className="hover:underline">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#affiliate" className="hover:underline">
                    Affiliate
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* RIGHT COLUMN: About Us + Mission + Follow Us + Disclaimers */}
          <div className="col-span-8 space-y-6">
            {/* About us */}
            <div className="space-y-2">
              <h3 className="text-lg font-bold">About us</h3>
              <p className="text-sm leading-relaxed">
                IELTS Online Tests (IOT) belongs to InterGreat Education Group,
                founded in 2008, with branch offices located in 12 countries
                around the world. InterGreat&apos;s head office is situated on
                Threadneedle Street in London, the iconic home of the Bank of
                England.
              </p>
            </div>

            {/* Our mission */}
            <div className="space-y-2">
              <h3 className="text-lg font-bold">Our mission</h3>
              <p className="text-sm leading-relaxed">
                IOT has currently been the most visited website in over 120
                countries with more than 28 million students. We are aiming
                toward a community website that provides IELTS test questions
                and exam tips for free. Students can easily take the IELTS tests
                on the website to improve their band scores effectively within a
                short time through our modern e-learning platform. Moreover, we
                have developed an ecosystem centred around transnational
                education, online learning, and study abroad to assist students
                in the pursuit of international education.
              </p>
            </div>

            {/* Follow Us */}
            <div>
              <h3 className="text-lg font-bold mb-2">Follow us:</h3>
              <div className="flex space-x-4">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="hover:opacity-80"
                >
                  <svg
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    className="w-5 h-5"
                  >
                    <path d="M22.525 0H1.477A1.476 1.476 0 000 1.476v21.049A1.476 1.476 0 001.476 24h11.349v-9.293H9.845v-3.62h2.98V8.41c0-2.952 1.803-4.562 4.435-4.562 1.26 0 2.342.094 2.658.136v3.08l-1.824.001c-1.432 0-1.71.681-1.71 1.679v2.201h3.418l-.446 3.62h-2.972V24h5.829A1.476 1.476 0 0024 22.524V1.476A1.476 1.476 0 0022.525 0z" />
                  </svg>
                </a>
                {/* YouTube */}
                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Youtube"
                  className="hover:opacity-80"
                >
                </a>
              </div>
            </div>

            {/* Disclaimers moved under Follow Us */}
            <div className="text-sm leading-relaxed space-y-4 pt-4">
              <p>
                © 2017-2025{" "}
                <span className="font-bold">InterGreat Education Group</span>
              </p>
              <p>
                IELTS is a registered trademark of University of Cambridge, the
                British Council, and IDP Education Australia. This site and its
                owners are not affiliated, approved or endorsed by the University
                of Cambridge ESOL, the British Council, and IDP Education
                Australia.
              </p>
              <p>
                &quot;IELTS Online&quot; is the name of the online version of the
                official IELTS test and is in no way affiliated with this
                website. To find out more about the official IELTS Online please
                visit{" "}
                <a
                  href="https://www.ielts.org/"
                  target="_blank"
                  rel="noreferrer"
                  className="underline hover:opacity-80"
                >
                  https://www.ielts.org/
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 