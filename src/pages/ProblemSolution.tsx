import { TriangleAlert, CircleCheckBig } from "lucide-react";

export default function ProblemSolution() {
  return (
    <div className="bg-white py-16 px-4 sm:px-6 lg:px-8 text-center">
      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl font-semibold text-[#8B0000] mb-4">
        Problem & Solution
      </h2>

      {/* Problem Statement */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="flex items-center justify-center gap-2 mb-2 text-[#D14343]">
          <TriangleAlert className="h-5 w-5" />
          <span className="font-semibold">The Challenge We Face</span>
        </div>
        <p className="text-sm text-gray-700">
          Ethiopia faces interconnected challenges that limit the potential of
          both urban youth and rural farmers.
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
            className="border border-red-300  p-4 text-left rounded-md shadow-sm"
          >
            <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
            <p className="text-sm text-gray-700">{item.text}</p>
          </div>
        ))}
      </div>

      {/* Solution Section */}
      <div className="max-w-3xl mx-auto mb-6">
        <div className="flex items-center justify-center gap-2 text-green-700 mb-2">
          <CircleCheckBig className="h-5 w-5" />
          <span className="font-semibold">Our Comprehensive Solution</span>
        </div>
        <p className="text-sm text-gray-700">
          YeLijoch Mahiber creates a sustainable ecosystem that addresses these
          challenges through innovative collaboration.
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
            className="border border-green-200  p-4 text-left rounded-md shadow-sm"
          >
            <h3 className="font-semibold text-sm mb-1">{item.title}</h3>
            <p className="text-sm text-gray-700">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
