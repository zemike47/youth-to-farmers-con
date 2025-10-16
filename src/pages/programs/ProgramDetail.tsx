// src/pages/ProgramDetail.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProgramById } from "../../services/programService";

interface Program {
  program_id: number | string;
  program_name: string;
  program_pic?: string | null;
  description: string;
  details?: string;
  benefits?: string;
  duration_value?: string | number;
  duration_unit?: "days" | "weeks" | "months" | "years";
}

export default function ProgramDetail() {
  const { id } = useParams<{ id: string }>();
  const [program, setProgram] = useState<Program | null>(null);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    if (!id) return;
    getProgramById(id).then((res) => {
      if (res.ok) setProgram(res.data.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="p-6 text-center">Loading program...</div>;
  if (!program) return <div className="p-6 text-center">Program not found</div>;

  return (
    <div className=" mx-auto p-8 bg-white dark:bg-gray-900 text-black dark:text-gray-100 rounded-2xl shadow-lg">
      {/* Header */}
      <h1 className="text-4xl font-extrabold leading-tight mb-2">
        {program.program_name}
      </h1>

      {/* Image */}
      {program.program_pic && (
        <div className="mt-6">
          <img
            src={`${"http://localhost:7000"}${program.program_pic}`}
            alt={program.program_name}
            className="w-full h-[400px] object-cover rounded-lg shadow-md"
          />
        </div>
      )}

      {/* Sections */}
      <div className="mt-8 space-y-8">
        {/* Description */}
        <section>
          <h2 className="text-2xl font-semibold mb-2">Overview</h2>
          <p className="text-lg leading-relaxed whitespace-pre-line">
            {program.description}
          </p>
        </section>

        {/* Details */}
        {program.details && (
          <section>
            <h2 className="text-2xl font-semibold mb-2">Details</h2>
            <p className="leading-relaxed whitespace-pre-line">
              {program.details}
            </p>
          </section>
        )}

        {/* Benefits */}
        {program.benefits && (
          <section>
            <h2 className="text-2xl font-semibold mb-2">Benefits</h2>
            <ul className="list-disc pl-6 space-y-2">
              {program.benefits.split("\n").map((benefit, idx) => (
                <li key={idx}>{benefit}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Duration */}
        {(program.duration_value || program.duration_unit) && (
          <section>
            <h2 className="text-2xl font-semibold mb-2">Duration</h2>
            <p>
              {program.duration_value} {program.duration_unit}
            </p>
          </section>
        )}
      </div>

      {/* Action buttons */}
      <div className="mt-10 flex space-x-4">
        <button
          onClick={() => nav("/allprograms")}
          className="px-5 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition"
        >
          ← Back to Programs
        </button>

        <button className="px-5 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition">
          Join
        </button>
      </div>
    </div>
  );
}
