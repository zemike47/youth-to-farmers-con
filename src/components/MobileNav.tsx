import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MobileNav({ NavMenus }) {
  const [isOpen, setIsOpen] = useState(false);
  const [clicked, setClicked] = useState(null);
  const nav = useNavigate(); // To handle navigation

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    setClicked(null); // Reset clicked submenu state when drawer is closed
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

  // Handle click on submenu item and navigate
  const handleSubMenuClick = (submenuName) => {
    nav(`/Catagory/${submenuName}`); // Navigating to the submenu category
    setIsOpen(false); // Optionally close the drawer after navigating
  };

  // Handle click on a main menu item with a submenu
  const handleMainMenuClick = (index) => {
    setClicked(clicked === index ? null : index); // Toggle submenu visibility
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
                        onClick={() => handleSubMenuClick(name)} // Call the navigation function on click
                      >
                        <Icon size={17} />
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
