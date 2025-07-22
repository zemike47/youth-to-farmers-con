import bean from "../assets/bean.jpg";

export default function About() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <h1 className="text-2xl sm:text-3xl font-semibold text-center text-[#8B0000] mb-6">
        About YeLijoch Mahiber
      </h1>

      <img
        src={bean}
        alt="Wheat grains"
        className="w-full max-w-xl object-cover rounded-md shadow mb-8"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full px-4">
        <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Our Vision</h2>
          <p className="text-sm text-gray-700">
            To create a thriving ecosystem where urban youth and farmers
            collaborate toward sustainable communities, reduce poverty, and
            drive agricultural innovation across Ethiopia. We envision a future
            where every young person has meaningful work and every farmer has
            the support they need to prosper.
          </p>
        </div>

        <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Our Mission</h2>
          <p className="text-sm text-gray-700">
            YeLijoch Mahiber connects urban youth with rural farmers through
            structured field placements, providing practical agricultural
            experience and economic empowerment. We build bridges across regions
            and income lines. We facilitate knowledge transfer, market access,
            and sustainable development practices.
          </p>
        </div>
      </div>

      <div className="mt-8 max-w-5xl w-full px-4">
        <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Executive Summary</h2>
          <p className="text-sm text-gray-700">
            YeLijoch Mahiber addresses two critical challenges in Ethiopia:
            youth unemployment in urban areas and the lack of agricultural
            support in rural communities. Our innovative model creates a bridge
            between these two worlds, empowering mutual benefit and sustainable
            impact.
            <br />
            <br />
            Through our structured 3–6 month field placement program, urban
            youth gain practical experience in agriculture while supporting
            smallholder farmers. This includes irrigation automation, modern
            planting techniques, weeding/harvesting, and market linkage
            facilitation.
            <br />
            <br />
            Our approach is financially sustainable through multiple revenue
            streams including food distribution hubs, crop sales aggregation,
            farm productivity services, and job-placement services. We aim to
            place 5,000 youth annually while increasing income for farmers by
            30% within our target regions.
            <br />
            <br />
            Starting with pilot programs in Oromia, Amhara, and SNNPR regions,
            our plan is to scale across Ethiopia, creating a replicable model
            for rural-urban collaboration that can be adapted to other African
            contexts.
          </p>
        </div>
      </div>
    </div>
  );
}
