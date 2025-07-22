export default function Join() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 text-sm">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-[#6d4c41]">
          Join YeLijoch Mahiber
        </h1>
        <p className="text-gray-600 mt-1">
          Be part of the movement that's transforming lives across Ethiopia
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-8 space-x-4 text-xs">
        <button className="px-4 py-1 border rounded bg-gray-100 font-medium">
          For Youth
        </button>
        <button className="px-4 py-1 border rounded hover:bg-gray-100">
          For Partners
        </button>
        <button className="px-4 py-1 border rounded hover:bg-gray-100">
          For Funders
        </button>
      </div>

      {/* Form & Benefits */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Application Form */}
        <div className="flex-1 border rounded-md p-5 shadow-sm">
          <h2 className="font-semibold mb-4">Youth Application Form</h2>
          <form className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-1/2 border px-3 py-2 rounded"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-1/2 border px-3 py-2 rounded"
              />
            </div>
            <input
              type="email"
              placeholder="you@email.com"
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="tel"
              placeholder="+251 XXX XXX XXX"
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="number"
              placeholder="Age"
              className="w-full border px-3 py-2 rounded"
            />
            <select className="w-full border px-3 py-2 rounded text-gray-500">
              <option>Select education level</option>
              <option>High School</option>
              <option>College Graduate</option>
              <option>Vocational Training</option>
            </select>
            <input
              type="text"
              placeholder="Describe any agricultural work experience you have..."
              className="w-full border px-3 py-2 rounded"
            />
            <textarea
              placeholder="Why do you want to join?"
              className="w-full border px-3 py-2 rounded h-24"
            />

            {/* File Upload */}
            <div className="border-dashed border-2 border-gray-300 rounded p-4 text-center text-xs text-gray-500 bg-gray-50">
              <p className="font-medium">Click to upload or drag and drop</p>
              <p>PDF, DOCX (Max. 5MB)</p>
              <input type="file" className="hidden" />
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded text-sm"
            >
              Submit Application
            </button>
          </form>
        </div>

        {/* Program Benefits */}
        <div className="w-full md:w-1/3 border rounded-md p-5 shadow-sm bg-white">
          <h2 className="font-semibold mb-4">Program Benefits</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm mb-4">
            <li>Monthly stipend during placement</li>
            <li>Free accommodation when hosted by farmer</li>
            <li>Practical agricultural skill development</li>
            <li>Employment and entrepreneurial opportunities</li>
            <li>Certificate of Completion</li>
            <li>National network of youth-driven connections</li>
          </ul>

          <div className="bg-amber-100 text-gray-700 p-3 rounded text-xs">
            <strong>Frequently Asked Questions</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Q: How long is the program?</li>
              <li>A: Most run between 2 to 12 weeks.</li>
              <li>Q: Do I need farming experience?</li>
              <li>
                A: No. We train youth from all levels and provide training
                sessions beforehand.
              </li>
              <li>Q: Where will I be placed?</li>
              <li>
                A: Placements will be in cities, suburbs, and nearby regions
                based on needs and preferences.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
