import React from "react";
import SectionTitle from "../../SectionTitle";
import { useSelector } from "react-redux";

const About = () => {
  const { portfolioData } = useSelector((state) => state.root);
  const { about } = portfolioData;
  const { skills, lottieURL, description1, description2 } = about;

  return (
    <>
      <div>
        <SectionTitle title="About" />
        <div className="flex w-full items-center sm:flex-col gap-5">
          <div className="w-1/2 md:w-1/2 sm:w-full h-[60vh] md:h-[50vh] sm:h-[60vh]">
            <dotlottie-wc
              src={lottieURL}
              autoplay
              loop
              className=" h-full"
            ></dotlottie-wc>
          </div>
          <div className="flex flex-col gap-5 w-2/3 sm:w-full md:text-base">
            <p className="text-white">{description1 || ""}</p>
            <p className="text-white">{description2 || ""}</p>
          </div>
        </div>

        <div className="py-5 mt-3">
          <h1 className="text-tertiary text-xl">
            Here are a few technologies, I'hv been working with recently:
          </h1>
          <div className="flex flex-wrap gap-10 mt-5">
            {skills.map((skill, index) => (
              <div className="border border-tertiary py-3 px-5">
                <h1 className="text-tertiary ">{skill}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
