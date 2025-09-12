import { useEffect } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import SplitType from "split-type"; // Alternative to SplitText

import { BookOpen } from "lucide-react";

import video from "../assets/video.png";
import man from "../assets/man.png";
import land from "../assets/land.png";

import bg40 from "../assets/bg-40.jpg";
import bg41 from "../assets/bg-41.jpg";
import bg42 from "../assets/bg-42.jpg";
import bg43 from "../assets/bg-43.jpg";

import { Users } from "lucide-react";
import { ArrowUpRight } from "lucide-react";

import card1 from "../assets/card1.png";
import card2 from "../assets/card2.png";
import card3 from "../assets/card3.png";

import { useTranslation } from "react-i18next";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(Observer);
}

import { useNavigate } from "react-router-dom";
const Videos = () => {
  const { t } = useTranslation();

  const nav = useNavigate();

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const images = document.querySelectorAll(".bg-img");
    const outerWrappers = document.querySelectorAll(".outer");
    const innerWrappers = document.querySelectorAll(".inner");
    const headings = document.querySelectorAll(".section-heading");

    const splitHeadings = Array.from(headings).map((heading) => {
      console.log("🔠 Splitting heading:", heading.textContent);
      return new SplitType(heading as HTMLElement, {
        types: ["lines", "words", "chars"],
      });
    });

    let currentIndex = -1;
    let animating = false;
    let isScrollingInside = false;
    let observer: gsap.plugins.Observer | null = null;

    const wrap = gsap.utils.wrap(0, sections.length);

    function enableScroll(section: HTMLElement) {
      const scrollable = section.querySelector(".bg-img") as HTMLElement;
      if (scrollable) {
        scrollable.style.overflowY = "auto";
        scrollable.style.position = "relative";
        scrollable.style.height = "100vh";
      }
    }

    function disableScroll(section: HTMLElement) {
      const scrollable = section.querySelector(".bg-img") as HTMLElement;
      if (scrollable) {
        scrollable.style.overflow = "hidden";
        scrollable.style.position = "absolute";
        scrollable.scrollTop = 0;
      }
    }

    function createObserver() {
      if (observer) {
        observer.kill();
      }

      observer = Observer.create({
        type: "wheel,touch,pointer",
        wheelSpeed: -1,
        tolerance: 10,
        preventDefault: true,
        onWheel: (e) => {
          if (isScrollingInside) {
            e.event.preventDefault();
          }
        },
        onDown: () => {
          if (!animating && !isScrollingInside) {
            gotoSection(currentIndex - 1, -1);
          }
        },
        onUp: () => {
          console.log("⬆️ Observer onUp");
          if (!animating && !isScrollingInside) {
            gotoSection(currentIndex + 1, 1);
          }
        },
      });
    }

    function gotoSection(index: number, direction: number): void {
      index = wrap(index);
      animating = true;
      const fromTop = direction === -1;
      const dFactor = fromTop ? -1 : 1;

      const prevSection =
        currentIndex >= 0 ? (sections[currentIndex] as HTMLElement) : null;
      const nextSection = sections[index] as HTMLElement;

      if (prevSection) {
        gsap.set(prevSection, { zIndex: 0 });
      }

      gsap.set(nextSection, { autoAlpha: 1, zIndex: 1 });

      const tl = gsap.timeline({
        defaults: { duration: 1.25, ease: "power1.inOut" },
        onComplete: () => {
          setTimeout(() => {
            animating = false;
          }, 500);

          if (nextSection.classList.contains("scrollable-section")) {
            isScrollingInside = true;
            observer?.kill();
            enableScroll(nextSection);

            const scrollable = nextSection.querySelector(
              ".bg-img"
            ) as HTMLElement;

            let lastScrollTop = scrollable.scrollTop;
            let edgeScrollCount = 0;
            let lastEdgeReached: "top" | "bottom" | null = null;
            let touchStartY = 0;

            const getScrollInfo = () => {
              const scrollTop = scrollable.scrollTop;
              const scrollHeight = scrollable.scrollHeight;
              const clientHeight = scrollable.clientHeight;

              const scrollPercent = (scrollTop + clientHeight) / scrollHeight;
              const atBottom = scrollPercent >= 0.98;
              const atTop = scrollTop <= scrollHeight * 0.02;

              return { scrollTop, atTop, atBottom };
            };

            const handleEdgeScrollAttempt = (dir: "up" | "down") => {
              const { atTop, atBottom } = getScrollInfo();

              if (dir === "down" && atBottom) {
                if (lastEdgeReached === "bottom") edgeScrollCount++;
                else {
                  lastEdgeReached = "bottom";
                  edgeScrollCount = 1;
                }

                if (edgeScrollCount >= 3) {
                  cleanup();
                  gotoSection(index + 1, 1);
                }
              } else if (dir === "up" && atTop) {
                if (lastEdgeReached === "top") edgeScrollCount++;
                else {
                  lastEdgeReached = "top";
                  edgeScrollCount = 1;
                }

                if (edgeScrollCount >= 3) {
                  console.log(
                    "🚀 Scrolled to top 3 times → moving to previous section"
                  );
                  cleanup();
                  gotoSection(index - 1, -1);
                }
              } else {
                lastEdgeReached = null;
                edgeScrollCount = 0;
              }
            };

            const onScroll = () => {
              const scrollTop = scrollable.scrollTop;
              const dir = scrollTop > lastScrollTop ? "down" : "up";
              lastScrollTop = scrollTop;

              handleEdgeScrollAttempt(dir);
            };

            const onTouchStart = (e: TouchEvent) => {
              touchStartY = e.touches[0].clientY;
            };

            const onTouchMove = (e: TouchEvent) => {
              const deltaY = e.touches[0].clientY - touchStartY;
              const dir = deltaY < 0 ? "down" : "up";

              handleEdgeScrollAttempt(dir);
            };

            const cleanup = () => {
              scrollable.removeEventListener("scroll", onScroll);
              scrollable.removeEventListener("touchstart", onTouchStart);
              scrollable.removeEventListener("touchmove", onTouchMove);
              disableScroll(nextSection);
              isScrollingInside = false;
              edgeScrollCount = 0;
              lastEdgeReached = null;
              createObserver();
            };

            scrollable.addEventListener("scroll", onScroll);
            scrollable.addEventListener("touchstart", onTouchStart, {
              passive: true,
            });
            scrollable.addEventListener("touchmove", onTouchMove, {
              passive: true,
            });
          } else {
            if (!observer) createObserver();
          }
        },
      });

      if (prevSection) {
        tl.to(images[currentIndex], { yPercent: -15 * dFactor }).set(
          prevSection,
          {
            autoAlpha: 0,
          }
        );
      }

      tl.fromTo(
        [outerWrappers[index], innerWrappers[index]],
        { yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) },
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
            stagger: { each: 0.02, from: "random" },
          },
          0.2
        );

      currentIndex = index;
    }

    gsap.set(outerWrappers, { yPercent: 100 });
    gsap.set(innerWrappers, { yPercent: -100 });

    createObserver();

    gotoSection(0, 1);

    return () => {
      observer?.kill();
    };
  }, []);

  const handleVideo = () => {
    nav("/allvideo");
  };
  return (
    <div className="relative h-screen text-white font-['Cormorant Garamond'] uppercase">
      <header className="fixed z-30 w-full flex justify-between items-center px-[5%] h-28 font-['Bebas Neue'] text-[clamp(0.66rem,2vw,1rem)] tracking-[0.5em]"></header>

      {/* Section 4 */}
      <section className="fixed top-0 left-0 w-full h-full opacity-0 fourth">
        <div className="outer w-full h-full overflow-hidden">
          <div className="inner w-full h-full overflow-hidden">
            <div
              className="bg-img absolute top-0 w-full h-full bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bg40})`,
              }}
            >
              {/* --------------------------- */}
              <div className="mt-7 py-16 px-4 ">
                <div>
                  <h2 className="section-heading text-base font-bold text-center text-[#dfdad6] mb-4">
                    Video Gallery
                  </h2>
                  <h2 className="p-1 text-xs font-bold text-center text-[#ebe4dd] mb-4">
                    Watch real stories of transformation and see our programs in
                    action through video testimonials and demonstrations
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-6xl mx-auto mt-3">
                  <div className="shadow rounded p-6">
                    <h3
                      onClick={handleVideo}
                      className="text-base md:text-lg font-medium text-white mb-3 hover:cursor-pointer hover:text-blue-950"
                    >
                      ▶ Featured Video
                    </h3>
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        onClick={handleVideo}
                        src={video}
                        alt="Dawit"
                        className="w-full h-40 hover:cursor-pointer "
                      />
                      <div></div>
                    </div>
                    <h3
                      onClick={handleVideo}
                      className="text-base text-white mb-2.5 hover:cursor-pointer hover:text-blue-950"
                    >
                      YeLijoch Mahiber: Empowering Youth, Uplifting Farmers
                    </h3>
                    <p
                      onClick={handleVideo}
                      className="italic text-xs hover:cursor-pointer hover:text-blue-950"
                    >
                      Our complete story - from vision to impact across
                      Ethiopia's rural communities. • 6:30
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
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bg43})`,
              }}
            >
              {/* --------------------------- */}
              <div className="mt-10 py-16 px-4">
                <div>
                  <div>
                    <h2 className="section-heading text-base  font-bold text-center text-[#dfdad6] mb-1">
                      Success Stories
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                  {/* --------------------------- */}

                  <div className="shadow rounded border p-1">
                    <div className="flex items-center space-x-4 mb-2">
                      <img
                        onClick={handleVideo}
                        src={man}
                        alt="Dawit"
                        className="w-full h-40 hover:cursor-pointer "
                      />
                      <div></div>
                    </div>
                    <h3 className="text-base text-amber-100 mb-1.5">
                      Dawit's Journey: From City to Farm
                    </h3>
                    <p className="italic text-xs">
                      Watch Dawit Mekonnen share his transformation story from
                      unemployed graduate to successful agricultural
                      entrepreneur. • 3:45
                    </p>
                  </div>

                  <div className="shadow rounded p-1 border">
                    <div className="flex items-center space-x-4 mb-2">
                      <img
                        onClick={handleVideo}
                        src={land}
                        alt="Almaz"
                        className="w-full h-40 hover:cursor-pointer "
                      />
                      <div></div>
                    </div>
                    <h3 className="text-base text-amber-100 mb-1.5">
                      Almaz's Success Story
                    </h3>
                    <p className="italic text-xs">
                      Farmer Almaz Tadesse explains how youth volunteers helped
                      increase her harvest by 30%. • 2:30
                    </p>
                  </div>
                </div>
              </div>
              {/* --------------------------- */}
            </div>
          </div>
        </div>
      </section>
      {/* Section 1 */}
      <section className="fixed top-0 left-0 w-full h-full opacity-0 fourth scrollable-section">
        <div className="outer w-full h-full overflow-hidden">
          <div className="inner w-full h-full overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              <div
                className="bg-img  w-full h-[90vh] bg-cover flex items-center justify-center bg-center overflow-y-auto"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bg41})`,
                }}
              >
                {/* --------------------------- */}
                <div className=" py-16 px-4 mt-[480px] md:mt-96 md:mb-[300px]">
                  <div>
                    <h2 className="section-heading text-base pt-20 font-bold text-center text-[#dfdad6] mb-3">
                      Videos
                    </h2>
                    <h2 className="text-xs font-bold text-center text-white mb-3 p-2">
                      Comprehensive programs designed to empower youth, support
                      farmers, and create sustainable rural-urban partnerships.
                    </h2>
                  </div>
                  <h3 className="text-base font-semibold text-[#dfdad6] mb-3 p-2">
                    Program Demonstrations
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Card 1  ---------- */}
                    {/* Card 1 */}
                    <div className="rounded-lg shadow-md overflow-hidden  text-white max-w-sm">
                      {/* Image with Play Button Overlay */}
                      <div className="relative">
                        <img
                          onClick={handleVideo}
                          src={card1}
                          alt="Hanna"
                          className="w-full h-40 object-cover p-2 hover:cursor-pointer"
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
                      <div className="p-2">
                        <h4
                          onClick={handleVideo}
                          className="font-bold text-amber-100 text-base mb-1 hover:text-blue-950 hover:cursor-pointer "
                        >
                          Field Placement Program
                        </h4>
                        <p
                          onClick={handleVideo}
                          className="text-xs text-amber-50 hover:text-blue-950  hover:cursor-pointer"
                        >
                          See how our flagship program works from start to
                          finish • 5:20
                        </p>
                      </div>
                    </div>

                    {/* Repeat for Card 2 and Card 3 */}
                    {/* Card 2 */}
                    <div className="rounded-lg shadow-md overflow-hidden  text-white max-w-sm">
                      {/* Image with Play Button Overlay */}
                      <div className="relative">
                        <img
                          onClick={handleVideo}
                          src={card2}
                          alt="Hanna"
                          className="w-full h-40 object-cover p-2 hover:cursor-pointer"
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
                      <div className="p-2">
                        <h4
                          onClick={handleVideo}
                          className="font-bold text-amber-100 text-base mb-1 hover:text-blue-950  hover:cursor-pointer "
                        >
                          Training & Certification
                        </h4>
                        <p
                          onClick={handleVideo}
                          className="text-xs text-amber-50 hover:text-blue-950  hover:cursor-pointer"
                        >
                          Comprehensive training that prepares youth for success
                          • 4:15
                        </p>
                      </div>
                    </div>

                    {/* Card 3 */}
                    <div className="rounded-lg shadow-md overflow-hidden  text-white max-w-sm">
                      {/* Image with Play Button Overlay */}
                      <div className="relative">
                        <img
                          onClick={handleVideo}
                          src={card3}
                          alt="Hanna"
                          className="w-full h-40 object-cover p-2 hover:cursor-pointer"
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
                      <div className="p-2">
                        <h4
                          onClick={handleVideo}
                          className="font-bold text-amber-100 text-base mb-1 hover:text-blue-950  hover:cursor-pointer "
                        >
                          Market Linkage Program
                        </h4>
                        <p
                          onClick={handleVideo}
                          className="text-xs text-amber-50 hover:text-blue-950  hover:cursor-pointer "
                        >
                          Connecting farmers directly to urban markets • 3:50
                        </p>
                      </div>
                    </div>

                    <div></div>

                    <button
                      onClick={handleVideo}
                      className="px-3 py-1.5 m-5  bg-yellow-600 hover:bg-yellow-900 text-white text-base font-semibold rounded-2xl shadow-md  hover:text-black transition"
                    >
                      View more Videos
                    </button>
                  </div>
                </div>
                {/* --------------------------- */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*---------------------------------------------------*/}
      <section className="fixed top-0 left-0 w-full h-full opacity-0 fourth scrollable-section">
        <div className="outer w-full h-full overflow-hidden">
          <div className="inner w-full h-full overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              <div
                className="bg-img  w-full h-[90vh] bg-cover flex items-center justify-center bg-center overflow-y-auto"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bg42})`,
                }}
              >
                {/* --------------------------- */}
                <div className=" mt-60 py-16 px-4 md:mt-96 md:mb-[300px]">
                  <div>
                    <div>
                      <h2 className="section-heading text-base  font-bold text-center text-[#dfdad6] mb-4">
                        Video Categories
                      </h2>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <div className=" shadow-md rounded-lg p-6 text-center border">
                      <div className="mb-4">
                        <div className="w-12 h-12 mx-auto rounded-full  flex items-center justify-center">
                          <i className="fas fa-users text-amber-50">
                            <Users />
                          </i>
                        </div>
                      </div>

                      <p className="font-semibold text-base text-orange-800">
                        Success Stories
                      </p>
                      <p className="text-xs text-amber-50 mt-1">
                        Personal testimonials from youth participants and
                        farmers sharing their transformation journeys.
                      </p>
                    </div>

                    {/* Income Increase */}
                    <div className=" shadow-md rounded-lg p-6 text-center border">
                      <div className="mb-4">
                        <div className="w-12 h-12 mx-auto rounded-full  flex items-center justify-center">
                          <i className="fas fa-chart-line text-amber-50">
                            <BookOpen />
                          </i>
                        </div>
                      </div>

                      <p className="font-semibold text-base text-orange-800">
                        Program Demos
                      </p>
                      <p className="text-xs text-amber-50 mt-1">
                        Detailed demonstrations of our programs showing how they
                        work and their impact on communities.
                      </p>
                    </div>

                    {/* Communities */}
                    <div className=" shadow-md rounded-lg p-6 text-center border">
                      <div className="mb-4">
                        <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center">
                          <i className="fas fa-map-marker-alt text-amber-50">
                            <ArrowUpRight />
                          </i>
                        </div>
                      </div>

                      <p className="font-semibold text-base text-orange-800">
                        Impact Reports
                      </p>
                      <p className="text-xs text-amber-50 mt-1">
                        Visual reports showcasing our achievements, statistics,
                        and the broader impact of our work.
                      </p>
                    </div>
                  </div>
                </div>
                {/* --------------------------- */}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/**********************************/}
    </div>
  );
};

export default Videos;
