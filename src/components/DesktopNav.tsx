import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { NavMenu } from "../types"; // Adjust the import path as needed

interface Props {
  NavMenus: NavMenu;
}

export default function DesktopNav({ NavMenus }: Props) {
  const [isHover, setIsHover] = useState(false);
  const toggleHoverMenu = () => setIsHover(!isHover);

  const nav = useNavigate();

  const handleClick = (category: string) => () => {
    nav(`/Catagory/${category}`);
  };

  const subMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: { duration: 0.5 },
      display: "block",
    },
    exit: {
      opacity: 0,
      rotatex: -15,
      transition: { duration: 0.5 },
      transitionEnd: { display: "none" },
    },
  };

  const hasSubMenu = NavMenus?.submenu?.length;

  return (
    <motion.li
      className="group/link"
      onHoverStart={toggleHoverMenu}
      onHoverEnd={toggleHoverMenu}
      key={NavMenus.name}
    >
      <Link to={NavMenus.name}>
        <span className="flex items-center gap-1 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer px-3 py-1  rounded-xl ">
          {NavMenus.name}
          {hasSubMenu && (
            <ChevronDown className="mt-[0.6px] group-hover/link:rotate-180 duration-200" />
          )}
        </span>
      </Link>

      {hasSubMenu && (
        <motion.div
          className="sub-menu bg-white dark:bg-gray-950"
          initial="exit"
          animate={isHover ? "enter" : "exit"}
          variants={subMenuAnimate}
        >
          <div
            className={`grid gap-7 ${
              NavMenus.gridcols === 3
                ? "grid-cols-3"
                : NavMenus.gridcols === 2
                ? "grid-cols-2"
                : "grid-cols-1"
            } `}
          >
            {NavMenus.submenu?.map((submenu, i) => (
              <div key={i} className="relative cursor-pointer">
                {NavMenus.gridcols! > 1 && NavMenus?.subMenuHeading?.[i] && (
                  <p className="text-sm mb-4 text-slate-900">
                    {NavMenus.subMenuHeading[i]}
                  </p>
                )}
                <div className="flex items-center gap-x-4 group/menubox">
                  <div
                    className="bg-white/5 w-fit p-2 rounded-md group-hover/menubox:bg-blue-300 group-hover/menubox:text-gray-900 duration-300"
                    onClick={handleClick(submenu.name)}
                  >
                    {submenu.icon && <submenu.icon />}
                  </div>

                  <div>
                    <h6
                      className="font-garamond text-lg"
                      onClick={handleClick(submenu.name)}
                    >
                      {submenu.name}
                    </h6>
                    <p
                      className="text-sm font-inter text-gray-700"
                      onClick={handleClick(submenu.name)}
                    >
                      {submenu.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.li>
  );
}
