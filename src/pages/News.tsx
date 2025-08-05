import { useEffect } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import SplitType from "split-type"; // Alternative to SplitText

import bg24 from "../assets/bg-24.jpg";
import bg25 from "../assets/bg-25.jpg";
import bg26 from "../assets/bg-26.jpg";

import dawit from "../assets/success-story-dawit.jpg";
import dark from "../assets/rural-community.jpg";
import farm from "../assets/ethiopian-farmer.jpg";

import agriculture from "../assets/agricultural-training.jpg";
import farmTech from "../assets/farming-technology.jpg";
import youthGroup from "../assets/youth-group.jpg";

import { useState } from "react";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(Observer);
}

const News = () => {
  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    if (isMobile) return;

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

  const [selected, setSelected] = useState("All");

  return (
    <div className="relative h-screen text-white font-['Cormorant Garamond'] uppercase">
      {/* Section 4 */}
      <section className="fixed top-0 left-0 w-full h-full opacity-0 fourth">
        <div className="outer w-full h-full overflow-hidden">
          <div className="inner w-full h-full overflow-hidden">
            <div
              className="bg-img absolute top-0 w-full h-full bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bg25})`,
              }}
            >
              {/* --------------------------- */}
              <div className=" py-16 px-4 mt-[400px]">
                <div>
                  <div>
                    <h2 className="section-heading text-base font-bold text-center text-[#dfdad6] mb-4">
                      News & Stories
                    </h2>
                    <h2 className="text-xs font-bold text-center text-[#ebe4dd] mb-4">
                      Stay updated with the latest news, success stories, and
                      impact reports from YeLijoch Mahiber
                    </h2>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {/* Search Bar */}
                    <div className="flex items-center border rounded-md px-3 py-1.5 w-64 bg-white text-black">
                      <span className="text-gray-400 mr-2">🔍</span>
                      <input
                        type="text"
                        placeholder="Search articles..."
                        className="w-full bg-transparent outline-none text-xs"
                      />
                    </div>

                    {/* Buttons - Hardcoded */}
                    <button
                      onClick={() => setSelected("All")}
                      className={`px-2 py-1 rounded-md text-sm border transition-all ${
                        selected === "All"
                          ? "bg-green-700 text-white"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      All (7)
                    </button>

                    <button
                      onClick={() => setSelected("Success Story")}
                      className={`px-2 py-1 rounded-md text-sm border transition-all ${
                        selected === "Success Story"
                          ? "bg-green-700 text-white"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      Success Story (2)
                    </button>

                    <button
                      onClick={() => setSelected("Program Update")}
                      className={`px-2 py-1 rounded-md text-sm border transition-all ${
                        selected === "Program Update"
                          ? "bg-green-700 text-white"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      Program Update (1)
                    </button>

                    <button
                      onClick={() => setSelected("Impact Report")}
                      className={`px-2 py-1 rounded-md text-sm border transition-all ${
                        selected === "Impact Report"
                          ? "bg-green-700 text-white"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      Impact Report (1)
                    </button>

                    <button
                      onClick={() => setSelected("Partnership")}
                      className={`px-2 py-1 rounded-md text-sm border transition-all ${
                        selected === "Partnership"
                          ? "bg-green-700 text-white"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      Partnership (1)
                    </button>

                    <button
                      onClick={() => setSelected("Innovation")}
                      className={`px-2 py-1 rounded-md text-sm border transition-all ${
                        selected === "Innovation"
                          ? "bg-green-700 text-white"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      Innovation (1)
                    </button>

                    <button
                      onClick={() => setSelected("Milestone")}
                      className={`px-2 py-1 rounded-md text-sm border transition-all ${
                        selected === "Milestone"
                          ? "bg-green-700 text-white"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      Milestone (1)
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-6xl mx-auto mt-3">
                  <div className="shadow rounded p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={youthGroup}
                        alt="Dawit"
                        className="w-full h-60 "
                      />
                      <div></div>
                    </div>
                    <h3 className="text-base text-amber-300 mb-2.5">
                      500 Youth Successfully Placed in Rural Communities Across
                      Ethiopia
                    </h3>
                    <p className="italic text-xs">
                      A milestone achievement as YeLijoch Mahiber reaches its
                      target of placing 500 urban youth with rural farmers,
                      creating lasting impact in agricultural communities.
                    </p>
                    <div>
                      {" "}
                      <span className="text-sm text-amber-100">
                        YeLijoch Mahiber Team
                      </span>
                      <span className="text-sm text-amber-100">
                        📅 1/15/2024 • ⏱ 5 min read
                      </span>
                      <a
                        href="#"
                        className="text-green-600 font-medium hover:underline flex items-center"
                      >
                        Read Full Story →
                      </a>
                    </div>
                  </div>

                  {/************************************ */}
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
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bg24})`,
              }}
            >
              {/* --------------------------- */}
              <div className="py-16 px-4 mt-[590px]">
                <div>
                  <div>
                    <h2 className="section-heading text-base font-bold text-center text-[#dfdad6] mb-4">
                      News & Stories
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {/* --------------------------- */}

                  <div className="shadow rounded p-2 border ">
                    <div className="flex items-center space-x-4 mb-4">
                      <img src={dawit} alt="Dawit" className="w-full h-40 " />
                      <div></div>
                    </div>
                    <h3 className="text-sm text-amber-100 mb-2.5">
                      From City to Farm: Dawit's Transformation Story
                    </h3>
                    <p className="italic text-sm">
                      Meet Dawit Mekonnen, a 24-year-old from Addis Ababa who
                      found his calling in rural agriculture through our field
                      placement
                    </p>
                    <div>
                      {" "}
                      <span className="text-sm text-amber-100">
                        By Sarah Johnson
                      </span>
                      <span className="text-sm text-amber-100">
                        📅 1/10/2024 • ⏱ 4 min read
                      </span>
                      <a
                        href="#"
                        className="text-green-600 font-medium hover:underline flex items-center"
                      >
                        Read More →
                      </a>
                    </div>
                  </div>
                  {/************************************ */}

                  <div className="shadow rounded p-2 border">
                    <div className="flex items-center space-x-4 mb-4">
                      <img src={dark} alt="Dawit" className="w-full h-40 " />
                      <div></div>
                    </div>
                    <h3 className="text-sm text-amber-100 mb-2.5">
                      New Partnership with Ethiopian Agricultural Ministry
                    </h3>
                    <p className="italic text-sm">
                      YeLijoch Mahiber signs strategic partnership agreement to
                      expand programs nationwide with government support.
                    </p>
                    <div>
                      {" "}
                      <span className="text-sm text-amber-100">
                        YeLijoch Mahiber Team
                      </span>
                      <span className="text-sm text-amber-100">
                        📅 1/8/2024• ⏱ 3 min read
                      </span>
                      <a
                        href="#"
                        className="text-green-600 font-medium hover:underline flex items-center"
                      >
                        Read More →
                      </a>
                    </div>
                  </div>
                  {/************************************ */}

                  <div className="shadow rounded p-2 border">
                    <div className="flex items-center space-x-4 mb-4">
                      <img src={farm} alt="Dawit" className="w-full h-40 " />
                      <div></div>
                    </div>
                    <h3 className="text-sm text-amber-100 mb-2.5">
                      Harvest Season Success: 30% Increase in Farmer Income
                    </h3>
                    <p className="italic text-sm">
                      Latest impact assessment shows significant income
                      improvements for farmers participating in our support
                      programs.
                    </p>
                    <div>
                      {" "}
                      <span className="text-sm text-amber-100">
                        Research Team
                      </span>
                      <span className="text-sm text-amber-100">
                        📅 1/5/2024 • ⏱ 6 min read
                      </span>
                      <a
                        href="#"
                        className="text-green-600 font-medium hover:underline flex items-center"
                      >
                        Read More →
                      </a>
                    </div>
                  </div>
                  {/************************************ */}
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
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bg26})`,
              }}
            >
              {/* --------------------------- */}
              <div className="py-16 px-4 mt-[800px]">
                <div>
                  <div>
                    <h2 className="section-heading text-base  font-bold text-center text-[#dfdad6] mb-4">
                      .
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  {/* --------------------------- */}

                  <div className="shadow rounded p-2 border">
                    <div className="flex items-center space-x-4 mb-4">
                      <img src={farm} alt="Dawit" className="w-full h-40 " />
                      <div></div>
                    </div>
                    <h3 className="text-sm text-amber-100 mb-2.5">
                      Almaz's Farm: A Model of Modern Agriculture
                    </h3>
                    <p className="italic text-sm">
                      How one farmer in Oromia region transformed her
                      traditional farm using techniques learned from youth
                      volunteers.
                    </p>
                    <div>
                      {" "}
                      <span className="text-sm text-amber-100">
                        Field Reporter
                      </span>
                      <span className="text-sm text-amber-100">
                        📅 1/3/2024 • ⏱ 5 min read
                      </span>
                      <a
                        href="#"
                        className="text-green-600 font-medium hover:underline flex items-center"
                      >
                        Read More →
                      </a>
                    </div>
                  </div>
                  {/************************************ */}

                  <div className="shadow rounded p-2 border">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={agriculture}
                        alt="Dawit"
                        className="w-full h-40 "
                      />
                      <div></div>
                    </div>
                    <h3 className="text-sm text-amber-100 ">
                      Training Program Expansion: New Certification Courses
                    </h3>
                    <p className="italic text-sm">
                      Announcing new agricultural certification courses for
                      youth participants, developed in partnership with local
                      universities.
                    </p>
                    <div>
                      {" "}
                      <span className="text-sm text-amber-100">
                        Training Department
                      </span>
                      <span className="text-sm text-amber-100">
                        📅 12/28/2023 • ⏱ 3 min read
                      </span>
                      <a
                        href="#"
                        className="text-green-600 font-medium hover:underline flex items-center"
                      >
                        Read More →
                      </a>
                      <a
                        href="#"
                        className="text-green-500 border text-center font-medium hover:bg-white mt-1.5 flex justify-center"
                      >
                        load more videos
                      </a>
                    </div>
                  </div>
                  {/************************************ */}

                  <div className="shadow rounded p-2 border">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={farmTech}
                        alt="Dawit"
                        className="w-full h-40 "
                      />
                      <div></div>
                    </div>
                    <h3 className="text-sm text-amber-100 mb-2.5">
                      Technology in Agriculture: Digital Tools for Rural Farmers
                    </h3>
                    <p className="italic text-sm">
                      Exploring how mobile apps and digital platforms are
                      helping farmers access market information and weather
                      updates.
                    </p>
                    <div>
                      {" "}
                      <span className="text-sm text-amber-100">Tech Team</span>
                      <span className="text-sm text-amber-100">
                        📅 12/25/2023 • ⏱ 7 min read
                      </span>
                      <a
                        href="#"
                        className="text-green-600 font-medium hover:underline flex items-center"
                      >
                        Read More →
                      </a>
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

export default News;
