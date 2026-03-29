import React from "react";
import SectionTitle from "../../SectionTitle";
import { useSelector } from "react-redux";

const Contact = () => {
  const { portfolioData } = useSelector((state) => state.root);
  const { contact } = portfolioData;
  return (
    <>
      <div>
        <SectionTitle title="Say Hello" />
        <div className="flex items-start justify-between sm:flex-col gap-10">
          {/* LEFT → TEXT */}
          <div className="flex flex-col gap-1 w-1/2 sm:w-full">
            <p className="text-tertiary">{"{"}</p>

            {Object.keys(contact)
              .filter((key) => key !== "_id")
              .map((key) => (
                <p key={key} className="ml-5">
                  <span className="text-tertiary">{key} : </span>
                  <span className="text-white">{contact[key]}</span>
                </p>
              ))}

            <p className="text-tertiary">{"}"}</p>
          </div>

          {/* RIGHT → IMAGE */}
          <div className="w-1/2 sm:w-full flex justify-center">
            <dotlottie-wc
              src="https://lottie.host/11f0507f-dae2-4d19-b598-85950a963c67/YD5Bc3r6Bk.lottie"
              autoplay
              loop
              className="w-full max-w-[500px] h-[300px] sm:h-[250px]"
            ></dotlottie-wc>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
