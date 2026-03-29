import React from "react";

const LeftSider = () => {
  return (
    <>
      <div className="fixed left-0 bottom-0 px-10 sm:static">
        <div className="flex flex-col items-center">
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href="https://github.com/sejalnikhare02/Sejal_Resume"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="ri-github-fill text-gray-500 text-xl"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/sejal-nikhare-627b83189/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="ri-linkedin-box-line text-gray-500 text-xl"></i>
            </a>
            <a
              href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="ri-mail-unread-line text-gray-500 text-xl"></i>
            </a>
            <a
              href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="ri-facebook-circle-line text-gray-500 text-xl"></i>
            </a>
            <a
              href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i class="ri-instagram-line text-gray-500 text-xl"></i>
            </a>
          </div>
          <div className="w-[2px] h-32 bg-[#125f63] sm:hidden"></div>
        </div>
      </div>
    </>
  );
};

export default LeftSider;
