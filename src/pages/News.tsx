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

//import { useTranslation } from "react-i18next";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(Observer);
}

import { useNavigate } from "react-router-dom";
const News = () => {
  // const { t } = useTranslation();

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

  const handleNews = () => {
    nav("/allnews");
  };

  return (
    <div className="relative h-screen text-white font-['Cormorant Garamond'] uppercase">
      {/* Section 4 */}
      <section className="fixed top-0 left-0 w-full h-full opacity-0 fourth scrollable-section">
        <div className="outer w-full h-full overflow-hidden">
          <div className="inner w-full h-full overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              <div
                className="bg-img  w-full h-[90vh] bg-cover flex items-center justify-center bg-center overflow-y-auto"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bg25})`,
                }}
              >
                {/* --------------------------- */}
                <div className=" py-16 px-4 mt-[250px] md:mt-96 md:mb-[380px]">
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
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-6xl mx-auto mt-3">
                    <div className="shadow rounded p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <img
                          onClick={handleNews}
                          src={youthGroup}
                          alt="Dawit"
                          className="w-full h-60  hover:text-blue-950 hover:cursor-pointer"
                        />
                        <div></div>
                      </div>
                      <h3 className="text-base text-white mb-2.5">
                        500 Youth Successfully Placed in Rural Communities
                        Across Ethiopia
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
                          onClick={handleNews}
                          href="#"
                          className="text-green-600 font-medium hover:underline flex items-center hover:text-blue-950 hover:cursor-pointer"
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
        </div>
      </section>

      {/*************************************00  */}
      {/* Section 4 */}
      <section className="fixed top-0 left-0 w-full h-full opacity-0 fourth scrollable-section">
        <div className="outer w-full h-full overflow-hidden">
          <div className="inner w-full h-full overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              <div
                className="bg-img  w-full h-[90vh] bg-cover flex items-center justify-center bg-center overflow-y-auto"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bg24})`,
                }}
              >
                {/* --------------------------- */}
                <div className="py-16 px-4 mt-[790px] md:mt-96 md:mb-[380px]">
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
                          onClick={handleNews}
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
                        YeLijoch Mahiber signs strategic partnership agreement
                        to expand programs nationwide with government support.
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
                          onClick={handleNews}
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
                          onClick={handleNews}
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
              </div>
              {/* --------------------------- */}
            </div>
          </div>
        </div>
      </section>

      {/*************************************00  */}
      {/* Section 4 */}

      <section className="fixed top-0 left-0 w-full h-full opacity-0 fourth scrollable-section">
        <div className="outer w-full h-full overflow-hidden">
          <div className="inner w-full h-full overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              <div
                className="bg-img  w-full h-[90vh] bg-cover flex items-center justify-center bg-center overflow-y-auto"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bg26})`,
                }}
              >
                {/* --------------------------- */}
                <div className="py-16 px-4 mt-[800px] md:mt-96 md:mb-[380px]">
                  <div>
                    <div>
                      <h2 className="section-heading text-base  font-bold text-center text-[#dfdad6] mb-4">
                        .
                      </h2>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* --------------------------- */}

                    <div className="shadow rounded p-2 ">
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
                          onClick={handleNews}
                          href="#"
                          className="text-green-600 font-medium hover:underline flex items-center"
                        >
                          Read More →
                        </a>
                      </div>
                    </div>
                    {/************************************ */}

                    <div className="shadow rounded p-2 ">
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
                          onClick={handleNews}
                          href="#"
                          className="text-green-600 font-medium hover:underline flex items-center"
                        >
                          Read More →
                        </a>
                        <a
                          onClick={handleNews}
                          href="#"
                          className="text-green-500 border text-center font-medium hover:bg-white mt-1.5 flex justify-center"
                        >
                          load more videos
                        </a>
                      </div>
                    </div>
                    {/************************************ */}

                    <div className="shadow rounded p-2 ">
                      <div className="flex items-center space-x-4 mb-4">
                        <img
                          src={farmTech}
                          alt="Dawit"
                          className="w-full h-40 "
                        />
                        <div></div>
                      </div>
                      <h3 className="text-sm text-amber-100 mb-2.5">
                        Technology in Agriculture: Digital Tools for Rural
                        Farmers
                      </h3>
                      <p className="italic text-sm">
                        Exploring how mobile apps and digital platforms are
                        helping farmers access market information and weather
                        updates.
                      </p>
                      <div>
                        {" "}
                        <span className="text-sm text-amber-100">
                          Tech Team
                        </span>
                        <span className="text-sm text-amber-100">
                          📅 12/25/2023 • ⏱ 7 min read
                        </span>
                        <a
                          onClick={handleNews}
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
        </div>
      </section>
    </div>
  );
};

export default News;
