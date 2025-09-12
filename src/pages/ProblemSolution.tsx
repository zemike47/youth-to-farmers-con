import { useEffect } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import SplitType from "split-type"; // Alternative to SplitText
import { TriangleAlert, CircleCheckBig } from "lucide-react";

import bg28 from "../assets/bg-24.jpg";
import bg27 from "../assets/bg-22.jpg";

import { useTranslation } from "react-i18next";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(Observer);
}

const ProblemSolution = () => {
  const { t } = useTranslation();

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

  return (
    <div className="relative h-screen text-white font-['Cormorant Garamond'] uppercase">
      <header className="fixed z-30 w-full flex justify-between items-center px-[5%] h-28 font-['Bebas Neue'] text-[clamp(0.66rem,2vw,1rem)] tracking-[0.5em]"></header>

      {/* Section 1 */}
      <section className="fixed top-0 left-0 w-full h-full opacity-0 first scrollable-section">
        <div className="outer w-full h-full overflow-hidden">
          <div className="inner w-full h-full overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              <div
                className="bg-img  w-full h-[90vh] bg-cover flex items-center justify-center bg-center overflow-y-auto"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bg28})`,
                }}
              >
                <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 mt-60 md:mt-[550px] md:mb-[380px]">
                  {/* Heading */}
                  <h2 className="section-heading text-lg sm:text-3xl font-semibold text-[#f8f4f4] mb-4 text-center">
                    Problem & Solution
                  </h2>

                  {/* Problem Statement */}
                  <div className="max-w-3xl mx-auto mb-8 text-center">
                    <div className="flex items-center justify-center gap-2 mb-2 text-[#fafafa]">
                      <TriangleAlert className="h-5 w-5" />
                      <span className="font-semibold text-sm md:text-base">
                        The Challenge We Face
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-amber-100">
                      Ethiopia faces interconnected challenges that limit the
                      potential of both urban youth and rural farmers.
                    </p>
                  </div>

                  {/* Problems Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto mb-12">
                    {[
                      {
                        title: "Rural Isolation",
                        text: "Farmers lack access to modern agricultural techniques, markets, and support systems, leading to low productivity and income.",
                      },
                      {
                        title: "Youth Unemployment",
                        text: "Urban youth face high unemployment rates and lack meaningful opportunities to contribute to society while earning income.",
                      },
                      {
                        title: "Urban-Rural Gap",
                        text: "Growing disconnect between urban and rural communities limits knowledge transfer and mutual support opportunities.",
                      },
                      {
                        title: "Limited Agricultural Support",
                        text: "Rural farmers have minimal access to extension services, modern farming techniques, and market linkages.",
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="border  p-4 text-left rounded-md shadow-sm"
                      >
                        <h3 className="font-semibold text-base md:text-lg text-white mb-1">
                          {item.title}
                        </h3>
                        <p className="text-xs md:text-base text-white">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="fixed top-0 left-0 w-full h-full opacity-0 second scrollable-section">
        <div className="outer w-full h-full overflow-hidden">
          <div className="inner w-full h-full overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              <div
                className="bg-img  w-full h-[90vh] bg-cover flex items-center justify-center bg-center overflow-y-auto"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bg27})`,
                }}
              >
                <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 mt-[500px] md:mt-[550px] md:mb-[380px]">
                  {/* Solution Section */}
                  <div className="max-w-3xl mx-auto mb-6 text-center">
                    <div className="flex items-center justify-center gap-2 text-green-700 mb-2">
                      <CircleCheckBig className="h-5 w-5" />
                      <h2 className="section-heading font-semibold text-base md:text-lg text-amber-100">
                        Our Comprehensive Solution
                      </h2>
                    </div>
                    <p className="text-xs md:text-sm text-amber-50">
                      YeLijoch Mahiber creates a sustainable ecosystem that
                      addresses these challenges through innovative
                      collaboration.
                    </p>
                  </div>

                  {/* Solution Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-6xl mx-auto">
                    {[
                      {
                        title: "Direct Field Placement",
                        text: "Place urban youth in rural communities for 3–6 months to provide hands-on agricultural support and learn practical skills.",
                      },
                      {
                        title: "Knowledge Transfer",
                        text: "Facilitate two-way learning where youth bring modern techniques and farmers share traditional wisdom.",
                      },
                      {
                        title: "Market Linkage",
                        text: "Connect farmers to urban markets through youth coordinators, improving access and fair pricing.",
                      },
                      {
                        title: "Sustainable Revenue Model",
                        text: "Generate income through facilitation fees, crop aggregation, and value-added services to ensure program sustainability and support.",
                      },
                      {
                        title: "Community Building",
                        text: "Create lasting connections between urban and rural communities, fostering mutual understanding and support.",
                      },
                      {
                        title: "Skills Development",
                        text: "Provide youth with practical agricultural skills, leadership experience, and entrepreneurial opportunities.",
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="border  p-4 text-left rounded-md shadow-sm"
                      >
                        <h3 className="font-semibold text-base md:text-lg mb-1">
                          {item.title}
                        </h3>
                        <p className="text-xs md:text-base text-blue-100">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProblemSolution;
