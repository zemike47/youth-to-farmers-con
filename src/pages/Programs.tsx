export default function Programs() {
  const programs = [
    {
      title: "Field Placement Program",
      duration: "12 weeks",
      description:
        "On-the-job training to build technical and agronomic skills in rural communities.",
      benefits: [
        "Professional field exposure",
        "Real-time technical training",
        "Supervised mentorship",
        "Career placement assistance",
      ],
    },
    {
      title: "Farmer Support Services",
      duration: "Ongoing",
      description:
        "Providing local farmers with tools, training, and advisory services to boost productivity.",
      benefits: [
        "Access to inputs",
        "Ongoing advisory services",
        "Capacity building programs",
        "Monitoring & evaluation",
      ],
    },
    {
      title: "Market Linkage Program",
      duration: "12 weeks",
      description:
        "Empowering youth agripreneurs by facilitating go-to-market access.",
      benefits: [
        "Storage & transport",
        "Buyer connections",
        "Pricing assistance",
        "Logistics support",
      ],
    },
    {
      title: "Training & Certification",
      duration: "2-6 weeks",
      description:
        "Short-term intensive programs to build both soft and technical agricultural skills.",
      benefits: [
        "Practical training modules",
        "Recognized certifications",
        "Hands-on coaching",
        "Career-readiness sessions",
      ],
    },
  ];

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-12 text-sm">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-2xl font-semibold text-[#6d4c41]">Our Programs</h1>
        <p className="text-gray-600 mt-1">
          Comprehensive programs designed to empower youth, support farmers, and
          create sustainable market-driven partnerships.
        </p>
      </div>

      {/* Program Demonstrations */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-2">
          <p className="font-medium">▶ Program Demonstrations</p>
          <button className="text-xs underline text-gray-600 hover:text-green-700">
            View All Videos
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((_, i) => (
            <div
              key={i}
              className="relative bg-gray-100 h-36 rounded overflow-hidden shadow-sm"
            >
              <img
                src={`https://source.unsplash.com/400x200/?agriculture,${i}`}
                alt="demo"
                className="absolute inset-0 object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="bg-white p-2 rounded-full">
                  <svg
                    className="w-6 h-6 text-green-700"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M6 4l10 6-10 6V4z" />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-0 bg-white bg-opacity-90 text-xs p-2 w-full">
                <p className="font-semibold">Program Title</p>
                <p className="text-gray-600">Short description here...</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Program Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {programs.map((program, idx) => (
          <div key={idx} className="border rounded-md shadow-sm">
            <div className="h-40 bg-gray-200 rounded-t overflow-hidden">
              <img
                src={`https://source.unsplash.com/400x200/?farm,${idx}`}
                alt={program.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-4">
              <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                <span>{program.duration}</span>
                <span className="text-green-700 font-medium">Active</span>
              </div>
              <h3 className="font-semibold text-sm mb-2">{program.title}</h3>
              <p className="text-gray-600 mb-2 text-sm">
                {program.description}
              </p>
              <ul className="list-disc pl-5 text-gray-700 text-xs space-y-1">
                {program.benefits.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <button className="mt-4 w-full bg-green-700 hover:bg-green-800 text-white py-1.5 rounded text-sm">
                Join This Program
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-12 bg-amber-50 border rounded-md p-6 text-center">
        <h2 className="text-sm font-semibold text-[#6d4c41] mb-2">
          Ready to Get Started?
        </h2>
        <p className="text-gray-600 mb-4 text-xs">
          Join thousands of youth participating in the Yekolotemarihub
          community.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-green-700 hover:bg-green-800 text-white px-4 py-2 rounded text-xs">
            Apply Now
          </button>
          <button className="border border-gray-300 hover:border-gray-400 text-xs px-4 py-2 rounded">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}
