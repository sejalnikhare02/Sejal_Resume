import React, { useState, useMemo } from "react";
import SectionTitle from "../../SectionTitle";
import { useSelector } from "react-redux";

const Experience = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const { portfolioData } = useSelector((state) => state.root);
  const { experience = [] } = portfolioData || {};

  // ✅ Sort latest first (based on updatedAt)
  const sortedExperience = useMemo(() => {
    return [...experience].sort((a, b) => {
      return new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0);
    });
  }, [experience]);

  return (
    <div>
      <SectionTitle title="Experiences" />

      <div className="flex py-10 gap-20 sm:flex-col">
        {/* ✅ LEFT TIMELINE */}
        <div className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-2/5 sm:flex-row sm:overflow-x-scroll sm:w-full">
          {sortedExperience.map((exp, index) => (
            <div
              key={exp._id}
              onClick={() => setSelectedItemIndex(index)}
              className="cursor-pointer"
            >
              <h1
                className={`text-xl px-5 whitespace-nowrap ${
                  selectedItemIndex === index
                    ? "text-tertiary border-tertiary border-l-4   -ml-[3px] sm:ml-0 bg-[#1a7f5a31] py-3"
                    : "text-white"
                }`}
              >
                {/* Company */}
                {exp.company}

                {/* Duration */}
                <span className="block text-sm text-gray-400">
                  {exp.period
                    ? exp.period
                    : exp.startYear
                      ? `${exp.startYear} - ${exp.endYear || "Present"}`
                      : ""}
                </span>
              </h1>
            </div>
          ))}
        </div>

        {/* ✅ RIGHT CONTENT */}
        <div className="flex flex-col gap-5 flex-1">
          <h1 className="text-secondary text-xl font-semibold">
            {sortedExperience[selectedItemIndex]?.company}
          </h1>

          <h1 className="text-tertiary text-lg">
            {sortedExperience[selectedItemIndex]?.title}
          </h1>

          {/* ✅ Description as list */}
          <ul className="list-disc pl-5 text-white space-y-2">
            {sortedExperience[selectedItemIndex]?.description?.map(
              (item, i) => (
                <li key={i}>{item}</li>
              ),
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Experience;
