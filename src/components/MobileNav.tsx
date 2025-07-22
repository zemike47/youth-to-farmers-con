import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { NavMenu } from "../types/types";

interface Props {
  NavMenus: NavMenu[];
}

export default function MobileNav({ NavMenus }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [clicked, setClicked] = useState<number | null>(null);
  const nav = useNavigate();

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    setClicked(null);
  };

  const subMenuDrawer = {
    enter: {
      height: "auto",
      overflow: "hidden",
    },
    exit: {
      height: 0,
      overflow: "hidden",
    },
  };

  const handleSubMenuClick = (submenuName: string) => {
    nav(`/Catagory/${submenuName}`);
    setIsOpen(false);
  };

  const handleMainMenuClick = (index: number) => {
    setClicked(clicked === index ? null : index);
  };

  return (
    <div>
      <button className="lg:hidden z-[999] relative" onClick={toggleDrawer}>
        {isOpen ? <X /> : <Menu />}
      </button>
      <motion.div
        className="fixed left-0 right-0 top-16 overflow-y-auto h-full bg-[#18181A] backdrop-blur text-white p-6 pb-20"
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
      >
        <ul>
          {NavMenus.map(({ name, submenu }, i) => {
            const isClicked = clicked === i;
            const hasSubMenu = submenu?.length;

            return (
              <li key={name}>
                <span
                  className="flex items-center justify-between p-4 hover:bg-white/5 rounded-md cursor-pointer relative"
                  onClick={() => handleMainMenuClick(i)}
                >
                  {name}
                  {hasSubMenu && (
                    <ChevronDown
                      className={`ml-auto ${isClicked && "rotate-180"}`}
                    />
                  )}
                </span>
                {hasSubMenu && (
                  <motion.ul
                    initial="exit"
                    animate={isClicked ? "enter" : "exit"}
                    variants={subMenuDrawer}
                    className="ml-5"
                  >
                    {submenu.map(({ name, icon: Icon }) => (
                      <li
                        key={name}
                        className="p-2 flex items-center hover:bg-white/5 rounded-md gap-x-2 cursor-pointer"
                        onClick={() => handleSubMenuClick(name)}
                      >
                        {Icon && <Icon size={17} />}
                        {name}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </li>
            );
          })}
        </ul>
      </motion.div>
    </div>
  );
}
