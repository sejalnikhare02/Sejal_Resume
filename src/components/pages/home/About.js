import React from "react";
import SectionTitle from "../../SectionTitle";

const About = () => {
  const skills = [
    "JavaScript",
    "React",
    "Node",
    "Express",
    "MongoDB",
    "NextJS",
    "React Native",
  ];
  return (
    <>
      <div>
        <SectionTitle title="About" />
        <div className="flex w-full items-center sm:flex-col gap-5">
          <div className="w-1/2 md:w-1/2 sm:w-full h-[60vh] md:h-[50vh] sm:h-[60vh]">
            <dotlottie-wc
              src="https://lottie.host/7d917c1c-92c1-4dff-9601-fd89e2a65376/dsNisnPH9O.lottie"
              autoplay
              loop
              className=" h-full"
            ></dotlottie-wc>
          </div>
          <div className="flex flex-col gap-5 w-2/3 sm:w-full md:text-base">
            <p className="text-white">
              I am a Software Engineer with 4.5 years of professional
              experience, primarily focused on frontend development using
              React.js. I began my career after completing an internship in the
              MERN stack, which gave me a solid understanding of both frontend
              and backend technologies. Over time, I developed expertise in
              creating responsive, high-performance web applications and
              delivering seamless user experiences.
            </p>
            <p className="text-white">
              Currently, I am working at Livelytics (since November 2023), where
              I continue to enhance my skills and contribute to impactful
              projects. Prior to this, I worked at Angular Minds, where I gained
              valuable experience as a Full Stack Developer. During this phase,
              I expanded my knowledge of backend development and worked across
              the entire application stack, strengthening my ability to build
              end-to-end solutions.
            </p>
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
