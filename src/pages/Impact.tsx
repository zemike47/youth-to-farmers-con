import { useEffect } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import SplitType from "split-type"; // Alternative to SplitText

import bg13 from "../assets/bg-13.jpg";
import bg14 from "../assets/bg-14.jpg";
import bg15 from "../assets/bg-15.jpg";
import bg16 from "../assets/bg-16.jpg";
import bg17 from "../assets/bg-17.jpg";

import { Users } from "lucide-react";
import { ArrowUpRight } from "lucide-react";
import { MapPin } from "lucide-react";
import { MessageSquareHeart } from "lucide-react";

import man from "../assets/man.png";
import land from "../assets/land.png";

import { useTranslation } from "react-i18next";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(Observer);
}
import { useNavigate } from "react-router-dom";

const Impact = () => {
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
              const atBottom = scrollPercent >= 0.95;
              const atTop = scrollTop <= scrollHeight * 0.05;
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
      <section className="fixed top-0 left-0 w-full h-full opacity-0 fourth">
        <div className="outer w-full h-full overflow-hidden">
          <div className="inner w-full h-full overflow-hidden">
            <div
              className="bg-img absolute top-0 w-full h-full bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bg16})`,
              }}
            >
              {/* --------------------------- */}
              <div className="py-16 px-4 mt-26">
                <div>
                  <div>
                    <h2 className="section-heading text-base md:text-lg font-bold text-center text-[#dfdad6] ">
                      Program Impact Over Time
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-1 max-w-6xl mx-auto">
                  <div className=" shadow rounded p-6 ">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="font-semibold md:text-lg text-amber-100 text-2xl">
                          Year 1
                        </p>
                        <p className="text-sm md:text-base text-amber-50 mb-1">
                          150 youth placed
                        </p>
                        <p className="text-sm md:text-base text-amber-50 mb-1">
                          25 farming communities
                        </p>
                        <p className="text-sm md:text-base text-amber-50 mb-1">
                          15% average income increase
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="shadow rounded p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div>
                        <p className="font-semibold md:text-lg text-amber-100 text-2xl">
                          Year 2
                        </p>
                        <p className="text-sm md:text-base text-amber-50 mb-2.5">
                          350 youth placed
                        </p>
                        <p className="text-sm md:text-base text-amber-50 mb-2.5">
                          40 farming communities
                        </p>
                        <p className="text-sm md:text-base text-amber-50 mb-2.5">
                          18% average income increase
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="shadow rounded p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div>
                        <p className="font-semibold md:text-lg text-amber-100 text-2xl">
                          Year 3
                        </p>
                        <p className="text-sm md:text-base text-amber-50 mb-2.5">
                          500+ youth placed
                        </p>
                        <p className="text-sm md:text-base text-amber-50 mb-2.5">
                          50+ farming communities
                        </p>
                        <p className="text-sm md:text-base text-amber-50 mb-2.5">
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

      {/* Section 4 */}
      <section className="fixed top-0 left-0 w-full h-full opacity-0 fourth scrollable-section">
        <div className="outer w-full h-full overflow-hidden">
          <div className="inner w-full h-full overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              <div
                className="bg-img  w-full h-[90vh] bg-cover flex items-center justify-center bg-center overflow-y-auto"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bg14})`,
                }}
              >
                {/* --------------------------- */}
                <div className="py-16 px-4 mt-96 md:mt-96 md:mb-[300px] ">
                  <div>
                    <div>
                      <h2 className="section-heading text-base  font-bold text-center text-[#dfdad6] mb-4 ">
                        Written Testimonials
                      </h2>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <div className="border shadow rounded p-6 ">
                      <div className="flex items-center space-x-4 mb-4">
                        <img
                          src={bg13}
                          alt="Almaz"
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-semibold text-base">
                            Almaz Tadesse
                          </p>
                          <p className="text-xs text-amber-100">
                            Farmer, Oromia Region
                          </p>
                        </div>
                      </div>
                      <p className="italic text-sm">
                        "The young people who came to help us brought new ideas
                        and energy. My harvest increased by 30% last season, and
                        I learned about modern irrigation techniques that I
                        still use today."
                      </p>
                    </div>

                    <div className=" border shadow rounded p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <img
                          src={bg14}
                          alt="Dawit"
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-semibold">Dawit Mekonnen</p>
                          <p className="text-xs text-amber-100">
                            Youth Participant, Addis Ababa
                          </p>
                        </div>
                      </div>
                      <p className="italic text-sm">
                        "This program changed my life. I not only gained
                        practical skills in agriculture but also found my
                        purpose in helping rural communities. I now run my own
                        agricultural consulting business."
                      </p>
                    </div>

                    <div className=" border shadow rounded p-6">
                      <div className="flex items-center space-x-4 mb-10">
                        <img
                          src={bg15}
                          alt="Hanna"
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-semibold">Hanna Wolde</p>
                          <p className="text-xs text-amber-100">
                            Farmer, Amhara Region
                          </p>
                        </div>
                      </div>
                      <p className="italic text-sm">
                        "Working with the youth taught me about market prices
                        and how to sell directly to buyers in the city. I no
                        longer depend on middlemen and earn much more for my
                        crops."
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
      {/*************************************00  */}
      {/* Section 4 */}
      <section className="fixed top-0 left-0 w-full h-full opacity-0 fourth">
        <div className="outer w-full h-full overflow-hidden">
          <div className="inner w-full h-full overflow-hidden">
            <div
              className="bg-img absolute top-0 w-full h-full bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bg15})`,
              }}
            >
              {/* --------------------------- */}
              <div className="py-16 px-4 ">
                <div>
                  <div>
                    <h2 className="section-heading text-lg  font-bold text-center text-[#dfdad6] mb-1 ">
                      Video Testimonials
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-6xl mx-auto">
                  {/* --------------------------- */}

                  <div className="shadow rounded p-2">
                    <div className="flex items-center space-x-4 mb-1">
                      <img src={man} alt="Dawit" className="w-full h-40 " />
                      <div></div>
                    </div>
                    <h3 className="text-sm md:text-base text-amber-100">
                      Dawit's Transformation Story
                    </h3>
                    <p className="italic  md:text-sm text-xs">
                      From unemployed graduate to successful agricultural
                      entrepreneur • 3:45
                    </p>
                  </div>

                  <div className="shadow rounded p-2">
                    <div className="flex items-center space-x-4 mb-4">
                      <img src={land} alt="Almaz" className="w-full h-40 " />
                      <div></div>
                    </div>
                    <h3 className="text-sm  md:text-base  text-amber-100">
                      Almaz's Success Story
                    </h3>
                    <p className="italic  md:text-sm text-xs">
                      How youth volunteers helped increase harvest by 30% • 2:30
                    </p>
                  </div>

                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <button
                      onClick={handleVideo}
                      className="px-3 py-1.5 bg-yellow-600 text-white text-sm font-semibold rounded-full shadow-md hover:bg-yellow-700 transition"
                    >
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

      {/**************** */}
      <section className="fixed top-0 left-0 w-full h-full opacity-0 fourth">
        <div className="outer w-full h-full overflow-hidden">
          <div className="inner w-full h-full overflow-hidden">
            <div
              className="bg-img absolute top-0 w-full h-full bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bg17})`,
              }}
            >
              {/* --------------------------- */}
              <div className="py-16 px-4 mt-26 ">
                <div>
                  <div>
                    <h2 className="section-heading text-base  md:text-lg font-bold text-center text-[#dfdad6] mb-4">
                      Our Long-term Vision
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  <div className=" shadow rounded p-6 ">
                    <div className="flex items-center space-x-4 ">
                      <div>
                        <p className="font-semibold md:text-lg text-amber-100 text-base">
                          5,000 Youth
                        </p>
                        <p className="text-sm md:text-base text-amber-50 mb-2.5">
                          Placed across Ethiopia by 2030
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="shadow rounded p-6">
                    <div className="flex items-center space-x-4 ">
                      <div>
                        <p className="font-semibold md:text-lg text-amber-100 text-base">
                          500 Communities
                        </p>
                        <p className="text-sm md:text-base text-amber-50 ">
                          Rural communities transformed
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="shadow rounded p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div>
                        <p className="font-semibold md:text-lg text-amber-100 text-base">
                          50% Income Boost
                        </p>
                        <p className="text-sm md:text-base text-amber-50 mb-2.5">
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
