import React, { useState } from "react";
import SectionTitle from "../../SectionTitle";
import { useSelector } from "react-redux";

const Experience = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const { portfolioData } = useSelector((state) => state.root);
  const { experience } = portfolioData;

  return (
    <>
      <div>
        <SectionTitle title="Experiences" />
        <div className="flex py-10 gap-20 sm:flex-col">
          <div className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-4/5 sm:flex-row sm:overflow-x-scroll sm:w-full ">
            {experience?.map((exp, index) => (
              <div
                onClick={() => {
                  setSelectedItemIndex(index);
                }}
                className="cursor-pointer "
                key={exp._id}
              >
                <h1
                  className={`text-xl px-5
                    ${
                      selectedItemIndex === index
                        ? "text-tertiary border-tertiary border-l-4 -ml-[3px] bg-[#1a7f5a31] py-3 "
                        : "text-white"
                    }`}
                >
                  {exp.period}
                </h1>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-5">
            <h1 className="text-secondary text-xl">
              {experience?.[selectedItemIndex]?.company}
            </h1>

            <h1 className="text-tertiary text-xl">
              {experience?.[selectedItemIndex]?.title}
            </h1>

            <p className="text-white">
              {experience?.[selectedItemIndex]?.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Experience;
