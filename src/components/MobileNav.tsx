import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { NavMenu } from "../types/types";

interface Props {
  NavMenus: NavMenu[];
}

export default function MobileNav({ NavMenus }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const nav = useNavigate();

  const toggleDrawer = () => setIsOpen(!isOpen);

  const handleNav = (name: string) => {
    nav(`/${name}`);
    setIsOpen(false);
  };

  return (
    <div>
      <button className="lg:hidden z-[999] relative" onClick={toggleDrawer}>
        {isOpen ? <X /> : <Menu />}
      </button>

      <motion.div
        className="fixed left-0 right-0 top-16 overflow-y-auto h-full bg-[#18181A] backdrop-blur text-white p-6 pb-20 z-[998]"
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
      >
        <ul className="space-y-4">
          {NavMenus.map(({ name, icon: Icon }) => (
            <li
              key={name}
              onClick={() => handleNav(name)}
              className="p-4 flex items-center gap-x-3 hover:bg-white/5 rounded-md cursor-pointer"
            >
              {Icon && <Icon size={18} />}
              {name}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
