import { useEffect } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import SplitType from "split-type"; // Alternative to SplitText

import bgImage from "../assets/background-image3.avif";
import bgImage7 from "../assets/background-image7.avif";
import bgImage8 from "../assets/background-image8.avif";
import bgImage2 from "../assets/background-image2.avif";
import bgImage12 from "../assets/background-image12.avif";

import { Users } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { MapPin } from "lucide-react";
import { MessageSquareHeart } from "lucide-react";

import man from "../assets/man.png";
import land from "../assets/land.png";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(Observer);
}

const Impact = () => {
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
      onDown: () => !animating && gotoSection(currentIndex + 1, 1),
      onUp: () => !animating && gotoSection(currentIndex - 1, -1),

      tolerance: 10,
      preventDefault: true,
    });

    gotoSection(0, 1);
  }, []);

  return (
    <div className="relative h-screen text-white font-['Cormorant Garamond'] uppercase">
      {/* Section 4 */}
      <section className="fixed top-0 left-0 w-full h-full opacity-0 fourth">
        <div className="outer w-full h-full overflow-hidden">
          <div className="inner w-full h-full overflow-hidden">
            <div
              className="bg-img absolute top-0 w-full h-full bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bgImage7})`,
              }}
            >
              {/* --------------------------- */}
              <div className=" py-16 px-4">
                <div>
                  <div>
                    <h2 className="section-heading text-3xl  font-bold text-center text-[#dfdad6] mb-4">
                      Our Impact
                    </h2>
                    <h2 className="text-lg font-bold text-center text-[#ebe4dd] mb-4">
                      Measuring success through the lives we've touched and the
                      communities we've strengthened.
                    </h2>
                  </div>
                  <h3 className="text-2xl font-semibold text-orange-800 mb-3">
                    Key Performance Indicators
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                  <div className=" shadow-md rounded-lg p-6 text-center border">
                    <div className="mb-4">
                      <div className="w-12 h-12 mx-auto rounded-full  flex items-center justify-center">
                        <i className="fas fa-users text-amber-50">
                          <Users />
                        </i>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-orange-800">500+</p>
                    <p className="font-semibold text-orange-800">
                      Youth Placed
                    </p>
                    <p className="text-sm text-amber-50 mt-1">
                      Urban youth successfully placed with rural farmers
                    </p>
                  </div>

                  {/* Income Increase */}
                  <div className=" shadow-md rounded-lg p-6 text-center border">
                    <div className="mb-4">
                      <div className="w-12 h-12 mx-auto rounded-full  flex items-center justify-center">
                        <i className="fas fa-chart-line text-amber-50">
                          <ArrowUpRight />
                        </i>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-orange-800">20%</p>
                    <p className="font-semibold text-orange-800">
                      Income Increase
                    </p>
                    <p className="text-sm text-amber-50 mt-1">
                      Average increase in farmer income through our programs
                    </p>
                  </div>

                  {/* Communities */}
                  <div className=" shadow-md rounded-lg p-6 text-center border">
                    <div className="mb-4">
                      <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center">
                        <i className="fas fa-map-marker-alt text-amber-50">
                          <MapPin />
                        </i>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-orange-800">50+</p>
                    <p className="font-semibold text-orange-800">Communities</p>
                    <p className="text-sm text-amber-50 mt-1">
                      Rural communities actively participating in our programs
                    </p>
                  </div>

                  {/* Satisfaction Rate */}
                  <div className="shadow-md rounded-lg p-6 text-center border">
                    <div className="mb-4">
                      <div className="w-12 h-12 mx-auto rounded-full  flex items-center justify-center">
                        <i className="fas fa-award text-amber-50">
                          <MessageSquareHeart />
                        </i>
                      </div>
                    </div>
                    <p className="text-2xl font-bold text-orange-800">95%</p>
                    <p className="font-semibold text-orange-800">
                      Satisfaction Rate
                    </p>
                    <p className="text-sm text-amber-50 mt-1">
                      Participant satisfaction with our programs
                    </p>
                  </div>
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
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bgImage7})`,
              }}
            >
              {/* --------------------------- */}
              <div className="py-16 px-4">
                <div>
                  <div>
                    <h2 className="section-heading text-3xl  font-bold text-center text-[#dfdad6] mb-4">
                      Written Testimonials
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  <div className=" shadow rounded p-6 ">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={bgImage8}
                        alt="Almaz"
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-semibold">Almaz Tadesse</p>
                        <p className="text-sm text-amber-100">
                          Farmer, Oromia Region
                        </p>
                      </div>
                    </div>
                    <p className="italic text-sm">
                      "The young people who came to help us brought new ideas
                      and energy. My harvest increased by 30% last season, and I
                      learned about modern irrigation techniques that I still
                      use today."
                    </p>
                  </div>

                  <div className="shadow rounded p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={bgImage8}
                        alt="Dawit"
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-semibold">Dawit Mekonnen</p>
                        <p className="text-sm text-amber-100">
                          Youth Participant, Addis Ababa
                        </p>
                      </div>
                    </div>
                    <p className="italic text-sm">
                      "This program changed my life. I not only gained practical
                      skills in agriculture but also found my purpose in helping
                      rural communities. I now run my own agricultural
                      consulting business."
                    </p>
                  </div>

                  <div className="shadow rounded p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={bgImage}
                        alt="Hanna"
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-semibold">Hanna Wolde</p>
                        <p className="text-sm text-amber-100">
                          Farmer, Amhara Region
                        </p>
                      </div>
                    </div>
                    <p className="italic text-sm">
                      "Working with the youth taught me about market prices and
                      how to sell directly to buyers in the city. I no longer
                      depend on middlemen and earn much more for my crops."
                    </p>
                  </div>
                </div>
              </div>
              {/* --------------------------- */}
            </div>
          </div>
        </div>
      </section>
      {/*************************************00  */}
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
              <div className="py-16 px-4">
                <div>
                  <div>
                    <h2 className="section-heading text-3xl  font-bold text-center text-[#dfdad6] mb-4">
                      Video Testimonials
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                  {/* --------------------------- */}

                  <div className="shadow rounded p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <img src={man} alt="Dawit" className="w-full h-40 " />
                      <div></div>
                    </div>
                    <h3 className="text-sm text-amber-100">
                      Dawit's Transformation Story
                    </h3>
                    <p className="italic text-sm">
                      From unemployed graduate to successful agricultural
                      entrepreneur • 3:45
                    </p>
                  </div>

                  <div className="shadow rounded p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <img src={land} alt="Almaz" className="w-full h-40 " />
                      <div></div>
                    </div>
                    <h3 className="text-sm text-amber-100">
                      Almaz's Success Story
                    </h3>
                    <p className="italic text-sm">
                      How youth volunteers helped increase harvest by 30% • 2:30
                    </p>
                  </div>

                  <div className="flex items-center space-x-4 mb-4">
                    <button className="px-6 py-3 bg-yellow-600 text-white text-base font-semibold rounded-full shadow-md hover:bg-yellow-700 transition">
                      View All Videos
                    </button>
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
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bgImage2})`,
              }}
            >
              {/* --------------------------- */}
              <div className="py-16 px-4">
                <div>
                  <div>
                    <h2 className="section-heading text-3xl  font-bold text-center text-[#dfdad6] mb-4">
                      Program Impact Over Time
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  <div className=" shadow rounded p-6 ">
                    <div className="flex items-center space-x-4 mb-4">
                      <div>
                        <p className="font-semibold text-green-600 text-2xl">
                          Year 1
                        </p>
                        <p className="text-sm text-amber-100 mb-2.5">
                          150 youth placed
                        </p>
                        <p className="text-sm text-amber-100 mb-2.5">
                          25 farming communities
                        </p>
                        <p className="text-sm text-amber-100 mb-2.5">
                          15% average income increase
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="shadow rounded p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div>
                        <p className="font-semibold text-green-600 text-2xl">
                          Year 2
                        </p>
                        <p className="text-sm text-amber-100 mb-2.5">
                          350 youth placed
                        </p>
                        <p className="text-sm text-amber-100 mb-2.5">
                          40 farming communities
                        </p>
                        <p className="text-sm text-amber-100 mb-2.5">
                          18% average income increase
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="shadow rounded p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div>
                        <p className="font-semibold text-green-600 text-2xl">
                          Year 3
                        </p>
                        <p className="text-sm text-amber-100 mb-2.5">
                          500+ youth placed
                        </p>
                        <p className="text-sm text-amber-100 mb-2.5">
                          50+ farming communities
                        </p>
                        <p className="text-sm text-amber-100 mb-2.5">
                          20% average income increase
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* --------------------------- */}
            </div>
          </div>
        </div>
      </section>

      {/**************** */}
      <section className="fixed top-0 left-0 w-full h-full opacity-0 fourth">
        <div className="outer w-full h-full overflow-hidden">
          <div className="inner w-full h-full overflow-hidden">
            <div
              className="bg-img absolute top-0 w-full h-full bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bgImage12})`,
              }}
            >
              {/* --------------------------- */}
              <div className="py-16 px-4">
                <div>
                  <div>
                    <h2 className="section-heading text-3xl  font-bold text-center text-[#dfdad6] mb-4">
                      Our Long-term Vision
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  <div className=" shadow rounded p-6 ">
                    <div className="flex items-center space-x-4 mb-4">
                      <div>
                        <p className="font-semibold text-green-600 text-2xl">
                          5,000 Youth
                        </p>
                        <p className="text-sm text-amber-100 mb-2.5">
                          Placed across Ethiopia by 2030
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="shadow rounded p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div>
                        <p className="font-semibold text-green-600 text-2xl">
                          500 Communities
                        </p>
                        <p className="text-sm text-amber-100 mb-2.5">
                          Rural communities transformed
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="shadow rounded p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div>
                        <p className="font-semibold text-green-600 text-2xl">
                          50% Income Boost
                        </p>
                        <p className="text-sm text-amber-100 mb-2.5">
                          Target increase in farmer earnings
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* --------------------------- */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Impact;
