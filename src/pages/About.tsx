import { useEffect } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import SplitType from "split-type"; // Alternative to SplitText
import bgImage from "../assets/background-image3.avif";
import bgImage7 from "../assets/background-image7.avif";
import bgImage8 from "../assets/background-image8.avif";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(Observer);
}

const About = () => {
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
      <header className="fixed z-30 w-full flex justify-between items-center px-[5%] h-28 font-['Bebas Neue'] text-[clamp(0.66rem,2vw,1rem)] tracking-[0.5em]">
        <div></div>
        <div></div>
      </header>

      {/* Section 1 */}
      <section className="fixed top-0 left-0 w-full h-full opacity-0 first">
        <div className="outer w-full h-full overflow-hidden">
          <div className="inner w-full h-full overflow-hidden">
            <div
              className="bg-img absolute top-0 w-full h-full bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bgImage7})`,
              }}
            >
              <div className="max-w-2xl text-center p-10">
                <h1 className="section-heading text-5xl font-bold mb-4">
                  About YeLijoch Mahiber
                </h1>
              </div>

              {/* Scroll Down Arrow */}
              <div className="scroll-down mt-10 flex flex-col items-center animate-bounce">
                <span className="text-white text-sm"></span>
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
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bgImage8})`,
              }}
            >
              <div className="flex flex-col items-center justify-center flex-grow text-center">
                <h2 className="section-heading text-5xl text-orange-400 font-semibold mb-2">
                  Our Vision
                </h2>
                <p className="text-2xl text-white">
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
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bgImage})`,
              }}
            >
              <div className="flex flex-col items-center justify-center flex-grow text-center">
                <h2 className="section-heading text-5xl text-red-400 font-semibold mb-2">
                  Our Mission
                </h2>
                <p className="text-2xl ">
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
      <section className="fixed top-0 left-0 w-full h-full opacity-0 fourth">
        <div className="outer w-full h-full overflow-hidden">
          <div className="inner w-full h-full overflow-hidden">
            <div
              className="bg-img absolute top-0 w-full h-full bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bgImage})`,
              }}
            >
              <div className="flex flex-col items-center justify-center flex-grow text-center">
                <h2 className=" section-heading text-5xl text-cyan-400 font-semibold mb-2">
                  Executive Summary
                </h2>
                <p className="text-2xl">
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
      </section>

      {/* Section 5 */}
      <section className="fixed top-0 left-0 w-full h-full opacity-0 fifth">
        <div className="outer w-full h-full overflow-hidden">
          <div className="inner w-full h-full overflow-hidden">
            <div
              className="bg-img absolute top-0 w-full h-full bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bgImage})`,
              }}
            >
              <h2 className="section-heading text-[clamp(1rem,5vw,5rem)] font-normal text-center tracking-[0.5em] text-gray-300 w-[90vw] max-w-[1200px]">
                KEEP SCROLLING
              </h2>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
