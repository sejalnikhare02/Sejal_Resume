import React, { useEffect, useState } from "react";
import { Form, Input, Button, DatePicker, message } from "antd";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { HideLoading, showLoading } from "../../../redux/rootSlice";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const AdminExperience = () => {
  const { portfolioData } = useSelector((state) => state.root);
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [isPresent, setIsPresent] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  // 🔥 SET FORM WHEN SELECTING EXISTING EXPERIENCE
  const handleEdit = (exp, index) => {
    setSelectedIndex(index);

    let start, end;

    if (typeof exp.period === "string") {
      [start, end] = exp.period.split(" - ");
    } else {
      [start, end] = exp.period;
    }

    form.setFieldsValue({
      ...exp,
      period: [
        dayjs(start, "MMM YYYY"),
        end === "Present" ? dayjs() : dayjs(end, "MMM YYYY"),
      ],
    });

    setIsPresent(end === "Present");
  };

  // 🔥 SUBMIT
  const onFinish = async (values) => {
    const [start, end] = values.period;

    const finalData = {
      ...values,
      period: `${start.format("MMM YYYY")} - ${
        isPresent ? "Present" : end.format("MMM YYYY")
      }`,
    };

    try {
      dispatch(showLoading());

      let response;

      if (selectedIndex !== null) {
        // UPDATE
        const selectedExp = portfolioData.experience[selectedIndex];

        response = await axios.post("/api/portfolio/update-experience", {
          ...finalData,
          _id: selectedExp._id,
        });
      } else {
        // ADD
        response = await axios.post("/api/portfolio/add-experience", finalData);
      }

      dispatch(HideLoading());

      if (response.data.success) {
        message.success(response.data.message);

        form.resetFields();
        setSelectedIndex(null);
        setIsPresent(false);

        // 🔥 refresh data (IMPORTANT)
        window.location.reload(); // simple way
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className="p-6  rounded-lg">
      {/* 🔥 ADD BUTTON */}
      <div className="flex justify-end mb-4">
        <Button
          onClick={() => {
            setSelectedIndex(null);
            form.resetFields();
            setIsPresent(false);
          }}
          className="bg-green-600 text-white"
        >
          + Add New Experience
        </Button>
      </div>

      {/* 🔥 EXPERIENCE LIST */}
      <div className="mb-6 ">
        <h2 className=" text-lg mb-2">Your Experiences</h2>

        <div className="grid grid-cols-2 sm:grid-cols-1 gap-2">
          {portfolioData?.experience?.map((exp, index) => (
            <div
              key={exp._id}
              onClick={() => handleEdit(exp, index)}
              className={`p-3 rounded cursor-pointer border ${
                selectedIndex === index
                  ? "bg-tertiary text-white"
                  : "bg-gray-800 text-gray-300"
              }`}
            >
              {exp.title} @ {exp.company}
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 FORM */}
      <Form layout="vertical" form={form} onFinish={onFinish}>
        {/* Title + Company */}
        <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input placeholder="Software Engineer" />
          </Form.Item>

          <Form.Item
            name="company"
            label="Company"
            rules={[{ required: true }]}
          >
            <Input placeholder="Company Name" />
          </Form.Item>
        </div>

        {/* Checkbox */}
        <div className="flex items-center gap-2 mt-2 mb-2">
          <input
            type="checkbox"
            checked={isPresent}
            onChange={(e) => {
              const checked = e.target.checked;
              setIsPresent(checked);

              const current = form.getFieldValue("period");

              if (checked && current && current[0]) {
                form.setFieldsValue({
                  period: [current[0], dayjs()],
                });
              }
            }}
          />
          <span className=" text-sm">Currently Working Here</span>
        </div>

        {/* Period */}
        <Form.Item name="period" label="Period" rules={[{ required: true }]}>
          <RangePicker
            picker="month"
            className="w-full"
            format="MMM YYYY"
            disabledDate={(current) =>
              current && current > dayjs().endOf("month")
            }
            onCalendarChange={(dates) => {
              if (isPresent && dates && dates[0]) {
                form.setFieldsValue({
                  period: [dates[0], dayjs()],
                });
              }
            }}
          />
        </Form.Item>

        {/* Description */}
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        {/* Submit */}
        <Form.Item>
          <div className="flex justify-end sm:justify-center">
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminExperience;
