import { useEffect } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";

import SplitType from "split-type"; // Alternative to SplitText
import { MoveRight } from "lucide-react";

import bg1 from "../assets/bg-1.jpg";
import bg2 from "../assets/bg-2.jpg";
import bg3 from "../assets/bg-3.jpg";

import bg5 from "../assets/bg-5.jpg";

import { useTranslation } from "react-i18next";
import { useState } from "react";
import { subscribeEmail } from "../services/subscriptionService";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(Observer);
}
import { useNavigate } from "react-router-dom";

type Message = {
  type: "success" | "error";
  text: string;
} | null;

const Home = () => {
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

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<Message>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await subscribeEmail(email);

    if (result.ok) {
      setMessage({ type: "success", text: "✅ Subscription successful!" });
      setEmail("");
    } else {
      setMessage({
        type: "error",
        text: result.data.error || "Subscription failed.",
      });
    }
  };

  const handleJoin = () => {
    nav("/join");
  };

  const handleContact = () => {
    nav("/contact");
  };

  const handleNews = () => {
    nav("/allvideo");
  };

  return (
    <div className="relative h-screen text-white font-['Cormorant Garamond'] uppercase">
      {/* Section 1 */}

      <section className="fixed top-0 left-0 w-full h-full opacity-0 first ">
        <header className="fixed z-30 w-full flex justify-between items-center px-[5%] h-28 font-['Bebas Neue'] text-[clamp(0.66rem,2vw,1rem)] tracking-[0.5em]"></header>
        <div className="outer w-full h-full overflow-hidden">
          <div className="inner w-full h-full overflow-hidden">
            <div
              className="bg-img absolute top-0 w-full h-full bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bg1})`,
              }}
            >
              <div className="flex flex-col items-center justify-center text-center max-w-[90vw]">
                <h2 className="section-heading text-[clamp(0.8rem,3vw,2.5rem)] font-normal tracking-[0.3em] text-gray-300 max-w-[900px] mb-4">
                  {t("YeLijochMahiber")}
                </h2>
                <h2 className="section-heading text-[clamp(0.8rem,2.5vw,2rem)] font-normal tracking-[0.3em] text-gray-300 max-w-[900px] mb-4">
                  {t("EmpoweringYouth")}
                </h2>
                <h2 className="section-heading text-[clamp(0.7rem,2vw,1.5rem)] font-normal tracking-[0.2em] text-gray-300 max-w-[900px] mb-6">
                  {t("connect")}
                </h2>
                <button
                  onClick={handleJoin}
                  className="px-3 py-1.5 bg-yellow-600 text-white text-base font-semibold rounded-full shadow-md hover:bg-yellow-700 transition"
                >
                  Get Involved
                </button>

                {/* Scroll Down or Up Arrow */}
                <div className="scroll-down mt-10 flex flex-col items-center animate-bounce">
                  <span className="text-white text-2xl">
                    {" "}
                    smoothly scroll UP ↑ or ↓ Down{" "}
                  </span>
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
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bg2})`,
                }}
              >
                {/* --------------------------- */}
                <div className="py-16 px-4 mt-[380px] md:mt-96 md:mb-[280px]">
                  <h2 className="font-bold text-center md:text-2xl text-white mb-12">
                    Our Three Core Goals
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {/* Card 1 */}
                    <div className="rounded-lg p-8 shadow-sm text-center border border-gray-200">
                      <div className="flex justify-center mb-4">
                        <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center">
                          <span className="text-green-600 text-2xl">🌱</span>
                        </div>
                      </div>
                      <h3 className="text-base md:text-lg font-semibold text-white mb-2">
                        Support Rural Farmers
                      </h3>
                      <p className="text-xs md:text-sm text-white">
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
                      <h3 className="text-base md:text-lg font-semibold text-white mb-2">
                        Empower Youth
                      </h3>
                      <p className="text-xs md:text-sm text-white">
                        Give urban youth purpose, practical skills, and
                        meaningful work experience while contributing to rural
                        development.
                      </p>
                    </div>

                    {/* Card 3 */}
                    <div className="rounded-lg p-8 shadow-sm text-center border border-gray-200">
                      <div className="flex justify-center mb-4">
                        <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center">
                          <span className="text-green-600 text-2xl">$</span>
                        </div>
                      </div>
                      <h3 className="text-base md:text-lg font-semibold text-white mb-2">
                        Generate Income
                      </h3>
                      <p className="text-xs md:text-sm text-white">
                        Create sustainable revenue through coordination
                        services, value-added activities, and market
                        facilitation.
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

      <section className="fixed top-0 left-0 w-full h-full opacity-0 first">
        <header className="fixed z-30 w-full flex justify-between items-center px-[5%] h-28 font-['Bebas Neue'] text-[clamp(0.66rem,2vw,1rem)] tracking-[0.5em]"></header>
        <div className="outer w-full h-full overflow-hidden">
          <div className="inner w-full h-full overflow-hidden">
            <div
              className="bg-img absolute top-0 w-full h-full bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bg3})`,
              }}
            >
              <div className="flex flex-col items-center justify-center text-center max-w-[90vw] ">
                <h2 className="section-heading font-extrabold text-[clamp(0.8rem,3vw,2.5rem)] tracking-[0.3em] text-gray-300 max-w-[900px] mb-4">
                  Ready to Get Started?
                </h2>
                <h2 className="section-heading text-[clamp(0.8rem,2.5vw,2rem)] font-normal tracking-[0.3em] text-gray-300 max-w-[900px] mb-4">
                  Join thousands of youth and farmers who are already part of
                  the YeLijoch Mahiber community.
                </h2>
                <div className="gap-x-7">
                  <button
                    onClick={handleJoin}
                    className="px-3 py-1.5 bg-yellow-600 hover:bg-yellow-900 text-white text-sm font-semibold rounded-full shadow-md ransition mr-2.5"
                  >
                    Apply now
                  </button>
                  <button
                    onClick={handleContact}
                    className="px-3 py-1.5 bg-yellow-600 text-white text-sm font-semibold rounded-full shadow-md hover:bg-yellow-900 transition mr-2.5"
                  >
                    Contact US
                  </button>
                </div>
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
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bg5})`,
                }}
              >
                {/* --------------------------- */}
                <div className=" py-16 px-4 mt-[530px]  md:mt-96 md:mb-[380px]">
                  <div>
                    <h2 className="section-heading text-base pt-20 font-bold text-center text-[#f7f4f1] mb-4">
                      Latest News & Stories
                    </h2>
                    <h2 className="text-sm  text-center text-[#cfcac4] mb-5">
                      Stay updated with our impact and success stories
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {/* Card 1 */}
                    <div className=" rounded-lg p-6 shadow-sm border  border-gray-200">
                      <div className="flex justify-center mb-4">
                        <div className=" rounded-full w-12 h-12 flex items-center justify-center">
                          <span className="text-white font-bold text-base">
                            SUCCESS STORY
                          </span>
                        </div>
                      </div>
                      <h3 className="text-sm font-semibold text-[#cfcac4] mb-2 text-left">
                        FROM CITY TO FARM: DAWIT'S STORY
                      </h3>
                      <p className="text-xs font-extrabold text-[#faf9f9f3] text-left mb-4">
                        HOW A COMPUTER SCIENCE GRADUATE FOUND HIS CALLING IN
                        RURAL AGRICULTURE.
                      </p>
                      <a
                        href="#"
                        className="text-green-600  font-extrabold inline-flex items-center hover:underline text-left"
                      >
                        Read more
                        <MoveRight className="ml-1 w-4 h-4" />
                      </a>
                    </div>

                    {/* Card 2 */}
                    <div className=" rounded-lg p-6 shadow-sm border  border-gray-200">
                      <div className="flex justify-center mb-4">
                        <div className=" rounded-full w-12 h-12 flex items-center justify-center">
                          <span className="text-white font-bold text-base">
                            IMPACT REPORT
                          </span>
                        </div>
                      </div>
                      <h3 className="text-sm font-semibold text-[#cfcac4] mb-2 text-left">
                        30% INCREASE IN FARMER INCOME
                      </h3>
                      <p className="text-xs font-extrabold text-[#faf9f9f3] text-left mb-4">
                        LATEST ASSESSMENT SHOWS SIGNIFICANT INCOME IMPROVEMENTS
                        FOR PARTICIPATING FARMERS.
                      </p>
                      <a
                        href="#"
                        className="text-green-600  font-extrabold inline-flex items-center hover:underline text-left"
                      >
                        Read more
                        <MoveRight className="ml-1 w-4 h-4" />
                      </a>
                    </div>

                    {/* Card 3 */}
                    <div className=" rounded-lg p-6 shadow-sm border  border-gray-200">
                      <div className="flex justify-center mb-4">
                        <div className=" rounded-full w-12 h-12 flex items-center justify-center">
                          <span className="text-white font-bold text-base">
                            Milestone
                          </span>
                        </div>
                      </div>
                      <h3 className="text-sm font-semibold text-[#cfcac4] mb-2 text-left">
                        500 Youth Successfully Placed
                      </h3>
                      <p className="text-xs font-extrabold text-[#faf9f9f3] text-left mb-4">
                        YeLijoch Mahiber reaches major milestone with 500 urban
                        youth placed in rural communities.
                      </p>
                      <a
                        href="#"
                        className="text-green-600  font-extrabold inline-flex items-center hover:underline text-left"
                      >
                        Read more
                        <MoveRight className="ml-1 w-4 h-4" />
                      </a>
                    </div>
                    <div></div>

                    <button
                      onClick={handleNews}
                      className="px-3 py-1.5 m-5 bg-yellow-600 hover:bg-yellow-900 text-white text-sm font-semibold rounded-2xl shadow-md   hover:text-black transition"
                    >
                      View All Video
                    </button>
                  </div>
                </div>
                {/* --------------------------- */}
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
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bg5})`,
              }}
            >
              {/* --------------------------- */}
              <div className="py-16 px-4 mt-12">
                <div>
                  <h2 className="section-heading text-base  font-bold text-center text-[#dfdad6] mb-1">
                    Contact Us
                  </h2>
                  <h2 className="text-sm  text-center text-[#ebe4dd] mb-1">
                    Get in touch with us to learn more about our programs,
                    partnerships, or how you can get involved.
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-6xl mx-auto mt-3">
                  <div className="shadow rounded p-6">
                    <div className="border rounded-md p-6 shadow-md mb-8">
                      {/* Title */}
                      <h2 className="text-base font-bol text-white mb-3">
                        Stay Updated
                      </h2>

                      {/* Description */}
                      <p className="text-white text-sm mb-6">
                        Subscribe to our newsletter for the latest updates,
                        success stories, and opportunities to get involved.
                      </p>

                      {/* Form with logic */}
                      <form
                        onSubmit={handleSubmit}
                        className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4"
                      >
                        <input
                          type="email"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="px-4 py-2 border text-xs rounded-md focus:outline-none focus:ring focus:ring-amber-300 w-full sm:w-auto"
                        />
                        <button
                          type="submit"
                          className="bg-green-700 text-white px-3 py-1.5 rounded-md hover:bg-green-800 transition"
                        >
                          Subscribe
                        </button>
                      </form>

                      {/* Feedback message */}
                      {message && (
                        <p
                          className={`text-xs flex justify-center ${
                            message.type === "success"
                              ? "text-green-400"
                              : "text-red-400"
                          }`}
                        >
                          {message.text}
                        </p>
                      )}

                      {/* Disclaimer */}
                      <p className="text-xs flex justify-center text-gray-400 mt-2">
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
              className="bg-img absolute top-0 w-full h-full bg-cover bg-center flex flex-col items-center justify-center"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bg1})`,
              }}
            >
              <h2 className="section-heading text-[clamp(1rem,5vw,5rem)] font-normal text-center tracking-[0.5em] text-gray-300 w-[90vw] max-w-[1200px]">
                YeLijoch Mahiber
              </h2>

              {/* Scroll Down or Up Arrow */}
              <div className="scroll-down mt-10 flex flex-col items-center animate-bounce">
                <span className="text-white text-2xl">
                  scroll UP ↑ or ↓ Down
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
