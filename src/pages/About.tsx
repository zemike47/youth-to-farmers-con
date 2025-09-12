import { useEffect } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import SplitType from "split-type";

import bg22 from "../assets/bg-24.jpg";
import bg7 from "../assets/bg-7.jpg";

import bg10 from "../assets/bg-10.jpg";

//import { useTranslation } from "react-i18next";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Observer);
}

const About = () => {
  //const { t } = useTranslation();

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
    let observer: ReturnType<typeof Observer.create> | null = null;

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

  return (
    <div className="relative h-screen text-white font-['Cormorant Garamond'] uppercase">
      <header className="fixed z-30 w-full flex justify-between items-center px-[5%] h-28 font-['Bebas Neue'] text-[clamp(0.66rem,2vw,1rem)] tracking-[0.5em]">
        <div></div>
        <div></div>
      </header>

      {/* Section 1 */}
      <section className="fixed top-0 left-0 w-full h-full opacity-0 first">
        <div className="outer w-full h-full overflow-hidden">
          <div className="inner w-full h-full overflow-hidden">
            <div
              className="bg-img absolute top-0 w-full h-full bg-cover bg-center flex flex-col items-center justify-center"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bg22})`,
              }}
            >
              <div className="max-w-2xl text-center p-10">
                <h1 className="section-heading text-5xl font-bold mb-4 ">
                  About YeLijoch Mahiber
                </h1>
              </div>

              {/* Scroll Down Arrow */}
              <div className="scroll-down mt-10 flex flex-col items-center animate-bounce">
                <span className="text-white text-2xl">
                  {" "}
                  smoothly scroll UP ↑ or ↓ Down{" "}
                </span>
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
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bg7})`,
              }}
            >
              <div className="flex flex-col items-center justify-center flex-grow text-center">
                <h2 className="section-heading text-lg md:text-2xl text-white font-semibold mb-2">
                  Our Vision
                </h2>
                <p className="text-base md:text-lg text-[#cfcac4] p-2.5">
                  To create a thriving ecosystem where urban youth and farmers
                  collaborate toward sustainable communities, reduce poverty,
                  and drive agricultural innovation across Ethiopia. We envision
                  a future where every young person has meaningful work and
                  every farmer has the support they need to prosper.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 */}
      <section className="fixed top-0 left-0 w-full h-full opacity-0 third">
        <div className="outer w-full h-full overflow-hidden">
          <div className="inner w-full h-full overflow-hidden">
            <div
              className="bg-img absolute top-0 w-full h-full bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bg10})`,
              }}
            >
              <div className="flex flex-col items-center justify-center flex-grow text-center">
                <h2 className="section-heading text-lg text-white font-semibold mb-2">
                  Our Mission
                </h2>
                <p className="text-base md:text-lg text-[#cfcac4] p-2.5">
                  YeLijoch Mahiber connects urban youth with rural farmers
                  through structured field placements, providing practical
                  agricultural experience and economic empowerment. We build
                  bridges across regions and income lines. We facilitate
                  knowledge transfer, market access, and sustainable development
                  practices.
                </p>
              </div>
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
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bg7})`,
                }}
              >
                <div className="flex flex-col items-center justify-center flex-grow text-center  mt-[450px] mb-60 md:mt-96 md:mb-[380px]">
                  <h2 className=" section-heading text-base text-white font-semibold mb-2 ">
                    Executive Summary
                  </h2>
                  <p className="text-sm md:text-base text-[#cfcac4] p-2.5">
                    YeLijoch Mahiber addresses two critical challenges in
                    Ethiopia: youth unemployment in urban areas and the lack of
                    agricultural support in rural communities. Our innovative
                    model creates a bridge between these two worlds, empowering
                    mutual benefit and sustainable impact.
                    <br />
                    <br />
                    Through our structured 3-6 month field placement program,
                    urban youth gain practical experience in agriculture while
                    supporting smallholder farmers. This includes irrigation
                    automation, modern planting techniques, weeding/harvesting,
                    and market linkage facilitation.
                    <br />
                    <br />
                    Our approach is financially sustainable through multiple
                    revenue streams including food distribution hubs, crop sales
                    aggregation, farm productivity services, and job-placement
                    services. We aim to place 5,000 youth annually while
                    increasing income for farmers by 30% within our target
                    regions.
                    <br />
                    <br />
                    Starting with pilot programs in Oromia, Amhara, and SNNPR
                    regions, our plan is to scale across Ethiopia, creating a
                    replicable model for rural-urban collaboration that can be
                    adapted to other African contexts.
                  </p>
                </div>
              </div>
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
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bg10})`,
              }}
            >
              <h2 className="section-heading text-[clamp(1rem,5vw,5rem)] font-normal text-center tracking-[0.5em] text-gray-300 w-[90vw] max-w-[1200px]">
                YeLijoch Mahiber
              </h2>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
