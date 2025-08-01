import { useEffect } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import SplitType from "split-type"; // Alternative to SplitText
import bgImage from "../assets/background-image7.avif";

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
              <div className="py-16 px-4">
                <div>
                  <div>
                    <h2 className="section-heading text-3xl  font-bold text-center text-[#dfdad6] mb-4">
                      Join YeLijoch Mahiber - Youth Program
                    </h2>
                    <h3 className="text-lg font-bold mb-1.5 text-amber-200">
                      Youth Program
                    </h3>
                    <p>
                      {" "}
                      Be part of the movement that's transforming lives across
                      Ethiopia
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                  {/* --------------------------- */}

                  <div className="shadow rounded p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div></div>
                    </div>
                    <h3 className="text-lg font-bold  text-amber-200">
                      Program Benefits
                    </h3>
                    <ul className="list-disc pl-5">
                      <li>Monthly stipend during placement</li>
                      <li> Free accommodation with host families</li>
                      <li>Practical agricultural training</li>
                      <li> Leadership development opportunities</li>
                      <li>Certificate of completion</li>
                      <li>Network of rural and urban connections</li>
                    </ul>
                  </div>

                  <div className="shadow rounded p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div></div>
                    </div>
                    <h3 className="text-lg text-amber-200">
                      Frequently Asked Questions
                    </h3>
                    <p className="font-bold text-sm text-amber-500">
                      Q: How long is the placement?
                    </p>
                    <p className=" text-sm text-amber-100">
                      A: Typically 3-6 months, depending on the program and your
                      availability.
                    </p>
                    <p className="font-bold text-sm text-amber-500">
                      Q: Do I need farming experience?
                    </p>
                    <p className=" text-sm text-amber-100">
                      A: No prior experience required. We provide training
                      before placement.
                    </p>
                    <p className="font-bold text-sm text-amber-500">
                      Q: Where will I be placed?
                    </p>
                    <p className=" text-sm text-amber-100">
                      A: Placements are in Oromia, Amhara, and SNNPR regions
                      based on needs and preferences.
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
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bgImage})`,
              }}
            >
              {/* --------------------------- */}
              <div className="py-16 px-4 mt-16">
                <div>
                  <h2 className="section-heading text-3xl  font-bold text-center text-[#dfdad6] mb-4">
                    Join - Youth Program
                  </h2>
                  <h2 className="text-lg font-bold text-center text-[#ebe4dd] mb-4">
                    Get in touch with us to learn more about our programs,
                    partnerships, or how you can get involved.
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-6xl mx-auto mt-3">
                  <div className="shadow rounded p-6">
                    <div className="border rounded-md p-6 shadow-md mb-8">
                      <h2 className="font-semibold mb-4">Youth Program Form</h2>
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
              <div className="py-16 px-4">
                <div>
                  <div>
                    <h2 className="section-heading text-3xl  font-bold text-center text-[#dfdad6] mb-4">
                      Join YeLijoch Mahiber - Farmers Program
                    </h2>
                    <h3 className="text-lg font-bold mb-1.5 text-amber-200">
                      Farmers Program
                    </h3>
                    <p>
                      {" "}
                      Be part of the movement that's transforming lives across
                      Ethiopia
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                  {/* --------------------------- */}

                  <div className="shadow rounded p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div></div>
                    </div>
                    <h3 className="text-lg font-bold  text-amber-200">
                      Benefits for Farmers
                    </h3>
                    <ul className="list-disc pl-5">
                      <li>Free agricultural labor and support</li>
                      <li>Access to modern farming techniques</li>
                      <li>Direct market access through youth coordinators</li>
                      <li> Technology transfer and training</li>
                      <li>Group sales coordination for better prices</li>
                      <li>Long-term mentorship and support</li>
                    </ul>
                  </div>

                  <div className="shadow rounded p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div></div>
                    </div>
                    <h3 className="text-lg font-bold  text-amber-200">
                      What We Provide
                    </h3>
                    <ul className="list-disc pl-5">
                      <li>Trained and motivated youth volunteers</li>
                      <li> Regular supervision and support</li>
                      <li>Access to agricultural inputs and tools</li>
                      <li> Market linkage services</li>
                      <li>Training on modern farming practices</li>
                    </ul>
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
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bgImage})`,
              }}
            >
              {/* --------------------------- */}
              <div className="py-16 px-4 mt-16">
                <div>
                  <h2 className="section-heading text-3xl  font-bold text-center text-[#dfdad6] mb-4">
                    Join Farmers Program
                  </h2>
                  <h2 className="text-lg font-bold text-center text-[#ebe4dd] mb-4">
                    Get in touch with us to learn more about our programs,
                    partnerships, or how you can get involved.
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-6xl mx-auto mt-3">
                  <div className="shadow rounded p-6">
                    <div className="border rounded-md p-6 shadow-md mb-8">
                      <h2 className="font-semibold mb-4">
                        Farmers Program Form
                      </h2>
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

      {/****** */}
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
              <div className="py-16 px-4">
                <div>
                  <div>
                    <h2 className="section-heading text-3xl  font-bold text-center text-[#dfdad6] mb-4">
                      Join YeLijoch Mahiber - Partner Organization
                    </h2>
                    <h3 className="text-lg font-bold mb-1.5 text-amber-200">
                      Partner Organization
                    </h3>
                    <p>
                      {" "}
                      Be part of the movement that's transforming lives across
                      Ethiopia
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-6xl mx-auto">
                  {/* --------------------------- */}

                  <div className="shadow rounded p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div></div>
                    </div>
                    <h3 className="text-lg font-bold  text-amber-200">
                      Funding Partners
                    </h3>
                    <h4>Support program expansion and sustainability</h4>
                    <ul className="list-disc pl-5">
                      <li>Program funding and grants</li>
                      <li>Youth stipend support</li>
                      <li>Infrastructure development</li>
                    </ul>
                  </div>

                  <div className="shadow rounded p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div></div>
                    </div>
                    <h3 className="text-lg font-bold  text-amber-200">
                      Implementation Partners
                    </h3>
                    <h4>Collaborate on program delivery</h4>
                    <ul className="list-disc pl-5">
                      <li>Joint program implementation</li>
                      <li>Resource sharing</li>
                      <li>Geographic expansion</li>
                    </ul>
                  </div>

                  <div className="shadow rounded p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div></div>
                    </div>
                    <h3 className="text-lg font-bold  text-amber-200">
                      Technical Partners
                    </h3>
                    <h4>Provide expertise and knowledge</h4>
                    <ul className="list-disc pl-5">
                      <li>Agricultural technology transfer</li>
                      <li>Training and capacity building</li>
                      <li>Research and development</li>
                    </ul>
                  </div>

                  <div className="shadow rounded p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div></div>
                    </div>
                    <h3 className="text-lg font-bold  text-amber-200">
                      Government Partners
                    </h3>
                    <h4>Policy support and scaling</h4>
                    <ul className="list-disc pl-5">
                      <li>Policy alignment and support</li>
                      <li>National program integration</li>
                      <li>Regulatory facilitation</li>
                    </ul>
                  </div>

                  <div className="shadow rounded p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div></div>
                    </div>
                    <h3 className="text-lg font-bold  text-amber-200">
                      Partnership Benefits
                    </h3>
                    <ul className="list-disc pl-5">
                      <li>Direct impact on rural development</li>
                      <li> Youth empowerment and job creation </li>
                      <li> Sustainable development goals alignment</li>
                      <li> Measurable social impact</li>
                    </ul>
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
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bgImage})`,
              }}
            >
              {/* --------------------------- */}
              <div className="py-16 px-4 mt-16">
                <div>
                  <h2 className="section-heading text-3xl  font-bold text-center text-[#dfdad6] mb-4">
                    Join Farmers Program
                  </h2>
                  <h2 className="text-lg font-bold text-center text-[#ebe4dd] mb-4">
                    Get in touch with us to learn more about our programs,
                    partnerships, or how you can get involved.
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-6xl mx-auto mt-3">
                  <div className="shadow rounded p-6">
                    <div className="border rounded-md p-6 shadow-md mb-8">
                      <h2 className="font-semibold mb-4">
                        Partner Organization Form
                      </h2>
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
