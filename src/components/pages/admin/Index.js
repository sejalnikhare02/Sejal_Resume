import React from "react";
import Header from "../../Header";
import { Tabs } from "antd";
import {
  UserOutlined,
  InfoCircleOutlined,
  FundProjectionScreenOutlined,
  ProjectOutlined,
  ContactsOutlined,
} from "@ant-design/icons";
import AdminIntro from "./AdminIntro";
import AdminAbout from "./AdminAbout";
import AdminExperience from "./AdminExperience";
import AdminProject from "./AdminProject";
import AdminContact from "./AdminContact";
import { useSelector } from "react-redux";

const Admin = () => {
  const { portfolioData } = useSelector((state) => state.root);

  const tabItems = [
    {
      label: "Intro",
      key: "1",
      icon: <UserOutlined />,
      children: (
        <div>
          <AdminIntro />
        </div>
      ),
    },
    {
      label: "About",
      key: "2",
      icon: <InfoCircleOutlined />,
      children: (
        <div>
          <AdminAbout />
        </div>
      ),
    },
    {
      label: "Experience",
      key: "3",
      icon: <FundProjectionScreenOutlined />,
      children: (
        <div>
          <AdminExperience />
        </div>
      ),
    },
    {
      label: "Projects",
      key: "4",
      icon: <ProjectOutlined />,
      children: (
        <div>
          <AdminProject />
        </div>
      ),
    },
    {
      label: "Contact",
      key: "5",
      icon: <ContactsOutlined />,
      children: (
        <div>
          <AdminContact />
        </div>
      ),
    },
  ];
  return (
    <>
      <div>
        {/* <Header /> */}

        <div className="fixed top-0 left-0 w-full bg-primary px-5 py-3 flex justify-between items-center z-50 shadow-md">
          {/* Left */}
          <h1 className="text-secondary text-2xl sm:text-xl font-semibold">
            PortFolio Admin Panel
          </h1>

          {/* Right */}
          <div className="flex items-center gap-3">
            {/* <span className="text-white hidden sm:block">Admin</span> */}
            <button className="bg-tertiary px-3 py-1 rounded text-white text-sm">
              Logout
            </button>
          </div>
        </div>

        {portfolioData && (
          <div className="pt-20 px-5">
            <Tabs defaultActiveKey="1" items={tabItems} />
          </div>
        )}
      </div>
    </>
  );
};

export default Admin;
