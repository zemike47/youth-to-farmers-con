import { FaUsers, FaBookOpen, FaArrowUp } from "react-icons/fa";

export default function Videos() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-center">
      {/* Page Title */}
      <h2 className="text-3xl font-semibold text-orange-800">Video Gallery</h2>
      <p className="text-gray-600 mt-1">
        Watch real stories of transformation and see our programs in action
        through video testimonials and demonstrations.
      </p>

      {/* Featured Video */}
      <section className="mt-12 text-left">
        <h3 className="text-lg font-medium text-orange-700 mb-4">
          ▶ Featured Video
        </h3>
        <div className="border rounded-lg overflow-hidden bg-gray-100">
          <div className="h-64 flex items-center justify-center text-4xl text-gray-400">
            ▶
          </div>
          <div className="p-4 text-sm text-gray-700">
            <p className="font-semibold text-orange-700">
              PolyCom Solution: Empowering Youth, Uplifting Farmers
            </p>
            <p className="text-gray-600">
              This mini-documentary shows how our impact-driven model supports
              local economies – 5:32
            </p>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="mt-12 text-left">
        <h3 className="text-lg font-medium text-orange-700 mb-4">
          ✨ Success Stories
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Video 1 */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1502764613149-7f1d229e2300"
              alt="David testimonial"
              className="w-full h-auto rounded-md"
            />
            <p className="mt-2 text-sm text-gray-700">
              <span className="font-semibold text-orange-700">
                David’s Journey From City to Farm
              </span>
              <br />
              Urban youth to agripreneur – community garden pilot leader – 2:16
            </p>
          </div>
          {/* Video 2 */}
          <div className="bg-gray-100 border rounded-md h-60 flex items-center justify-center relative">
            <div className="text-4xl text-gray-400">▶</div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t text-sm text-gray-700">
              <span className="font-semibold text-orange-700">
                Elena’s Success Story
              </span>
              <br />
              From a teacher to training leader through education transformation
              – 3:28
            </div>
          </div>
        </div>
      </section>

      {/* Program Demonstrations */}
      <section className="mt-12 text-left">
        <h3 className="text-lg font-medium text-orange-700 mb-4">
          📺 Program Demonstrations
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Demo 1 */}
          <div className="border rounded-lg overflow-hidden bg-white">
            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
              alt="Field demo"
              className="w-full h-40 object-cover"
            />
            <div className="p-4 text-sm text-gray-700">
              <p className="font-semibold text-orange-700">
                Field Project: Irrigation Program Overview
              </p>
              <p>See our drip irrigation pilot in action – 1:55</p>
            </div>
          </div>
          {/* Demo 2 */}
          <div className="border rounded-lg overflow-hidden bg-white">
            <div className="bg-gray-100 h-40 flex items-center justify-center text-3xl text-gray-400">
              ▶
            </div>
            <div className="p-4 text-sm text-gray-700">
              <p className="font-semibold text-orange-700">
                Training & Certification
              </p>
              <p>Skills-based training workshop recap – 3:04</p>
            </div>
          </div>
          {/* Demo 3 */}
          <div className="border rounded-lg overflow-hidden bg-white">
            <img
              src="https://images.unsplash.com/photo-1567306226416-28f0efdc88ce"
              alt="Market Linkage"
              className="w-full h-40 object-cover"
            />
            <div className="p-4 text-sm text-gray-700">
              <p className="font-semibold text-orange-700">
                Market Linkage in Action
              </p>
              <p>Connecting farmers directly to buyers – 2:22</p>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-yellow-50 py-10 px-4 rounded-md">
        <h2 className="text-2xl font-semibold text-center text-[#823e0f] mb-10">
          Video Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Card 1: Success Stories */}
          <div className="bg-white p-6 rounded-md shadow-sm text-center hover:shadow-md transition">
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FaUsers className="text-green-700 text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-[#823e0f]">
              Success Stories
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Personal testimonials from youth participants and farmers sharing
              their transformation journeys.
            </p>
          </div>

          {/* Card 2: Program Demos */}
          <div className="bg-white p-6 rounded-md shadow-sm text-center hover:shadow-md transition">
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FaBookOpen className="text-green-700 text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-[#823e0f]">
              Program Demos
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Detailed demonstrations of our programs showing how they work and
              their impact on communities.
            </p>
          </div>

          {/* Card 3: Impact Reports */}
          <div className="bg-white p-6 rounded-md shadow-sm text-center hover:shadow-md transition">
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FaArrowUp className="text-green-700 text-2xl" />
            </div>
            <h3 className="text-lg font-semibold text-[#823e0f]">
              Impact Reports
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              Visual reports showcasing our achievements, statistics, and the
              broader impact of our work.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
