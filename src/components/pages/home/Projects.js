import { useState } from "react";
import SectionTitle from "../../SectionTitle";
import { projects } from "../../../staticResources/Projects";

const Projects = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  return (
    <>
      <div>
        <SectionTitle title="Projects" />
        <div className="flex py-10 gap-20 sm:flex-col">
          <div className="flex flex-col gap-10 border-l-2 border-[#135e4c82] w-4/5 sm:flex-row sm:overflow-x-scroll sm:w-full ">
            {projects.map((proj, index) => (
              <div
                onClick={() => {
                  setSelectedItemIndex(index);
                }}
                className="cursor-pointer "
                key={proj._id}
              >
                <h1
                  className={`text-xl px-5
                    ${
                      selectedItemIndex === index
                        ? "text-tertiary border-tertiary border-l-4 -ml-[3px] bg-[#1a7f5a31] py-3 "
                        : "text-white"
                    }`}
                >
                  {proj.title}
                </h1>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-10 sm:flex-col">
            <dotlottie-wc
              key={projects[selectedItemIndex]._id}
              src={projects[selectedItemIndex].lottie}
              autoplay
              loop
              className={`${projects[selectedItemIndex].size} object-contain`}
            ></dotlottie-wc>
            <div className="flex flex-col gap-5">
              <h1 className="text-secondary text-xl">
                {projects[selectedItemIndex].title}
              </h1>
              <h1 className="text-white text-xl">
                {projects[selectedItemIndex].shortContent}
              </h1>
              <p className="text-white">
                {projects[selectedItemIndex].description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
