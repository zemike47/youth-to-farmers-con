// src/pages/ProgramPage.tsx
import { useEffect, useState } from "react";
import { getAllPrograms } from "/home/zemike/WORK/youth-to-farmers-connect/client/src/services/programService";
import ProgramCard from "/home/zemike/WORK/youth-to-farmers-connect/client/src/pages/programs/ProgramCard";
import bg from "/home/zemike/WORK/youth-to-farmers-connect/client/src/assets/whitebg.jpeg";

export default function ProgramPage() {
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPrograms().then((res) => {
      if (res.ok) setPrograms(res.data.data);
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
