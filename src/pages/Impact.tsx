export default function Impact() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 text-center">
      {/* Header */}
      <h2 className="text-3xl font-semibold text-orange-800">Our Impact</h2>
      <p className="text-gray-600 mt-1">
        Measuring success through the lives we’ve touched and the communities
        we’ve strengthened.
      </p>

      {/* KPIs */}
      <section className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {[
          { label: "500+", title: "Youth Reached", icon: "👥" },
          { label: "20%+", title: "Income Increase", icon: "📈" },
          { label: "50+", title: "Communities Impacted", icon: "🌍" },
          { label: "99%", title: "Satisfaction Rate", icon: "✅" },
        ].map((item, idx) => (
          <div key={idx} className="border rounded-lg p-5 shadow-sm bg-white">
            <div className="text-3xl">{item.icon}</div>
            <h3 className="text-xl font-semibold mt-2">{item.label}</h3>
            <p className="text-gray-600">{item.title}</p>
          </div>
        ))}
      </section>

      {/* Video Testimonials */}
      <section className="mt-12 text-left">
        <h3 className="text-lg font-medium text-orange-700 mb-4">
          ▶ Video Testimonials
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First video */}
          <div>
            <img
              src="https://images.unsplash.com/photo-1502764613149-7f1d229e2300"
              alt="Person testimonial"
              className="w-full h-auto rounded-md"
            />
            <p className="mt-2 text-sm text-gray-700">
              <span className="font-semibold text-orange-700">
                David’s Testimonial Story
              </span>
              <br />
              From unemployed graduate to empowered entrepreneur – 2:08
            </p>
          </div>
          {/* Second video (placeholder) */}
          <div className="bg-gray-100 border rounded-md h-60 flex items-center justify-center relative">
            <div className="text-4xl text-gray-400">▶</div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t text-sm text-gray-700">
              <span className="font-semibold text-orange-700">
                Alicia’s Success Story
              </span>
              <br />
              Non-profit volunteer to Microbusiness founder – 3:45
            </div>
          </div>
        </div>
      </section>

      {/* Written Testimonials */}
      <section className="mt-12">
        <h3 className="text-lg font-medium text-orange-700 mb-4">
          Written Testimonials
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {[
            {
              name: "Elena Alvarez",
              text: "Mentorship from this program gave me the tools and courage to start my own design studio. I’m now financially independent.",
            },
            {
              name: "Daniel Kabila",
              text: "Through this initiative, I gained access to training that boosted my confidence and employability. Life-changing experience!",
            },
            {
              name: "Noura Malik",
              text: "I went from feeling lost after university to founding a women-led cooperative in my village. Forever grateful for the support.",
            },
          ].map((t, idx) => (
            <div key={idx} className="border rounded-lg p-4 bg-white shadow-sm">
              <p className="text-sm text-gray-600 italic">"{t.text}"</p>
              <p className="mt-2 text-right font-semibold text-orange-800">
                {t.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Impact Over Time */}
      <section className="mt-12 bg-yellow-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-yellow-900 mb-4">
          Program Impact Over Time
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
          <div>
            <h4 className="font-semibold text-gray-800">Year 1</h4>
            <p className="text-sm text-gray-600">
              200 youth placed
              <br />
              10% income growth
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Year 2</h4>
            <p className="text-sm text-gray-600">
              350 youth placed
              <br />
              17% income increase
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">Year 3</h4>
            <p className="text-sm text-gray-600">
              500 youth placed
              <br />
              20% avg. income growth
            </p>
          </div>
        </div>
      </section>

      {/* Long-term Vision */}
      <section className="mt-12 bg-green-900 text-white py-6 rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-3 text-center gap-6">
          <div>
            <h4 className="text-xl font-bold">5,000 Youth</h4>
            <p className="text-sm">Placed across the region by 2030</p>
          </div>
          <div>
            <h4 className="text-xl font-bold">100 Communities</h4>
            <p className="text-sm">Reached and economically transformed</p>
          </div>
          <div>
            <h4 className="text-xl font-bold">50% Income Boost</h4>
            <p className="text-sm">Average household income increase</p>
          </div>
        </div>
      </section>
    </div>
  );
}
