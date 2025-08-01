import { useEffect } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import SplitType from "split-type"; // Alternative to SplitText
import bgImage from "../assets/background-image3.avif";

import bgImage4 from "../assets/background-image6.avif"; // adjust the

import card1 from "../assets/card1.png";
import card2 from "../assets/card2.png";
import card3 from "../assets/card3.png";
import card4 from "../assets/card4.png";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(Observer);
}

const Programs = () => {
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const images = document.querySelectorAll(".bg-img");
    const outerWrappers = document.querySelectorAll(".outer");
    const innerWrappers = document.querySelectorAll(".inner");
    const headings = document.querySelectorAll(".section-heading");

    const splitHeadings = Array.from(headings).map(
      (heading) => new SplitType(heading, { types: "lines, words, chars" })
    );

    let currentIndex = -1;
    let animating = false;
    const wrap = gsap.utils.wrap(0, sections.length);

    gsap.set(outerWrappers, { yPercent: 100 });
    gsap.set(innerWrappers, { yPercent: -100 });

    function gotoSection(index, direction) {
      index = wrap(index);
      animating = true;
      const fromTop = direction === -1;
      const dFactor = fromTop ? -1 : 1;

      const tl = gsap.timeline({
        defaults: { duration: 1.25, ease: "power1.inOut" },
        onComplete: () => (animating = false),
      });

      if (currentIndex >= 0) {
        gsap.set(sections[currentIndex], { zIndex: 0 });
        tl.to(images[currentIndex], { yPercent: -15 * dFactor }).set(
          sections[currentIndex],
          { autoAlpha: 0 }
        );
      }

      gsap.set(sections[index], { autoAlpha: 1, zIndex: 1 });
      tl.fromTo(
        [outerWrappers[index], innerWrappers[index]],
        {
          yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor),
        },
        { yPercent: 0 },
        0
      )
        .fromTo(images[index], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
        .fromTo(
          splitHeadings[index].chars,
          { autoAlpha: 0, yPercent: 150 * dFactor },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 1,
            ease: "power2",
            stagger: {
              each: 0.02,
              from: "random",
            },
          },
          0.2
        );

      currentIndex = index;
    }

    Observer.create({
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onDown: () => !animating && gotoSection(currentIndex - 1, -1),
      onUp: () => !animating && gotoSection(currentIndex + 1, 1),
      tolerance: 10,
      preventDefault: true,
    });

    gotoSection(0, 1);
  }, []);

  return (
    <div className="relative h-screen text-white font-['Cormorant Garamond'] uppercase">
      {/* Section 1 */}
      <section className="fixed top-0 left-0 w-full h-full opacity-0 fourth">
        <div className="outer w-full h-full overflow-hidden">
          <div className="inner w-full h-full overflow-hidden">
            <div
              className="bg-img absolute top-0 w-full h-full bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bgImage4})`,
              }}
            >
              {/* --------------------------- */}
              <div className=" py-16 px-4">
                <div>
                  <h2 className="section-heading text-3xl pt-20 font-bold text-center text-[#367e66] mb-3">
                    Our Programs
                  </h2>
                  <h2 className="text-lg font-bold text-center text-white mb-3">
                    Comprehensive programs designed to empower youth, support
                    farmers, and create sustainable rural-urban partnerships.
                  </h2>
                </div>
                <h3 className="text-2xl font-semibold text-orange-400 mb-3">
                  Program Demonstrations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {/* Card 1  ---------- */}
                  {/* Card 1 */}
                  <div className="rounded-lg shadow-md overflow-hidden  text-white max-w-sm">
                    {/* Image with Play Button Overlay */}
                    <div className="relative">
                      <img
                        src={card1}
                        alt="Hanna"
                        className="w-full h-48 object-cover"
                      />
                      <button
                        className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition"
                        aria-label="Play Video"
                      >
                        <div className=" text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                          ▶
                        </div>
                      </button>
                    </div>

                    {/* Text Content */}
                    <div className="p-4">
                      <h4 className="font-bold text-amber-100 text-lg mb-1">
                        Field Placement Program
                      </h4>
                      <p className="text-sm text-amber-50">
                        See how our flagship program works from start to finish
                        • 5:20
                      </p>
                    </div>
                  </div>

                  {/* Repeat for Card 2 and Card 3 */}
                  {/* Card 2 */}
                  <div className="rounded-lg shadow-md overflow-hidden  text-white max-w-sm">
                    {/* Image with Play Button Overlay */}
                    <div className="relative">
                      <img
                        src={card2}
                        alt="Hanna"
                        className="w-full h-48 object-cover"
                      />
                      <button
                        className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition"
                        aria-label="Play Video"
                      >
                        <div className=" text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                          ▶
                        </div>
                      </button>
                    </div>

                    {/* Text Content */}
                    <div className="p-4">
                      <h4 className="font-bold text-amber-100 text-lg mb-1">
                        Training & Certification
                      </h4>
                      <p className="text-sm text-amber-50">
                        Comprehensive training that prepares youth for success •
                        4:15
                      </p>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="rounded-lg shadow-md overflow-hidden  text-white max-w-sm">
                    {/* Image with Play Button Overlay */}
                    <div className="relative">
                      <img
                        src={card3}
                        alt="Hanna"
                        className="w-full h-48 object-cover"
                      />
                      <button
                        className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/50 transition"
                        aria-label="Play Video"
                      >
                        <div className=" text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                          ▶
                        </div>
                      </button>
                    </div>

                    {/* Text Content */}
                    <div className="p-4">
                      <h4 className="font-bold text-amber-100 text-lg mb-1">
                        Market Linkage Program
                      </h4>
                      <p className="text-sm text-amber-50">
                        Connecting farmers directly to urban markets • 3:50
                      </p>
                    </div>
                  </div>

                  <div></div>

                  <button className="px-6 py-3 m-5 bg-emerald-900 text-white text-lg font-semibold rounded-2xl shadow-md hover:bg-white  hover:text-black transition">
                    View more Videos
                  </button>
                </div>
              </div>
              {/* --------------------------- */}
            </div>
          </div>
        </div>
      </section>
      {/*---------------------------------------------------*/}
      {/* Section 4 */}
      <section className="fixed top-0 left-0 w-full h-full opacity-0 fourth">
        <div className="outer w-full h-full overflow-hidden">
          <div className="inner w-full h-full overflow-hidden">
            <div
              className="bg-img absolute top-0 w-full h-full bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bgImage})`,
              }}
            >
              {/* --------------------------- */}
              <div className="mt-10 py-16 px-4">
                <div>
                  <h2 className="section-heading text-3xl  font-bold text-center text-[#dfdad6] ">
                    Active Programs
                  </h2>
                  <h2 className="text-lg font-bold text-center text-[#ebe4dd] mb-4">
                    GET IN TOUCH WITH US TO LEARN MORE ABOUT OUR PROGRAMS,
                    PARTNERSHIPS, OR HOW YOU CAN GET INVOLVED.
                  </h2>
                  <h2 className="flex justify-center">program - 1</h2>
                </div>

                <div
                  className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-6xl mx-auto mt-3 rounded-lg shadow-lg"
                  style={{
                    boxShadow: "0 4px 15px rgba(255, 165, 0, 0.4)", // amber/orange shadow
                  }}
                >
                  <div className="shadow rounded-lg p-6  text-white">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={card1}
                        alt="Dawit"
                        className="w-full h-36 object-cover rounded"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl text-amber-300 font-semibold mb-3">
                        Field Placement Program
                      </h2>
                      <span className="text-sm text-green-300">3-6 months</span>
                    </div>

                    <p className="italic text-sm text-gray-300 mb-4">
                      Our flagship program places urban youth with rural farmers
                      for extended periods, providing hands-on agricultural
                      experience while supporting farming communities.
                    </p>

                    <h3 className="text-lg text-green-400 font-medium mb-1">
                      Program Benefits:
                    </h3>
                    <ul className="list-disc list-inside text-sm space-y-1 mb-3 text-gray-200">
                      <li>Live and work alongside experienced farmers</li>
                      <li>Learn traditional and modern farming techniques</li>
                      <li>Receive monthly stipend and accommodation</li>
                      <li>Build lasting community connections</li>
                      <li>Gain practical work experience</li>
                    </ul>
                    <div className="flex items-center space-x-4 mb-4">
                      <button className="px-6 py-1 bg-green-600 text-white text-base font-semibold shadow-md hover:bg-green-200  hover:text-black transition">
                        Join This Program
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* --------------------------- */}
            </div>
          </div>
        </div>
      </section>

      <section className="fixed top-0 left-0 w-full h-full opacity-0 fourth">
        <div className="outer w-full h-full overflow-hidden">
          <div className="inner w-full h-full overflow-hidden">
            <div
              className="bg-img absolute top-0 w-full h-full bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bgImage})`,
              }}
            >
              {/* --------------------------- */}
              <div className="mt-10 py-16 px-4">
                <div>
                  <h2 className="section-heading text-3xl  font-bold text-center text-[#dfdad6] ">
                    program - 2
                  </h2>
                </div>

                <div
                  className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-6xl mx-auto mt-3 rounded-lg shadow-lg"
                  style={{
                    boxShadow: "0 4px 15px rgba(255, 165, 0, 0.4)", // amber/orange shadow
                  }}
                >
                  <div className="shadow rounded-lg p-6  text-white">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={card2}
                        alt="Dawit"
                        className="w-full h-36 object-cover rounded"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl text-amber-300 font-semibold mb-3">
                        Farmer Support Services
                      </h2>
                      <span className="text-sm text-green-300">Ongoing</span>
                    </div>

                    <p className="italic text-sm text-gray-300 mb-4">
                      Comprehensive support services for rural farmers including
                      irrigation assistance, modern planting techniques, and
                      technology transfer..
                    </p>

                    <h3 className="text-lg text-green-400 font-medium mb-1">
                      Program Benefits:
                    </h3>
                    <ul className="list-disc list-inside text-sm space-y-1 mb-3 text-gray-200">
                      <li>Access to modern farming equipment</li>
                      <li>Irrigation system setup and maintenance</li>
                      <li>Crop planning and rotation guidance</li>
                      <li>Pest and disease management</li>
                      <li>Soil testing and improvement</li>
                    </ul>
                    <div className="flex items-center space-x-4 mb-4">
                      <button className="px-6 py-1 bg-green-600 text-white text-base font-semibold shadow-md hover:bg-green-200 hover:text-black transition">
                        Join This Program
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* --------------------------- */}
            </div>
          </div>
        </div>
      </section>

      <section className="fixed top-0 left-0 w-full h-full opacity-0 fourth">
        <div className="outer w-full h-full overflow-hidden">
          <div className="inner w-full h-full overflow-hidden">
            <div
              className="bg-img absolute top-0 w-full h-full bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bgImage})`,
              }}
            >
              {/* --------------------------- */}
              <div className="mt-10 py-16 px-4">
                <div>
                  <h2 className="section-heading text-3xl  font-bold text-center text-[#dfdad6] ">
                    Program-3
                  </h2>
                </div>

                <div
                  className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-6xl mx-auto mt-3 rounded-lg shadow-lg"
                  style={{
                    boxShadow: "0 4px 15px rgba(255, 165, 0, 0.4)", // amber/orange shadow
                  }}
                >
                  <div className="shadow rounded-lg p-6  text-white">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={card3}
                        alt="Dawit"
                        className="w-full h-36 object-cover rounded"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl text-amber-300 font-semibold mb-3">
                        Market Linkage Program
                      </h2>
                      <span className="text-sm text-green-300">Year-round</span>
                    </div>

                    <p className="italic text-sm text-gray-300 mb-4">
                      Connect farmers directly to urban markets, facilitating
                      group sales and ensuring fair pricing for agricultural
                      products.
                    </p>

                    <h3 className="text-lg text-green-400 font-medium mb-1">
                      Program Benefits:
                    </h3>
                    <ul className="list-disc list-inside text-sm space-y-1 mb-3 text-gray-200">
                      <li>Direct access to urban buyers</li>
                      <li>Group sales coordination</li>
                      <li>Price negotiation support</li>
                      <li>Transportation facilitation</li>
                      <li>Quality control assistance</li>
                    </ul>
                    <div className="flex items-center space-x-4 mb-4">
                      <button className="px-6 py-1 bg-green-600 text-white text-base font-semibold shadow-md hover:bg-green-200 hover:text-black transition">
                        Join This Program
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* --------------------------- */}
            </div>
          </div>
        </div>
      </section>

      <section className="fixed top-0 left-0 w-full h-full opacity-0 fourth">
        <div className="outer w-full h-full overflow-hidden">
          <div className="inner w-full h-full overflow-hidden">
            <div
              className="bg-img absolute top-0 w-full h-full bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bgImage})`,
              }}
            >
              {/* --------------------------- */}
              <div className="mt-10 py-16 px-4">
                <div>
                  <h2 className="section-heading text-3xl  font-bold text-center text-[#dfdad6] ">
                    Program-4
                  </h2>
                </div>

                <div
                  className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-6xl mx-auto mt-3 rounded-lg shadow-lg"
                  style={{
                    boxShadow: "0 4px 15px rgba(255, 165, 0, 0.4)", // amber/orange shadow
                  }}
                >
                  <div className="shadow rounded-lg p-6  text-white">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={card4}
                        alt="Dawit"
                        className="w-full h-36 object-cover rounded"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl text-amber-300 font-semibold mb-3">
                        Training & Certification
                      </h2>
                      <span className="text-sm text-green-300">2-4 weeks</span>
                    </div>

                    <p className="italic text-sm text-gray-300 mb-4">
                      Structured training programs for both youth and farmers,
                      covering modern agricultural practices, business skills,
                      and community development.
                    </p>

                    <h3 className="text-lg text-green-400 font-medium mb-1">
                      Program Benefits:
                    </h3>
                    <ul className="list-disc list-inside text-sm space-y-1 mb-3 text-gray-200">
                      <li>Certified agricultural training</li>
                      <li>Business and entrepreneurship skills</li>
                      <li>Leadership development</li>
                      <li>Community engagement techniques</li>
                      <li>Digital literacy programs</li>
                    </ul>
                    <div className="flex items-center space-x-4 mb-4">
                      <button className="px-6 py-1 bg-green-600 text-white text-base font-semibold shadow-md hover:bg-green-200  hover:text-blacktransition">
                        Join This Program
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* --------------------------- */}
            </div>
          </div>
        </div>
      </section>

      <section className="fixed top-0 left-0 w-full h-full opacity-0 first">
        <header className="fixed z-30 w-full flex justify-between items-center px-[5%] h-28 font-['Bebas Neue'] text-[clamp(0.66rem,2vw,1rem)] tracking-[0.5em]"></header>
        <div className="outer w-full h-full overflow-hidden">
          <div className="inner w-full h-full overflow-hidden">
            <div
              className="bg-img absolute top-0 w-full h-full bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bgImage})`,
              }}
            >
              <div className="flex flex-col items-center justify-center text-center max-w-[90vw]">
                <h2 className="section-heading text-[clamp(0.8rem,3vw,2.5rem)] font-normal tracking-[0.3em] text-gray-300 max-w-[900px] mb-4">
                  Ready to Get Started?
                </h2>
                <h2 className="section-heading text-[clamp(0.8rem,2.5vw,2rem)] font-normal tracking-[0.3em] text-gray-300 max-w-[900px] mb-4">
                  Join thousands of youth and farmers who are already part of
                  the YeLijoch Mahiber community.
                </h2>
                <div className="gap-x-7">
                  <button className="px-6 py-3 bg-yellow-600 text-white text-base font-semibold rounded-full shadow-md hover:bg-yellow-700 transition mr-2.5">
                    Apply now
                  </button>
                  <button className="px-6 py-3 bg-amber-50 text-black text-base font-semibold rounded-full shadow-md hover:bg-yellow-700 transition">
                    Contact US
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Programs;
