import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { HideLoading, showLoading } from "../../../redux/rootSlice";

const { TextArea } = Input;

const AdminProject = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { portfolioData } = useSelector((state) => state.root);

  const [selectedIndex, setSelectedIndex] = useState(null);

  // 🔥 Handle Edit
  const handleEdit = (proj, index) => {
    setSelectedIndex(index);
    form.setFieldsValue(proj);
  };

  // 🔥 Submit (Add + Update)
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());

      let response;

      if (selectedIndex !== null) {
        // UPDATE
        const selected = portfolioData.project[selectedIndex];

        response = await axios.post("/api/portfolio/update-project", {
          ...values,
          _id: selected._id,
        });
      } else {
        // ADD
        response = await axios.post("/api/portfolio/add-project", values);
      }

      dispatch(HideLoading());

      if (response.data.success) {
        message.success(response.data.message);

        form.resetFields();
        setSelectedIndex(null);

        // 🔥 refresh data
        window.location.reload();
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className="p-6 rounded-lg ">
      {/* 🔥 PROJECT LIST */}
      <div className="mb-6">
        <h2 className="text-white text-lg mb-2">Projects</h2>

        <div className="flex flex-col gap-2">
          {portfolioData?.project?.map((proj, index) => (
            <div
              key={proj._id}
              onClick={() => handleEdit(proj, index)}
              className={`p-3 rounded cursor-pointer border ${
                selectedIndex === index
                  ? "bg-tertiary text-white"
                  : "bg-gray-800 text-gray-300"
              }`}
            >
              {proj.title}
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 ADD BUTTON */}
      <div className="flex justify-end mb-4">
        <Button
          onClick={() => {
            setSelectedIndex(null);
            form.resetFields();
          }}
          className="bg-green-600 text-white"
        >
          + Add New Project
        </Button>
      </div>

      {/* 🔥 YOUR SAME FORM (UNCHANGED UI) */}
      <Form layout="vertical" form={form} onFinish={onFinish}>
        {/* Title + Link */}
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
          <Form.Item
            name="title"
            label="Project Title"
            rules={[{ required: true, message: "Enter project title" }]}
          >
            <Input placeholder="Project Name" />
          </Form.Item>

          <Form.Item name="link" label="Project Link">
            <Input placeholder="https://..." />
          </Form.Item>
        </div>

        {/* Technologies + Lottie URL */}
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
          <Form.Item
            name="technologies"
            label="Technologies"
            rules={[{ required: true, message: "Enter technologies" }]}
          >
            <Input placeholder="React, Node, MongoDB" />
          </Form.Item>

          <Form.Item
            name="lottieURL"
            label="Image URL"
            rules={[{ required: true, message: "Enter lottie URL" }]}
          >
            <Input placeholder="Paste Lottie URL" />
          </Form.Item>
        </div>

        {/* Description */}
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Enter description" }]}
        >
          <TextArea rows={4} placeholder="Describe your project..." />
        </Form.Item>

        {/* Submit */}
        <Form.Item>
          <div className="flex justify-end sm:justify-center">
            <Button type="primary" htmlType="submit" className="bg-tertiary">
              Save
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminProject;
