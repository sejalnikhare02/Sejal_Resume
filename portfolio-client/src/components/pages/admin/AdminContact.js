import React, { useEffect } from "react";
import { Form, Input, Button, Select, message } from "antd";
import { HideLoading, showLoading } from "../../../redux/rootSlice";
import axios from "./axiosInstance";
import { useDispatch, useSelector } from "react-redux";

const AdminContact = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { portfolioData } = useSelector((state) => state.root);

  // 🔥 Prefill form
  useEffect(() => {
    if (portfolioData?.contact) {
      form.setFieldsValue(portfolioData.contact);
    }
  }, [portfolioData, form]);

  // 🔥 Submit
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());

      const response = await axios.post("/api/portfolio/update-contact", {
        ...values,
        _id: portfolioData?.contact?._id,
      });

      dispatch(HideLoading());

      if (response.data.success) {
        message.success(response.data.message);
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
      <Form layout="vertical" form={form} onFinish={onFinish}>
        {/* Row 1: Name + Email */}
        <div className="grid grid-cols-12 gap-4">
          {/* Name */}
          <div className="col-span-6 sm:col-span-12">
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Enter name" }]}
            >
              <Input placeholder="Full Name" />
            </Form.Item>
          </div>

          {/* Email */}
          <div className="col-span-6 sm:col-span-12">
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Enter email" },
                { type: "email", message: "Invalid email" },
              ]}
            >
              <Input placeholder="example@gmail.com" />
            </Form.Item>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-12 gap-4">
          {/* Age */}
          <div className="col-span-3 sm:col-span-12">
            <Form.Item name="age" label="Age" rules={[{ required: true }]}>
              <Input type="number" />
            </Form.Item>
          </div>

          {/* Gender */}
          <div className="col-span-3 sm:col-span-12">
            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select Gender">
                <Select.Option value="Male">Male</Select.Option>
                <Select.Option value="Female">Female</Select.Option>
                <Select.Option value="Other">Other</Select.Option>
              </Select>
            </Form.Item>
          </div>

          {/* Mobile */}
          <div className="col-span-6 sm:col-span-12">
            <Form.Item
              name="mobile"
              label="Mobile"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-12 gap-4">
          {/* Address */}
          <div className="col-span-6 sm:col-span-12">
            <Form.Item
              name="address"
              label="Address"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </div>
        </div>

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

export default AdminContact;
