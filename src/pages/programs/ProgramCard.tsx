// src/components/ProgramCard.tsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface ProgramCardProps {
  program: {
    program_id: number | string;
    program_name: string;
    description: string;
    program_pic?: string | null;
  };
}

export default function ProgramCard({ program }: ProgramCardProps) {
  const nav = useNavigate();
  const API_URL = "http://localhost:7000";

  const handleClick = () => {
    nav(`/programsDetail/${program.program_id}`);
  };

  return (
    <motion.div
      className="
        group relative flex flex-col
        w-[22rem] h-[28rem]
        bg-[#dcdfdf] dark:bg-gray-900
        rounded-2xl shadow-md overflow-hidden
        border border-gray-200 dark:border-gray-700
        transition-all duration-300 ease-in-out
        hover:scale-105 hover:shadow-2xl hover:border-green-500/50
        cursor-pointer
      "
      onClick={handleClick}
    >
      {/* Program image */}
      <div className="h-56 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        {program.program_pic ? (
          <img
            src={`${API_URL}${program.program_pic}`}
            alt={program.program_name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-900 text-sm">
            No Image Available
          </div>
        )}
      </div>

      {/* Program content */}
      <div className="flex flex-col flex-1 p-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-green-400 line-clamp-2">
          {program.program_name}
        </h3>
        <p className="mt-2 text-gray-700 dark:text-gray-300 text-sm line-clamp-3">
          {program.description}
        </p>
        <span className="mt-auto text-green-600 text-sm font-semibold hover:underline">
          Learn more →
        </span>
      </div>
    </motion.div>
  );
}
