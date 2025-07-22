import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import { MoveRight } from "lucide-react";
import man from "../assets/man.png";
import land from "../assets/land.png";

import gsap from "gsap";

export default function Home() {
  const imgRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const animateImage = () => {
      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1.2, duration: 1.5, ease: "power2.out" }
        );
      }
    };

    const animateText = () => {
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { y: -100, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.05, duration: 0.5, ease: "power2.out" }
        );
      }
    };

    setTimeout(() => {
      animateImage();
      animateText();
    }, 500);
  }, []);

  return (
    <div>
      <div>
        <motion.div className="h-[79vh] bg-gradient-to-br from-orange-800 to-emerald-900 flex justify-start items-start dark:text-white dark:bg-gray-950">
          <div className="h-[72vh] bg-gradient-to-br  from-orange-800 to-emerald-900  p-8 rounded-lg text-center max-w-6xl w-full mt-10 mx-auto dark:text-white dark:bg-gray-900">
            <motion.h1
              whileHover={{ scale: 1.05 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold font-garamond text-white dark:text-white mb-4"
            >
              YeLijoch Mahiber
            </motion.h1>
            <motion.p
              whileHover={{ scale: 1.05 }}
              className="mt-2 text-xs md:text-3xl lg:text-base font-bold font-garamond text-white dark:text-orange-400 mb-6"
            >
              Empowering Youth, Uplifting Farmers
            </motion.p>
            <motion.p
              whileHover={{ scale: 1.05 }}
              className="mt-2 text-xs md:text-3xl lg:text-base font-bold font-garamond text-white dark:text-orange-400 mb-6"
            >
              Bridging Urban Youth with Rural Farmers - A Sustainable Support
              and Learning Ecosystem
            </motion.p>
            <button className="px-6 py-3 m-5 bg-yellow-600 text-white text-lg font-semibold rounded-full shadow-md hover:bg-yellow-700 transition">
              Get Involved
            </button>
          </div>
        </motion.div>
      </div>

      {/* --------------------------- */}
      <div className="bg-[#f9f9e6] py-16 px-4">
        <h2 className="text-3xl font-bold text-center text-[#804000] mb-12">
          Our Three Core Goals
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white rounded-lg p-8 shadow-sm text-center border border-gray-200">
            <div className="flex justify-center mb-4">
              <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center">
                <span className="text-green-600 text-2xl">🌱</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-[#804000] mb-2">
              Support Rural Farmers
            </h3>
            <p className="text-sm text-[#804000]">
              Provide direct agricultural support, modern techniques, and market
              access to rural farming communities across Ethiopia.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg p-8 shadow-sm text-center border border-gray-200">
            <div className="flex justify-center mb-4">
              <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center">
                <span className="text-green-600 text-2xl">👥</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-[#804000] mb-2">
              Empower Youth
            </h3>
            <p className="text-sm text-[#804000]">
              Give urban youth purpose, practical skills, and meaningful work
              experience while contributing to rural development.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg p-8 shadow-sm text-center border border-gray-200">
            <div className="flex justify-center mb-4">
              <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center">
                <span className="text-green-600 text-2xl">$</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-[#804000] mb-2">
              Generate Income
            </h3>
            <p className="text-sm text-[#804000]">
              Create sustainable revenue through coordination services,
              value-added activities, and market facilitation.
            </p>
          </div>
        </div>
      </div>

      {/* --------------------------- */}

      {/* --------------------------- */}
      <div>
        <motion.div className="mt-10 bg-emerald-900 flex justify-start items-start dark:text-white dark:bg-gray-950">
          <div className="bg-emerald-900 p-8 rounded-lg shadow-lg text-center max-w-6xl w-full mt-10 mx-auto dark:text-white dark:bg-gray-900">
            <motion.h1
              whileHover={{ scale: 1.05 }}
              className="text-2xl md:text-3xl lg:text-3xl font-bold font-garamond text-white dark:text-white mb-4"
            >
              Ready to Make a Difference?
            </motion.h1>
            <motion.p
              whileHover={{ scale: 1.05 }}
              className="mt-2 text-2xl md:text-3xl lg:text-base font-bold font-garamond text-white dark:text-orange-400 mb-6"
            >
              Join the movement to empower a generation and support farmers
              across Ethiopia
            </motion.p>
            <button className="px-6 py-3 m-5 bg-yellow-600 text-white text-lg font-semibold rounded-sm shadow-md hover:bg-yellow-700 transition">
              Join the movement
            </button>
            <button className="px-6 py-3 m-5 bg-white text-emerald-700 text-lg font-semibold rounded-sm shadow-md hover:bg-yellow-700 transition">
              learn more
            </button>
          </div>
        </motion.div>
      </div>
      {/* --------------------------- */}

      {/* --------------------------- */}
      <div className="bg-[#f9f9e6] py-16 px-4">
        <div>
          <h2 className="text-3xl font-bold text-center text-[#804000] mb-12">
            Latest News & Stories
          </h2>
          <h2 className="text-lg font-bold text-center text-[#804000] mb-12">
            Stay updated with our impact and success stories
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
            <div className="flex justify-center mb-4">
              <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center">
                <span className="text-green-600 text-2xl">Milestone</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-[#804000] mb-2 text-left">
              500 Youth Successfully Placed
            </h3>
            <p className="text-sm text-[#804000] text-left mb-4">
              YeLijoch Mahiber reaches major milestone with 500 urban youth
              placed in rural communities.
            </p>
            <a
              href="#"
              className="text-green-600 inline-flex items-center hover:underline text-left"
            >
              Read more
              <MoveRight className="ml-1 w-4 h-4" />
            </a>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg p-8 shadow-sm text-center border border-gray-200">
            <div className="flex justify-center mb-4">
              <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center">
                <span className="text-green-600 text-2xl">Success Story</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-[#804000] mb-2">
              From City to Farm: Dawit's Story
            </h3>
            <p className="text-sm text-[#804000]">
              How a computer science graduate found his calling in rural
              agriculture.
            </p>
            <a
              href="#"
              className="text-green-600 inline-flex items-center hover:underline text-left"
            >
              Read more
              <MoveRight className="ml-1 w-4 h-4" />
            </a>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg p-8 shadow-sm text-center border border-gray-200">
            <div className="flex justify-center mb-4">
              <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center">
                <span className="text-green-600 text-2xl">Impact Report</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-[#804000] mb-2">
              30% Increase in Farmer Income
            </h3>
            <p className="text-sm text-[#804000]">
              Latest assessment shows significant income improvements for
              participating farmers.
            </p>
            <a
              href="#"
              className="text-green-600 inline-flex items-center hover:underline text-left"
            >
              Read more
              <MoveRight className="ml-1 w-4 h-4" />
            </a>
          </div>
          <div></div>

          <button className="px-6 py-3 m-5 bg-emerald-900 text-white text-lg font-semibold rounded-2xl shadow-md hover:bg-white  hover:text-black transition">
            View All News & Stories
          </button>
        </div>
      </div>
      {/* --------------------------- */}

      {/* --------------------------- */}
      <div className="bg-[#f8f8dc] py-16 px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-sm text-green-700 font-medium">
            ▷ See Our Impact in Action
          </h2>
          <p className="text-sm text-[#804000] mt-2">
            Watch real stories from our participants
          </p>
        </div>

        {/* Video Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white shadow border rounded overflow-hidden">
            <div className="relative">
              <img src={man} alt="Video thumbnail" className="w-full h-auto" />
              <button className="absolute inset-0 flex justify-center items-center">
                <div className="bg-green-700 text-white w-10 h-10 rounded-full flex items-center justify-center">
                  ▶
                </div>
              </button>
            </div>
            <div className="px-4 py-2">
              <h3 className="text-xs font-semibold text-gray-900">
                Dawit's Transformation
              </h3>
              <p className="text-[10px] text-[#804000]">
                From unemployed graduate to agricultural entrepreneur
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow border rounded overflow-hidden">
            <div className="relative">
              <img src={land} alt="Video thumbnail" className="w-full h-auto" />
              <button className="absolute inset-0 flex justify-center items-center">
                <div className="bg-green-700 text-white w-10 h-10 rounded-full flex items-center justify-center">
                  ▶
                </div>
              </button>
            </div>
            <div className="px-4 py-2">
              <h3 className="text-xs font-semibold text-gray-900">
                Field Placement Program
              </h3>
              <p className="text-[10px] text-[#804000]">
                See how our flagship programs create lasting change
              </p>
            </div>
          </div>
        </div>

        {/* Watch More Videos Button */}
        <div className="text-center mt-6">
          <button className="border border-gray-600 px-4 py-1 text-xs rounded hover:bg-gray-100">
            Watch More Videos
          </button>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-20 flex justify-center">
          <div className="bg-white border shadow-sm px-6 py-6 max-w-md w-full rounded text-center">
            <h3 className="text-[#804000] font-semibold mb-1">Stay Updated</h3>
            <p className="text-xs text-gray-700 mb-4">
              Subscribe to our newsletter for the latest updates, success
              stories, and opportunities to get involved.
            </p>
            <form className="flex flex-col md:flex-row items-center justify-center gap-2">
              <input
                type="email"
                placeholder="Enter your email address"
                className="border border-gray-300 px-3 py-1.5 rounded text-sm w-full md:w-auto"
              />
              <button className="bg-emerald-700 text-white px-4 py-1.5 text-sm rounded hover:bg-emerald-800">
                Subscribe
              </button>
            </form>
            <p className="text-[9px] text-gray-500 mt-2">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </div>

      {/* --------------------------- */}

      {/* --------------------------- */}
    </div>
  );
}
