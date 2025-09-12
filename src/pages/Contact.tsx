import { useEffect } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import SplitType from "split-type"; // Alternative to SplitText

import { Facebook, LinkedinIcon } from "lucide-react";
import { MessageCircle } from "lucide-react";

import { Phone } from "lucide-react";
import { Mail } from "lucide-react";
import { MapPin } from "lucide-react";

import bg12 from "../assets/bg-12.jpg";

//import { useTranslation } from "react-i18next";
import { useState } from "react";
import { sendContactMessage } from "../services/contactService";

import bg41 from "../assets/bg-24.jpg";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(Observer);
}

const Contact = () => {
  // const { t } = useTranslation();

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
          animating = false;

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

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await sendContactMessage(formData);

    if (res.ok) {
      setStatus({ type: "success", text: "Message sent successfully!" });
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        subject: "",
        message: "",
      });
    } else {
      setStatus({
        type: "error",
        text: res.data.error || "Failed to send message",
      });
    }
  };

  return (
    <div className="relative h-screen text-white font-['Cormorant Garamond'] uppercase">
      <header className="fixed z-30 w-full flex justify-between items-center px-[5%] h-28 font-['Bebas Neue'] text-[clamp(0.66rem,2vw,1rem)] tracking-[0.5em]"></header>

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
                <div className="py-16 px-4 mt-[850px] md:mt-[420px] md:mb-[380px] text-white">
                  <div>
                    <h2 className="section-heading text-base font-bold text-center">
                      Contact Info
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-6xl mx-auto mt-1.5">
                    <div className="shadow rounded p-6">
                      <div className="w-full flex flex-col md:flex-row gap-6 ">
                        {/* Get in Touch */}
                        <div className="flex-1 border rounded-md p-4">
                          <h2 className="font-semibold mb-2">Get in Touch</h2>
                          <div>
                            <p>
                              <MapPin />
                              <strong>Head Office</strong>
                              <br /> Bole Sub City, Addis Ababa
                            </p>
                            <p className="mt-2">
                              <Phone />
                              <strong>Phone</strong>
                              <br /> +251 118 123 065
                            </p>
                            <p className="mt-2">
                              <Mail />
                              <strong>Email</strong>
                              <br />
                              <span className="text-xs">
                                info@yekolotemarihub.org
                              </span>
                            </p>
                          </div>
                        </div>

                        {/* Follow Us */}
                        <div className="flex-1 border rounded-md p-4">
                          <h2 className="font-semibold mb-2">Follow Us</h2>
                          <p className="text-sm mb-2">
                            Stay connected with us on social media for the
                            latest updates, success stories, and opportunities.
                          </p>
                          <div className="flex gap-3 mt-2">
                            <Facebook />
                            <MessageCircle />
                            <LinkedinIcon />
                          </div>
                        </div>

                        {/* Office Hours */}
                        <div className="flex-1 border rounded-md p-4">
                          <h2 className="font-semibold mb-2">Office Hours</h2>
                          <p>
                            <strong>Monday - Friday:</strong>
                            <br /> 8:00 AM - 5:00 PM
                          </p>
                          <p className="mt-2">
                            <strong>Saturday:</strong>
                            <br /> 9:00 AM - 1:00 PM
                          </p>
                          <p className="mt-2">
                            <strong>Sunday:</strong>
                            <br /> Closed
                          </p>
                          <p className="mt-2 text-sm">
                            For urgent matters outside office hours, email us
                            and we'll respond as soon as possible.
                          </p>
                        </div>
                      </div>
                    </div>
                    {/******* */}
                    <div className="shadow rounded p-6">
                      {/* Find Us - Full Width */}
                      <div className="w-full border rounded-md p-6 text-center">
                        <h2 className="font-semibold mb-2">Find Us</h2>
                        <p className="font-semibold">
                          YeKotemari Mabrat Head Office
                        </p>
                        <p className="text-sm mt-1">
                          Located in the heart of Addis Ababa, our office is
                          easily accessible by public transportation.
                          Interactive map integration would be available in the
                          live version.
                        </p>
                      </div>
                    </div>
                    {/************ */}
                  </div>
                </div>
                {/* --------------------------- */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="fixed top-0 left-0 w-full h-full opacity-0 scrollable-section">
        <div className="outer w-full h-full overflow-hidden">
          <div className="inner w-full h-full overflow-hidden">
            <div className="w-full h-full flex items-center justify-center">
              <div
                className="bg-img  w-full h-[90vh] bg-cover flex items-center justify-center bg-center overflow-y-auto"
                style={{
                  backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bg12})`,
                }}
              >
                {/* --------------------------- */}
                <div className="py-16 px-4 mt-20 md:mt-96 md:mb-[300px]">
                  <div>
                    <h2 className="section-heading text-base font-bold text-center text-[#dfdad6] mb-1.5 mt-20">
                      Contact Us
                    </h2>
                    <h2 className="text-sm font-bold text-center text-[#ebe4dd] mb-4">
                      Get in touch with us to learn more about our programs,
                      partnerships, or how you can get involved.
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-6xl mx-auto mt-1.5">
                    <div className="shadow rounded p-2">
                      <div className="border rounded-md p-6 shadow-md mb-8">
                        <h2 className="font-semibold mb-4 ">
                          Send us a Message
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                          {/* First + Last Name */}
                          <div className="flex gap-4 flex-col sm:flex-row">
                            <div className="w-full sm:w-1/2">
                              <label
                                htmlFor="first_name"
                                className="block text-sm font-medium text-gray-700 mb-1"
                              >
                                First Name
                              </label>
                              <input
                                id="first_name"
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                placeholder="First Name"
                                className="w-full border px-3 py-2 rounded text-sm"
                                required
                              />
                            </div>
                            <div className="w-full sm:w-1/2">
                              <label
                                htmlFor="last_name"
                                className="block text-sm font-medium text-gray-700 mb-1"
                              >
                                Last Name
                              </label>
                              <input
                                id="last_name"
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                placeholder="Last Name"
                                className="w-full border px-3 py-2 rounded text-sm"
                                required
                              />
                            </div>
                          </div>

                          {/* Email */}
                          <div>
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Email Address
                            </label>
                            <input
                              id="email"
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="Email Address"
                              className="w-full border px-3 py-2 rounded text-sm"
                              required
                            />
                          </div>

                          {/* Phone */}
                          <div>
                            <label
                              htmlFor="phone_number"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Phone Number
                            </label>
                            <input
                              id="phone_number"
                              type="tel"
                              name="phone_number"
                              value={formData.phone_number}
                              onChange={handleChange}
                              placeholder="+251 9XX XXX XXX"
                              className="w-full border px-3 py-2 rounded text-sm"
                            />
                          </div>

                          {/* Subject */}
                          <div>
                            <label
                              htmlFor="subject"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Subject
                            </label>
                            <input
                              id="subject"
                              type="text"
                              name="subject"
                              value={formData.subject}
                              onChange={handleChange}
                              placeholder="Subject"
                              className="w-full border px-3 py-2 rounded text-sm"
                              required
                            />
                          </div>

                          {/* Message */}
                          <div>
                            <label
                              htmlFor="message"
                              className="block text-sm font-medium text-gray-700 mb-1"
                            >
                              Message
                            </label>
                            <textarea
                              id="message"
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              placeholder="Tell us more about your inquiry..."
                              className="w-full border px-3 py-2 rounded text-sm h-24"
                              required
                            ></textarea>
                          </div>

                          {/* Submit */}
                          <button
                            type="submit"
                            className="bg-green-700 text-white w-full py-2 rounded hover:bg-green-800"
                          >
                            Send Message
                          </button>

                          {/* Status Message */}
                          {status && (
                            <p
                              className={`text-sm mt-2 text-center ${
                                status.type === "success"
                                  ? "text-green-600"
                                  : "text-red-600"
                              }`}
                            >
                              {status.text}
                            </p>
                          )}
                        </form>
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

export default Contact;
