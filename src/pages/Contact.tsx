export default function Contact() {
  return (
    <div className="max-w-screen-lg mx-auto px-4 py-12 text-sm">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-2xl font-semibold text-[#6d4c41]">Contact Us</h1>
        <p className="text-gray-600 mt-1">
          Get in touch with us to learn more about our programs, partnerships,
          or how you can get involved.
        </p>
      </div>

      {/* Form + Contact Info */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Form */}
        <div className="flex-1 border rounded-md p-5">
          <h2 className="font-semibold mb-4">Send us a Message</h2>
          <form className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="w-1/2 border px-3 py-2 rounded text-sm"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-1/2 border px-3 py-2 rounded text-sm"
              />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border px-3 py-2 rounded text-sm"
            />
            <input
              type="tel"
              placeholder="+251 9XX XXX XXX"
              className="w-full border px-3 py-2 rounded text-sm"
            />
            <input
              type="text"
              placeholder="Subject"
              className="w-full border px-3 py-2 rounded text-sm"
            />
            <textarea
              placeholder="Tell us more about your inquiry..."
              className="w-full border px-3 py-2 rounded text-sm h-24"
            ></textarea>
            <button
              type="submit"
              className="bg-green-700 text-white w-full py-2 rounded hover:bg-green-800"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Info Section */}
        <div className="w-full md:w-[280px] flex flex-col gap-4">
          {/* Get in Touch */}
          <div className="border rounded-md p-4">
            <h2 className="font-semibold mb-2">Get in Touch</h2>
            <div className="text-gray-700">
              <p>
                <strong>Head Office</strong>
                <br /> Bole Sub City, Addis Ababa
              </p>
              <p className="mt-2">
                <strong>Phone</strong>
                <br /> +251 118 123 065
              </p>
              <p className="mt-2">
                <strong>Email</strong>
                <br /> info@yekolotemarihub.org
              </p>
            </div>
          </div>

          {/* Follow Us */}
          <div className="border rounded-md p-4">
            <h2 className="font-semibold mb-2">Follow Us</h2>
            <p className="text-gray-600 text-sm mb-2">
              Stay connected with us on social media for the latest updates,
              success stories, and opportunities.
            </p>
            <div className="flex gap-3 mt-2">
              <div className="w-6 h-6 bg-gray-300 rounded-full" />
              <div className="w-6 h-6 bg-gray-300 rounded-full" />
              <div className="w-6 h-6 bg-gray-300 rounded-full" />
            </div>
          </div>

          {/* Office Hours */}
          <div className="border rounded-md p-4">
            <h2 className="font-semibold mb-2">Office Hours</h2>
            <p>
              <strong>Monday - Friday:</strong>
              <br /> 8:00 AM - 5:00 PM
            </p>
            <p className="mt-2">
              <strong>Saturday:</strong>
              <br /> 9:00 AM - 1:00 PM
            </p>
            <p className="mt-2 text-red-600">
              <strong>Sunday:</strong>
              <br /> Closed
            </p>
            <p className="mt-2 text-gray-500 text-xs">
              For urgent matters outside office hours, email us and we’ll
              respond as soon as possible.
            </p>
          </div>
        </div>
      </div>

      {/* Find Us Section */}
      <div className="mt-10 border rounded-md bg-amber-50 p-6 text-center">
        <h2 className="font-semibold text-[#6d4c41] mb-2">Find Us</h2>
        <p className="text-green-700 font-semibold">
          YeKotemari Mabrat Head Office
        </p>
        <p className="text-sm text-gray-600 mt-1">
          Located in the heart of Addis Ababa, our office is easily accessible
          by public transportation. Interactive map integration would be
          available in the live version.
        </p>
      </div>
    </div>
  );
}
