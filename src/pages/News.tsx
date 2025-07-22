export default function News() {
  return (
    <div className="bg-white px-4 md:px-10 py-10 max-w-screen-xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold text-[#6d4c41]">
          News & Stories
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Stay updated with the latest news, success stories, and impact reports
          from <strong>VEGItech</strong>
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-6 text-sm font-medium text-gray-700">
        {[
          "All",
          "Newsroom",
          "Impact Stories",
          "Programs Updates",
          "Partner Highlights",
        ].map((tab) => (
          <button
            key={tab}
            className="border rounded-full px-4 py-1 hover:bg-green-100 transition"
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Top Featured Article */}
      <div className="flex flex-col md:flex-row bg-gray-50 rounded-xl overflow-hidden shadow-md mb-10">
        <img
          src="https://via.placeholder.com/400x250"
          alt="Featured"
          className="w-full md:w-1/2 h-60 object-cover"
        />
        <div className="p-6 flex flex-col justify-between">
          <div>
            <span className="text-xs text-green-700 font-semibold">
              Impact Story
            </span>
            <h2 className="text-xl font-bold mt-2">
              800 Youth Successfully Placed in Rural Communities Across Ethiopia
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Our youth empowerment program has helped place over 800
              individuals into productive roles...
            </p>
          </div>
          <button className="text-green-600 text-sm mt-4">Read More →</button>
        </div>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="border rounded-lg overflow-hidden shadow-sm bg-white hover:shadow-lg transition"
          >
            <img
              src="https://via.placeholder.com/300x180"
              alt="Card"
              className="w-full h-44 object-cover"
            />
            <div className="p-4">
              <span className="text-xs text-purple-600 font-semibold">
                Newsroom
              </span>
              <h3 className="text-md font-semibold mt-1 mb-1">
                Sample Headline #{i + 1}
              </h3>
              <p className="text-sm text-gray-500">
                Short preview of the article or story goes here. Summary of
                about 2–3 lines.
              </p>
              <button className="text-green-500 text-sm mt-2">
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center mt-10">
        <button className="px-6 py-2 border rounded-full text-sm hover:bg-green-100">
          Load More Articles
        </button>
      </div>
    </div>
  );
}
