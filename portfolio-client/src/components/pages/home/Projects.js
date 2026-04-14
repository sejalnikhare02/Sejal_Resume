import { useState, useMemo } from "react";
import SectionTitle from "../../SectionTitle";
import { useSelector } from "react-redux";
import { Player } from "@lottiefiles/react-lottie-player";

const Projects = () => {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const { portfolioData } = useSelector((state) => state.root);

  const sortedProjects = useMemo(() => {
    const projects = portfolioData?.project || [];

    return [...projects].sort((a, b) => {
      return new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0);
    });
  }, [portfolioData]);

  // selected project
  const selectedProject = sortedProjects[selectedItemIndex];
  return (
    <div>
      <SectionTitle title="Projects" />

      <div className="flex py-10 gap-16 sm:flex-col">
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-6 border-l-2 border-[#135e4c82]  sm:flex-row sm:overflow-x-auto sm:w-full">
          {sortedProjects.map((proj, index) => (
            <div
              key={proj._id}
              onClick={() => setSelectedItemIndex(index)}
              className="cursor-pointer"
            >
              <h1
                className={`text-lg px-4 py-2 transition-all duration-300
                ${
                  selectedItemIndex === index
                    ? "text-tertiary border-l-4 border-tertiary -ml-[3px] bg-[#1a7f5a31]"
                    : "text-white hover:text-tertiary"
                }`}
              >
                {proj.title}
              </h1>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE */}
        {selectedProject && (
          <div className="flex items-center justify-center gap-10 sm:flex-col w-full">
            {/* LOTTIE */}
            {selectedProject.lottie && (
              <Player
                autoplay
                loop
                src={selectedProject.lottie}
                style={{ width: "350px", height: "300px" }}
              />
            )}

            {/* TEXT */}
            <div className="flex flex-col gap-4 max-w-[500px]">
              <h1 className="text-secondary text-2xl font-semibold">
                {selectedProject.title}
              </h1>

              <h2 className="text-white text-lg">
                {selectedProject.shortContent}
              </h2>

              <p className="text-white text-sm leading-relaxed">
                {selectedProject.description}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
