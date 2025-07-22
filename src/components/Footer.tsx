import {
  Mail,
  MapPin,
  Phone,
  Facebook,
  MessageCircle,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#8B3E0D] text-white py-10 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
        {/* Left Section - Logo & Description */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-teal-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center">
              YM
            </div>
            <span className="font-semibold text-lg">YeLijoch Mahiber</span>
          </div>
          <p>
            Empowering Youth, Uplifting Farmers - Creating sustainable
            connections between urban youth and rural farmers across Ethiopia.
          </p>
          <div className="flex gap-4 mt-4 text-white">
            <Facebook size={18} />
            <MessageCircle size={18} />
            <Linkedin size={18} />
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>About Us</li>
            <li>Programs</li>
            <li>Impact</li>
            <li>News & Stories</li>
            <li>Join Us</li>
            <li>Videos</li>
          </ul>
        </div>

        {/* Programs */}
        <div>
          <h4 className="font-semibold mb-4">Programs</h4>
          <ul className="space-y-2">
            <li>Field Placement</li>
            <li>Farmer Support</li>
            <li>Market Linkage</li>
            <li>Training & Certification</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-1" />
              <span>Bole Sub-City, Addis Ababa, Ethiopia</span>
            </li>
            <li className="flex items-start gap-2">
              <Phone size={16} className="mt-1" />
              <span>+251 911 123 456</span>
            </li>
            <li className="flex items-start gap-2">
              <Mail size={16} className="mt-1" />
              <span>info@yelijochmahiber.org</span>
            </li>
          </ul>
        </div>
      </div>

      <hr className="my-8 border-t border-white/20" />

      <p className="text-center text-sm text-white">
        © 2025 YeLijoch Mahiber. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
