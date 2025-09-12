import { useEffect } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import SplitType from "split-type"; // Alternative to SplitText

import bg18 from "../assets/bg-18.jpg";

import bg20 from "../assets/bg-20.jpg";

import bg22 from "../assets/bg-22.jpg";

//import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router-dom";
// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(Observer);
}

const Join = () => {
  const nav = useNavigate();

  const handleClickYouth = () => {
    nav("/joinYouth");
  };
  const handleClickFarmer = () => {
    nav("/joinFarmer");
  };
  const handleClickParentOrg = () => {
    nav("/joinParentOrg");
  };

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

  return (
    <div className="relative h-screen text-white font-['Cormorant Garamond'] uppercase">
      <header className="fixed z-30 w-full flex justify-between items-center px-[5%] h-28 font-['Bebas Neue'] text-[clamp(0.66rem,2vw,1rem)] tracking-[0.5em]"></header>

      <section className="fixed top-0 left-0 w-full h-full opacity-0 fourth scrollable-section">
        <div className="outer w-full h-full overflow-hidden">
          <div className="inner w-full h-full overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              <div
                className="bg-img  w-full h-[90vh] bg-cover flex items-center justify-center bg-center overflow-y-auto"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bg18})`,
                }}
              >
                {/* --------------------------- */}
                <div className="py-16 px-4 mt-[300px] md:mt-[400px] md:mb-[380px]">
                  <div>
                    <div>
                      <h2 className="section-heading text-base md:text-lg font-bold text-center text-[#dfdad6] mb-4">
                        Join YeLijoch Mahiber - Youth Program
                      </h2>
                      <h3 className="text-sm md:text-base font-bold mb-1.5 text-amber-200">
                        Youth Program
                      </h3>
                      <p className="text-xs md:text-sm">
                        Be part of the movement that's transforming lives across
                        Ethiopia
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* --------------------------- */}
                    <div className="shadow rounded p-6">
                      <div className="flex items-center space-x-4 mb-1">
                        <div></div>
                      </div>
                      <h3 className="text-sm md:text-base font-bold  text-amber-200">
                        Program Benefits
                      </h3>
                      <ul className="list-disc pl-5 text-xs md:text-sm">
                        <li>Monthly stipend during placement</li>
                        <li> Free accommodation with host families</li>
                        <li>Practical agricultural training</li>
                        <li> Leadership development opportunities</li>
                        <li>Certificate of completion</li>
                        <li>Network of rural and urban connections</li>
                      </ul>
                    </div>

                    <div className="shadow rounded p-6">
                      <div className="flex items-center space-x-4 mb-1">
                        <div></div>
                      </div>
                      <h3 className="text-base md:text-lg text-amber-200">
                        Frequently Asked Questions
                      </h3>

                      <p className="font-bold text-sm md:text-base text-amber-100">
                        Q: How long is the placement?
                      </p>
                      <p className=" text-xs md:text-sm text-amber-100">
                        A: Typically 3-6 months, depending on the program and
                        your availability.
                      </p>

                      <p className="font-bold text-sm md:text-base text-amber-100">
                        Q: Do I need farming experience?
                      </p>
                      <p className=" text-xs md:text-sm text-amber-100">
                        A: No prior experience required. We provide training
                        before placement.
                      </p>

                      <p className="font-bold text-sm md:text-base text-amber-100">
                        Q: Where will I be placed?
                      </p>
                      <p className=" text-xs md:text-sm text-amber-100">
                        A: Placements are in Oromia, Amhara, and SNNPR regions
                        based on needs and preferences.
                      </p>
                    </div>

                    <div className="shadow rounded p-6">
                      <div className="flex items-center space-x-4 mb-1">
                        <div></div>
                      </div>
                      <button
                        onClick={handleClickYouth}
                        className="px-3 py-1.5 m-5 bg-yellow-600 hover:bg-yellow-900 text-white text-sm font-semibold rounded-2xl shadow-md   hover:text-black transition"
                      >
                        Join Youth Program
                      </button>
                      {/* Scroll Down Arrow */}
                      <div className="scroll-down mt-6 flex flex-col items-center animate-bounce">
                        <span className="text-white text-2xl">
                          {" "}
                          scroll UP ↑ or ↓ Down{" "}
                        </span>
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

      <section className="fixed top-0 left-0 w-full h-full opacity-0 fourth scrollable-section">
        <div className="outer w-full h-full overflow-hidden">
          <div className="inner w-full h-full overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              <div
                className="bg-img  w-full h-[90vh] bg-cover flex items-center justify-center bg-center overflow-y-auto"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bg20})`,
                }}
              >
                {/* --------------------------- */}
                <div className="py-16 px-4 mt-[100px]  md:mb-[380px] md:mt-[380px]">
                  <div>
                    <div>
                      <h2 className="section-heading text-base md:text-lg font-bold  text-[#dfdad6] mb-2">
                        Join YeLijoch Mahiber - Farmers Program
                      </h2>
                      <h3 className="text-base md:text-lg font-bold mb-1.5 text-amber-200">
                        Farmers Program
                      </h3>
                      <p className="text-xs md:text-sm">
                        Be part of the movement that's transforming lives across
                        Ethiopia
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {/* --------------------------- */}
                    <div className="shadow rounded p-2">
                      <div className="flex items-center space-x-4 mb-4">
                        <div></div>
                      </div>
                      <h3 className="text-base md:text-lg font-bold  text-amber-200">
                        Benefits for Farmers
                      </h3>
                      <ul className="list-disc text-xs md:text-sm pl-5">
                        <li>Free agricultural labor and support</li>
                        <li>Access to modern farming techniques</li>
                        <li>Direct market access through youth coordinators</li>
                        <li> Technology transfer and training</li>
                        <li>Group sales coordination for better prices</li>
                        <li>Long-term mentorship and support</li>
                      </ul>
                    </div>

                    <div className="shadow rounded p-2">
                      <div className="flex items-center space-x-4 mb-4">
                        <div></div>
                      </div>
                      <h3 className="text-base md:text-lg font-bold  text-amber-200">
                        What We Provide
                      </h3>
                      <ul className="list-disc text-xs md:text-sm pl-5">
                        <li>Trained and motivated youth volunteers</li>
                        <li> Regular supervision and support</li>
                        <li>Access to agricultural inputs and tools</li>
                        <li> Market linkage services</li>
                        <li>Training on modern farming practices</li>
                      </ul>
                    </div>

                    <div className="shadow rounded p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div></div>
                      </div>
                      <button
                        onClick={handleClickFarmer}
                        className="px-3 py-1.5 m-5 bg-yellow-600 hover:bg-yellow-900 text-white text-sm font-semibold rounded-2xl shadow-md   hover:text-black transition"
                      >
                        Join Farmer Program
                      </button>
                      {/* Scroll Down Arrow */}
                      <div className="scroll-down mt-10 flex flex-col items-center animate-bounce">
                        <span className="text-white text-2xl">
                          {" "}
                          scroll UP ↑ or ↓ Down{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* --------------------------- */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/****** */}
      <section className="fixed top-0 left-0 w-full h-full opacity-0 fourth scrollable-section">
        <div className="outer w-full h-full overflow-hidden">
          <div className="inner w-full h-full overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              <div
                className="bg-img  w-full h-[90vh] bg-cover flex items-center justify-center bg-center overflow-y-auto"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bg22})`,
                }}
              >
                {/* --------------------------- */}
                <div className="py-16 px-4 mt-[350px] sm:mt-[600px] md:mb-[480px]">
                  <div>
                    <div>
                      <h2 className="section-heading text-base md:text-lg font-bold text-center text-[#dfdad6] mb-4">
                        Join YeLijoch Mahiber - Partner Organization
                      </h2>
                      <h3 className="text-base md:text-lg font-bold mb-1.5 text-amber-200">
                        Partner Organization
                      </h3>
                      <p className="text-xs md:text-sm">
                        Be part of the movement that's transforming lives across
                        Ethiopia
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-6xl mx-auto">
                    {/* --------------------------- */}
                    <div className="shadow rounded p-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <div></div>
                      </div>
                      <h3 className="text-sm md:text-base font-bold text-amber-200">
                        Funding Partners
                      </h3>
                      <h4 className="text-xs md:text-sm">
                        Support program expansion and sustainability
                      </h4>
                      <ul className="list-disc text-xs md:text-sm pl-5">
                        <li>Program funding and grants</li>
                        <li>Youth stipend support</li>
                        <li>Infrastructure development</li>
                      </ul>
                    </div>

                    <div className="shadow rounded p-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <div></div>
                      </div>
                      <h3 className="text-sm md:text-base font-bold text-amber-200">
                        Implementation Partners
                      </h3>
                      <h4 className="text-xs md:text-sm">
                        Collaborate on program delivery
                      </h4>
                      <ul className="list-disc text-xs md:text-sm pl-5">
                        <li>Joint program implementation</li>
                        <li>Resource sharing</li>
                        <li>Geographic expansion</li>
                      </ul>
                    </div>

                    <div className="shadow rounded p-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <div></div>
                      </div>
                      <h3 className="text-sm md:text-base font-bold text-amber-200">
                        Technical Partners
                      </h3>
                      <h4 className="text-xs md:text-sm">
                        Provide expertise and knowledge
                      </h4>
                      <ul className="list-disc text-xs md:text-sm pl-5">
                        <li>Agricultural technology transfer</li>
                        <li>Training and capacity building</li>
                        <li>Research and development</li>
                      </ul>
                    </div>

                    <div className="shadow rounded p-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <div></div>
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-amber-200">
                        Government Partners
                      </h3>
                      <h4 className="text-xs md:text-sm">
                        Policy support and scaling
                      </h4>
                      <ul className="list-disc text-xs md:text-sm pl-5">
                        <li>Policy alignment and support</li>
                        <li>National program integration</li>
                        <li>Regulatory facilitation</li>
                      </ul>
                    </div>

                    <div className="shadow rounded p-1">
                      <div className="flex items-center space-x-4 mb-2">
                        <div></div>
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-amber-200">
                        Partnership Benefits
                      </h3>
                      <ul className="list-disc text-xs md:text-sm pl-5">
                        <li>Direct impact on rural development</li>
                        <li> Youth empowerment and job creation </li>
                        <li> Sustainable development goals alignment</li>
                        <li> Measurable social impact</li>
                      </ul>
                    </div>

                    <div className="shadow rounded p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <div></div>
                      </div>
                      <button
                        onClick={handleClickParentOrg}
                        className="px-32 py-1.5 bg-yellow-600 hover:bg-yellow-900 text-white text-sm font-semibold rounded-2xl shadow-md hover:text-black transition whitespace-nowrap"
                      >
                        Join As Parent organization
                      </button>
                      {/* Scroll Down Arrow */}
                      <div className="scroll-down mt-10 flex flex-col items-center animate-bounce">
                        <span className="text-white text-2xl">
                          {" "}
                          scroll UP ↑ or ↓ Down{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* --------------------------- */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Join;
