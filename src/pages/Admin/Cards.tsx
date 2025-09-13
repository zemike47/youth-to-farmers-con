import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

//import bg from "/home/zemike/WORK/youth-to-farmers-connect/client/src/assets/bgLight2.jpg";

interface Entity {
  name: string;
  detail: string;
  image: string;
}

interface CardsProps {
  entities: Entity;
  index: number;
}

export default function Cards({ entities }: CardsProps) {
  const nav = useNavigate();

  const handleClick = () => {
    nav(`/admin/${entities.name}`);
  };

  return (
    <motion.div
      whileHover={{
        scale: 1.01,
        boxShadow: "0px 20px 40px brown",
        fontFamily: "'Anton', serif",
      }}
      className="
      group
      relative
      flex flex-col
      h-[28rem] w-[22rem]
      text-black
       dark:bg-gray-900
      rounded-2xl shadow-md
      overflow-hidden
      border border-gray-200 dark:border-gray-700
      transition-all duration-300 ease-in-out
      hover:scale-105 hover:shadow-2xl hover:border-indigo-500/50
      cursor-pointer
      bg-[#f8f4f4]
    "
      style={{
        fontFamily: "'Anton', serif",
        //   backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3)), url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      onClick={handleClick}
    >
      <div className="text-black border-2 rounded-xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition">
        <img
          src={entities.image}
          alt={entities.name}
          className="w-full h-60 object-cover rounded-lg shadow-md"
        />
      </div>

      <div className="flex flex-col ml-2.5 justify-between">
        <h3 className="text-3xl font-semibold  dark:text-orange-700 text-black">
          {entities.name}
        </h3>
        <p className="text-black text-lg mt-2 dark:text-orange-50">
          {entities.detail}
        </p>
      </div>
    </motion.div>
  );
}
