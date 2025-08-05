import { useEffect } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import SplitType from "split-type"; // Alternative to SplitText
import { TriangleAlert, CircleCheckBig } from "lucide-react";

import bg28 from "../assets/bg-28.jpg";
import bg27 from "../assets/bg-27.jpg";

// Register GSAP plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(Observer);
}

const ProblemSolution = () => {
  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    if (isMobile) return;

    const sections = document.querySelectorAll("section");
    const images = document.querySelectorAll(".bg-img");
    const outerWrappers = document.querySelectorAll(".outer");
    const innerWrappers = document.querySelectorAll(".inner");
    const headings = document.querySelectorAll(".section-heading");

    const splitHeadings = Array.from(headings).map(
      (heading) =>
        new SplitType(heading as HTMLElement, {
          types: ["lines", "words", "chars"],
        })
    );

    let currentIndex = -1;
    let animating = false;
    const wrap = gsap.utils.wrap(0, sections.length);

    gsap.set(outerWrappers, { yPercent: 100 });
    gsap.set(innerWrappers, { yPercent: -100 });

    function gotoSection(index: number, direction: number): void {
      index = wrap(index);
      animating = true;
      const fromTop = direction === -1;
      const dFactor = fromTop ? -1 : 1;

      const tl = gsap.timeline({
        defaults: { duration: 1.25, ease: "power1.inOut" },
        onComplete: () => {
          animating = false;
        },
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
      onDown: () => !animating && gotoSection(currentIndex + 1, 1),
      onUp: () => !animating && gotoSection(currentIndex - 1, -1),

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
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bg28})`,
              }}
            >
              <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 mt-60">
                {/* Heading */}
                <h2 className="section-heading text-lg sm:text-3xl font-semibold text-[#8B0000] mb-4 text-center">
                  Problem & Solution
                </h2>

                {/* Problem Statement */}
                <div className="max-w-3xl mx-auto mb-8 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2 text-[#D14343]">
                    <TriangleAlert className="h-5 w-5" />
                    <span className="font-semibold text-sm">
                      The Challenge We Face
                    </span>
                  </div>
                  <p className="text-xs text-amber-100">
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
                      className="border border-red-300 p-4 text-left rounded-md shadow-sm"
                    >
                      <h3 className="font-semibold text-base text-amber-200 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-amber-50">{item.text}</p>
                    </div>
                  ))}
                </div>
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
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bg27})`,
              }}
            >
              <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 mt-[500px]">
                {/* Solution Section */}
                <div className="max-w-3xl mx-auto mb-6 text-center">
                  <div className="flex items-center justify-center gap-2 text-green-700 mb-2">
                    <CircleCheckBig className="h-5 w-5" />
                    <h2 className="section-heading font-semibold text-base text-amber-100">
                      Our Comprehensive Solution
                    </h2>
                  </div>
                  <p className="text-xs text-amber-50">
                    YeLijoch Mahiber creates a sustainable ecosystem that
                    addresses these challenges through innovative collaboration.
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
                      className="border border-green-200 p-4 text-left rounded-md shadow-sm"
                    >
                      <h3 className="font-semibold text-base mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs text-blue-100">{item.text}</p>
                    </div>
                  ))}
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
