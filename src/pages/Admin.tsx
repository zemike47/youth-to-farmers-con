import { FaRegFileAlt, FaUsers, FaChartLine, FaEnvelope } from "react-icons/fa";

export default function Admin() {
  return (
    <div className="max-w-screen-xl mx-auto px-6 py-10 text-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold text-[#6d4c41]">
            Admin Dashboard
          </h1>
          <p className="text-xs text-gray-500">
            Manage content and monitor website activity
          </p>
        </div>
        <div className="text-sm text-gray-700">
          Welcome back,{" "}
          <span className="font-semibold text-[#9c4221]">Admin User</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-3 mb-6 text-sm">
        {["Dashboard", "Articles", "Categories", "Users"].map((tab, i) => (
          <button
            key={i}
            className={`px-4 py-1 border rounded ${
              i === 0 ? "bg-gray-100 font-medium" : "hover:bg-gray-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="border rounded-md p-4 bg-white shadow-sm">
          <p className="text-gray-500">Total Articles</p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-2xl font-bold">24</span>
            <FaRegFileAlt className="text-gray-400 text-lg" />
          </div>
          <p className="text-xs text-green-600 mt-1">+3 this month</p>
        </div>
        <div className="border rounded-md p-4 bg-white shadow-sm">
          <p className="text-gray-500">Page Views</p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-2xl font-bold">12,543</span>
            <FaChartLine className="text-gray-400 text-lg" />
          </div>
          <p className="text-xs text-green-600 mt-1">+12% from last month</p>
        </div>
        <div className="border rounded-md p-4 bg-white shadow-sm">
          <p className="text-gray-500">Newsletter Subscribers</p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-2xl font-bold">1,247</span>
            <FaEnvelope className="text-gray-400 text-lg" />
          </div>
          <p className="text-xs text-green-600 mt-1">+105 this week</p>
        </div>
        <div className="border rounded-md p-4 bg-white shadow-sm">
          <p className="text-gray-500">Engagement Rate</p>
          <div className="flex justify-between items-center mt-2">
            <span className="text-2xl font-bold">68%</span>
            <FaChartLine className="text-green-500 text-lg" />
          </div>
          <p className="text-xs text-green-600 mt-1">+5% improvement</p>
        </div>
      </div>

      {/* Activity Panels */}
      <div className="grid md:grid-cols-2 gap-4 mb-10">
        {/* Recent Activity */}
        <div className="border rounded-md p-5 bg-white shadow-sm">
          <h2 className="font-semibold text-sm mb-4 text-[#6d4c41]">
            📝 Recent Activity
          </h2>
          <ul className="text-gray-700 space-y-3 text-sm">
            <li>
              <span className="text-green-600 font-medium">●</span> New article
              published — <strong>800 Youth Successfully Placed</strong>
              <br />
              <span className="text-xs text-gray-500">2 hours ago</span>
            </li>
            <li>
              <span className="text-green-600 font-medium">●</span> Article
              updated — <strong>From City to Farm: Dawit’s Story</strong>
              <br />
              <span className="text-xs text-gray-500">5 hours ago</span>
            </li>
            <li>
              <span className="text-green-600 font-medium">●</span> New category
              created — <strong>Partnership</strong>
              <br />
              <span className="text-xs text-gray-500">1 day ago</span>
            </li>
            <li>
              <span className="text-green-600 font-medium">●</span> Article
              draft saved — <strong>New Training Program Launch</strong>
              <br />
              <span className="text-xs text-gray-500">2 days ago</span>
            </li>
          </ul>
        </div>

        {/* Top Performing Articles */}
        <div className="border rounded-md p-5 bg-white shadow-sm">
          <h2 className="font-semibold text-sm mb-4 text-[#6d4c41]">
            ⭐ Top Performing Articles
          </h2>
          <ul className="space-y-3 text-sm">
            {[
              ["800 Youth Successfully Placed", "Mission", "2,341"],
              ["From City to Farm: Dawit’s Story", "Success Story", "1,892"],
              ["30% Increase in Farmer Income", "Impact Report", "1,054"],
              ["New Partnership with Ministry", "Partnership", "1,234"],
            ].map(([title, tag, views], i) => (
              <li key={i} className="flex justify-between">
                <div>
                  <p className="font-medium">{title}</p>
                  <p className="text-xs text-gray-500">{tag}</p>
                </div>
                <span className="text-green-600 font-semibold">
                  {views} views
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <button className="bg-gray-50 border rounded-md p-4 flex flex-col items-center hover:shadow">
          <FaRegFileAlt className="text-xl mb-1" />
          <span>New Article</span>
        </button>
        <button className="bg-yellow-50 border rounded-md p-4 flex flex-col items-center hover:shadow">
          <FaChartLine className="text-xl mb-1" />
          <span>New Category</span>
        </button>
        <button className="bg-blue-50 border rounded-md p-4 flex flex-col items-center hover:shadow">
          <FaEnvelope className="text-xl mb-1" />
          <span>Newsletter</span>
        </button>
        <button className="bg-purple-50 border rounded-md p-4 flex flex-col items-center hover:shadow">
          <FaUsers className="text-xl mb-1" />
          <span>User Management</span>
        </button>
      </div>
    </div>
  );
}
