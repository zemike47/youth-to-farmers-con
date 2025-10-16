import { useEffect, useState } from "react";
import { getAllPrograms } from "../../services/programService";
import ProgramCard from "../../pages/programs/ProgramCard";

import type { Program } from "../../types/program";

export default function ProgramPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPrograms().then((res) => {
      if (res.ok) setPrograms(res.data.data as Program[]);
      setLoading(false);
    });
  }, []);

  if (loading)
    return <div className="p-6 text-center">Loading programs...</div>;

  return (
    <div
      style={{
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {programs.length > 0 ? (
        programs.map((program) => (
          <ProgramCard key={program.program_id} program={program} />
        ))
      ) : (
        <p className="col-span-full text-center text-gray-500">
          No programs available.
        </p>
      )}
    </div>
  );
}
