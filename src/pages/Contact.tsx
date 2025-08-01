import { useEffect } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import SplitType from "split-type"; // Alternative to SplitText
import bgImage from "../assets/background-image7.avif";

import { Facebook, LinkedinIcon } from "lucide-react";
import { MessageCircle } from "lucide-react";

import { Phone } from "lucide-react";
import { Mail } from "lucide-react";
import { MapPin } from "lucide-react";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(Observer);
}

const Contact = () => {
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
      onDown: () => !animating && gotoSection(currentIndex - 1, -1),
      onUp: () => !animating && gotoSection(currentIndex + 1, 1),
      tolerance: 10,
      preventDefault: true,
    });

    gotoSection(0, 1);
  }, []);

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
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bgImage})`,
              }}
            >
              {/* --------------------------- */}
              <div className=" py-16 px-4">
                <div>
                  <h2 className="section-heading text-3xl  font-bold text-center text-[#dfdad6] ">
                    Contact Info
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-6xl mx-auto mt-3">
                  <div className="shadow rounded p-6">
                    <div className="w-full flex flex-col md:flex-row gap-6 ">
                      {/* Get in Touch */}
                      <div className="flex-1 border rounded-md p-4">
                        <h2 className="font-semibold mb-2 text-yellow-900">
                          Get in Touch
                        </h2>
                        <div className="text-amber-50">
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
                            <br /> info@yekolotemarihub.org
                          </p>
                        </div>
                      </div>

                      {/* Follow Us */}
                      <div className="flex-1 border rounded-md p-4">
                        <h2 className="font-semibold mb-2 text-cyan-300">
                          Follow Us
                        </h2>
                        <p className="text-amber-50 text-sm mb-2">
                          Stay connected with us on social media for the latest
                          updates, success stories, and opportunities.
                        </p>
                        <div className="flex gap-3 mt-2">
                          <Facebook />
                          <MessageCircle />
                          <LinkedinIcon />
                        </div>
                      </div>

                      {/* Office Hours */}
                      <div className="flex-1 border rounded-md p-4">
                        <h2 className="font-semibold mb-2 text-green-400">
                          Office Hours
                        </h2>
                        <p>
                          <strong>Monday - Friday:</strong>
                          <br /> 8:00 AM - 5:00 PM
                        </p>
                        <p className="mt-2">
                          <strong>Saturday:</strong>
                          <br /> 9:00 AM - 1:00 PM
                        </p>
                        <p className="mt-2 text-red-600">
                          <strong>Sunday:</strong>
                          <br /> Closed
                        </p>
                        <p className="mt-2 text-amber-300 text-sm">
                          For urgent matters outside office hours, email us and
                          we'll respond as soon as possible.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/******* */}
                  <div className="shadow rounded p-6">
                    {/* Find Us - Full Width */}
                    <div className="w-full border rounded-md  p-6 text-center">
                      <h2 className="font-semibold text-[#d36540] mb-2">
                        Find Us
                      </h2>
                      <p className="text-green-700 font-semibold">
                        YeKotemari Mabrat Head Office
                      </p>
                      <p className="text-sm text-amber-50 mt-1">
                        Located in the heart of Addis Ababa, our office is
                        easily accessible by public transportation. Interactive
                        map integration would be available in the live version.
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
      </section>

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
              <div className="py-16 px-4 mt-16">
                <div>
                  <h2 className="section-heading text-3xl  font-bold text-center text-[#dfdad6] mb-4">
                    Contact Us
                  </h2>
                  <h2 className="text-lg font-bold text-center text-[#ebe4dd] mb-4">
                    Get in touch with us to learn more about our programs,
                    partnerships, or how you can get involved.
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-6xl mx-auto mt-3">
                  <div className="shadow rounded p-6">
                    <div className="border rounded-md p-6 shadow-md mb-8">
                      <h2 className="font-semibold mb-4">Send us a Message</h2>
                      <form className="space-y-4">
                        <div className="flex gap-4 flex-col sm:flex-row">
                          <input
                            type="text"
                            placeholder="First Name"
                            className="w-full sm:w-1/2 border px-3 py-2 rounded text-sm"
                          />
                          <input
                            type="text"
                            placeholder="Last Name"
                            className="w-full sm:w-1/2 border px-3 py-2 rounded text-sm"
                          />
                        </div>
                        <input
                          type="email"
                          placeholder="Email Address"
                          className="w-full border px-3 py-2 rounded text-sm"
                        />
                        <input
                          type="tel"
                          placeholder="+251 9XX XXX XXX"
                          className="w-full border px-3 py-2 rounded text-sm"
                        />
                        <input
                          type="text"
                          placeholder="Subject"
                          className="w-full border px-3 py-2 rounded text-sm"
                        />
                        <textarea
                          placeholder="Tell us more about your inquiry..."
                          className="w-full border px-3 py-2 rounded text-sm h-24"
                        ></textarea>
                        <button
                          type="submit"
                          className="bg-green-700 text-white w-full py-2 rounded hover:bg-green-800"
                        >
                          Send Message
                        </button>
                      </form>
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

export default Contact;
