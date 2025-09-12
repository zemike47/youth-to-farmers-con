import { useNavigate } from "react-router-dom";
import Cards from "./Cards";

import youth from "/home/zemike/WORK/youth-to-farmers-connect/client/src/assets/Youth.webp";
import farmers from "/home/zemike/WORK/youth-to-farmers-connect/client/src/assets/farmers.jpeg";
import parentOrg from "/home/zemike/WORK/youth-to-farmers-connect/client/src/assets/parentOrg.jpeg";
import videos from "/home/zemike/WORK/youth-to-farmers-connect/client/src/assets/videos.jpeg";
import programs from "/home/zemike/WORK/youth-to-farmers-connect/client/src/assets/programs.jpeg";
import News from "/home/zemike/WORK/youth-to-farmers-connect/client/src/assets/News.jpeg";
import subscribe from "/home/zemike/WORK/youth-to-farmers-connect/client/src/assets/subscribe.jpeg";
import contact from "/home/zemike/WORK/youth-to-farmers-connect/client/src/assets/contact.jpeg";

import bg from "/home/zemike/WORK/youth-to-farmers-connect/client/src/assets/bgLight3.jpeg";

const entities = [
  {
    name: "Youths",
    detail: "Manage youth profiles, skills, and participation in programs.",
    image: youth,
  },
  {
    name: "Farmers",
    detail:
      "Manage farmers, their farming needs, and opportunities for collaboration.",
    image: farmers,
  },
  {
    name: "Parent_organizations",
    detail: "Oversee partner organizations supporting youth and farmers.",
    image: parentOrg,
  },
  {
    name: "Videos",
    detail: "Upload, organize, and share educational and promotional videos.",
    image: videos,
  },
  {
    name: "Programs",
    detail:
      "Manage farming programs, youth initiatives, and community projects.",
    image: programs,
  },
  {
    name: "News",
    detail:
      "Publish and manage news updates, announcements, and success stories.",
    image: News,
  },
  {
    name: "Email_subscriptions",
    detail: "Handle user email subscriptions for newsletters and updates.",
    image: subscribe,
  },
  {
    name: "Contact_messages",
    detail: "Receive and manage messages sent through the contact form.",
    image: contact,
  },
];

export default function Admin() {
  const navigate = useNavigate();
  const nav = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  return (
    <div
      className="w-full px-6 py-10 text-sm min-h-screen"
      style={{
        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1
            className="text-2xl font-semibold text-[#fcf9f7]"
            style={{ fontFamily: "'Anton', serif" }}
          >
            Admin Dashboard
          </h1>
          <p className="text-lg mt-10 text-gray-100">
            Manage content and monitor website activity
          </p>
        </div>

        <div className="flex items-center gap-4 text-lg text-gray-100">
          <span>
            Welcome back,{" "}
            <span className="font-semibold text-[#e74e17]">Admin User</span>
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="ml-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-x-20 gap-y-10 max-w-6xl w-full">
        {entities.map((item, index) => (
          <Cards entities={item} key={index} index={index} />
        ))}
      </div>
    </div>
  );
}
