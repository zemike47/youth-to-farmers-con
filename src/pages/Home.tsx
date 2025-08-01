import { useEffect } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import SplitType from "split-type"; // Alternative to SplitText
import { MoveRight } from "lucide-react";
import bgImage from "../assets/background-image3.avif";
import bgImage2 from "../assets/background-image4.avif";

import bgImage4 from "../assets/background-image6.avif";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(Observer);
}

const Home = () => {
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const images = document.querySelectorAll(".bg-img");
    const outerWrappers = document.querySelectorAll(".outer");
    const innerWrappers = document.querySelectorAll(".inner");
    const headings = document.querySelectorAll(".section-heading");

    const splitHeadings = Array.from(headings).map(
      (heading) =>
        new SplitType(heading as HTMLElement, {
          types: ["lines", "words", "chars"],
        })
    );

    let currentIndex = -1;
    let animating = false;
    const wrap = gsap.utils.wrap(0, sections.length);

    gsap.set(outerWrappers, { yPercent: 100 });
    gsap.set(innerWrappers, { yPercent: -100 });

    function gotoSection(index: number, direction: number): void {
      index = wrap(index);
      animating = true;
      const fromTop = direction === -1;
      const dFactor = fromTop ? -1 : 1;

      const tl = gsap.timeline({
        defaults: { duration: 1.25, ease: "power1.inOut" },
        onComplete: () => {
          animating = false;
        },
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
      onDown: () => !animating && gotoSection(currentIndex + 1, 1),
      onUp: () => !animating && gotoSection(currentIndex - 1, -1),

      tolerance: 10,
      preventDefault: true,
    });

    gotoSection(0, 1);
  }, []);
  return (
    <div className="relative h-screen text-white font-['Cormorant Garamond'] uppercase">
      {/* Section 1 */}

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
                  YeLijoch Mahiber
                </h2>
                <h2 className="section-heading text-[clamp(0.8rem,2.5vw,2rem)] font-normal tracking-[0.3em] text-gray-300 max-w-[900px] mb-4">
                  Empowering Youth, Uplifting Farmers
                </h2>
                <h2 className="section-heading text-[clamp(0.7rem,2vw,1.5rem)] font-normal tracking-[0.2em] text-gray-300 max-w-[900px] mb-6">
                  Bridging Urban Youth with Rural Farmers — A Sustainable
                  Support and Learning Ecosystem
                </h2>
                <button className="px-6 py-3 bg-yellow-600 text-white text-base font-semibold rounded-full shadow-md hover:bg-yellow-700 transition">
                  Get Involved
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="fixed top-0 left-0 w-full h-full opacity-0 second">
        <div className="outer w-full h-full overflow-hidden">
          <div className="inner w-full h-full overflow-hidden">
            <div
              className="bg-img absolute top-0 w-full h-full bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bgImage2})`,
              }}
            >
              {/* --------------------------- */}
              <div className="py-16 px-4">
                <h2 className="text-3xl font-bold text-center text-[#f5810e] mb-12">
                  Our Three Core Goals
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {/* Card 1 */}
                  <div className=" rounded-lg p-8 shadow-sm text-center border border-gray-200">
                    <div className="flex justify-center mb-4">
                      <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center">
                        <span className="text-green-600 text-2xl">🌱</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-[#f5810e] mb-2">
                      Support Rural Farmers
                    </h3>
                    <p className="text-sm text-[#f5810e]">
                      Provide direct agricultural support, modern techniques,
                      and market access to rural farming communities across
                      Ethiopia.
                    </p>
                  </div>

                  {/* Card 2 */}
                  <div className="rounded-lg p-8 shadow-sm text-center border border-gray-200">
                    <div className="flex justify-center mb-4">
                      <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center">
                        <span className="text-green-600 text-2xl">👥</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-[#f5810e] mb-2">
                      Empower Youth
                    </h3>
                    <p className="text-sm text-[#f5810e]">
                      Give urban youth purpose, practical skills, and meaningful
                      work experience while contributing to rural development.
                    </p>
                  </div>

                  {/* Card 3 */}
                  <div className="rounded-lg p-8 shadow-sm text-center border border-gray-200">
                    <div className="flex justify-center mb-4">
                      <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center">
                        <span className="text-green-600 text-2xl">$</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-[#f5810e] mb-2">
                      Generate Income
                    </h3>
                    <p className="text-sm text-[#f5810e]">
                      Create sustainable revenue through coordination services,
                      value-added activities, and market facilitation.
                    </p>
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

      {/* Section 4 */}
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
                  <h2 className="section-heading text-3xl pt-20 font-bold text-center text-[#804000] mb-12">
                    Latest News & Stories
                  </h2>
                  <h2 className="text-lg font-bold text-center text-[#804000] mb-12">
                    Stay updated with our impact and success stories
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {/* Card 1 */}
                  <div className=" rounded-lg p-8 shadow-sm border  border-gray-200">
                    <div className="flex justify-center mb-4">
                      <div className=" rounded-full w-12 h-12 flex items-center justify-center">
                        <span className="text-green-600 text-2xl">
                          Milestone
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-[#804000] mb-2 text-left">
                      500 Youth Successfully Placed
                    </h3>
                    <p className="text-sm text-[#804000] text-left mb-4">
                      YeLijoch Mahiber reaches major milestone with 500 urban
                      youth placed in rural communities.
                    </p>
                    <a
                      href="#"
                      className="text-green-600 inline-flex items-center hover:underline text-left"
                    >
                      Read more
                      <MoveRight className="ml-1 w-4 h-4" />
                    </a>
                  </div>

                  {/* Card 2 */}
                  <div className="rounded-lg p-8 shadow-sm text-center border border-gray-200">
                    <div className="flex justify-center mb-4">
                      <div className=" rounded-full w-12 h-12 flex items-center justify-center">
                        <span className="text-green-600 text-2xl">
                          Success Story
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-[#804000] mb-2">
                      From City to Farm: Dawit's Story
                    </h3>
                    <p className="text-sm text-[#804000]">
                      How a computer science graduate found his calling in rural
                      agriculture.
                    </p>
                    <a
                      href="#"
                      className="text-green-600 inline-flex items-center hover:underline text-left"
                    >
                      Read more
                      <MoveRight className="ml-1 w-4 h-4" />
                    </a>
                  </div>

                  {/* Card 3 */}
                  <div className="rounded-lg p-8 shadow-sm text-center border border-gray-200">
                    <div className="flex justify-center mb-4">
                      <div className="rounded-full w-12 h-12 flex items-center justify-center">
                        <span className="text-green-600 text-2xl">
                          Impact Report
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-[#804000] mb-2">
                      30% Increase in Farmer Income
                    </h3>
                    <p className="text-sm text-[#804000]">
                      Latest assessment shows significant income improvements
                      for participating farmers.
                    </p>
                    <a
                      href="#"
                      className="text-green-600 inline-flex items-center hover:underline text-left"
                    >
                      Read more
                      <MoveRight className="ml-1 w-4 h-4" />
                    </a>
                  </div>
                  <div></div>

                  <button className="px-6 py-3 m-5 bg-emerald-900 text-white text-lg font-semibold rounded-2xl shadow-md hover:bg-white  hover:text-black transition">
                    View All News & Stories
                  </button>
                </div>
              </div>
              {/* --------------------------- */}
            </div>
          </div>
        </div>
      </section>

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
              <div className="py-16 px-4 mt-16">
                <div>
                  <h2 className="section-heading text-3xl  font-bold text-center text-[#dfdad6] mb-4">
                    Contact Us
                  </h2>
                  <h2 className="text-lg font-bold text-center text-[#ebe4dd] mb-4">
                    Get in touch with us to learn more about our programs,
                    partnerships, or how you can get involved.
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-6xl mx-auto mt-3">
                  <div className="shadow rounded p-6">
                    <div className="border rounded-md p-6 shadow-md mb-8">
                      {/* Title */}
                      <h2 className="text-2xl font-bold text-amber-800 mb-2">
                        Stay Updated
                      </h2>

                      {/* Description */}
                      <p className="text-white mb-6">
                        Subscribe to our newsletter for the latest updates,
                        success stories, and opportunities to get involved.
                      </p>
                      <form className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
                        <input
                          type="email"
                          placeholder="Enter your email address"
                          className="px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-amber-300 w-full sm:w-auto"
                        />
                        <button
                          type="submit"
                          className="bg-green-700 text-white px-5 py-2 rounded-md hover:bg-green-800 transition"
                        >
                          Subscribe
                        </button>
                      </form>
                      {/* Disclaimer */}
                      <p className="text-xs flex justify-center text-red-400">
                        We respect your privacy. Unsubscribe at any time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* --------------------------- */}
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 */}
      <section className="fixed top-0 left-0 w-full h-full opacity-0 fifth">
        <div className="outer w-full h-full overflow-hidden">
          <div className="inner w-full h-full overflow-hidden">
            <div
              className="bg-img absolute top-0 w-full h-full bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bgImage})`,
              }}
            >
              <h2 className="section-heading text-[clamp(1rem,5vw,5rem)] font-normal text-center tracking-[0.5em] text-gray-300 w-[90vw] max-w-[1200px]">
                Keep scrolling
              </h2>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
