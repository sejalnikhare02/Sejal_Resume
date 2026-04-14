import { useState } from "react";
import { Form, Input, Button, Modal, message, Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  getPortfolioData,
  HideLoading,
  showLoading,
} from "../../../redux/rootSlice";

const { TextArea } = Input;

const AdminExperience = () => {
  const { portfolioData } = useSelector((state) => state.root);
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("add"); // add | edit
  const [selectedItem, setSelectedItem] = useState(null);
  const [isPresent, setIsPresent] = useState(false);

  // ✅ OPEN ADD MODAL
  const handleAdd = () => {
    setMode("add");
    setSelectedItem(null);
    form.resetFields();
    setIsPresent(false);
    setShowModal(true);
  };

  // ✅ OPEN EDIT MODAL
  const handleEdit = (exp) => {
    setMode("edit");
    setSelectedItem(exp);

    let start = "";
    let end = "";

    // ✅ Handle string OR array safely
    if (Array.isArray(exp.period)) {
      [start, end] = exp.period[0].split(" - ");
    } else if (typeof exp.period === "string") {
      [start, end] = exp.period.split(" - ");
    }

    form.setFieldsValue({
      title: exp.title,
      company: exp.company,
      description: exp.description,
      startYear: start,
      endYear: end === "Present" ? "" : end,
    });

    setIsPresent(end === "Present");
    setShowModal(true);
  };

  // ✅ DELETE
  const handleDelete = async (exp) => {
    try {
      dispatch(showLoading());

      const res = await axios.delete(
        `/api/portfolio/delete-experience/${exp._id}`,
      );

      dispatch(HideLoading());

      if (res.data.success) {
        message.success(res.data.message);
        dispatch(getPortfolioData());
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  // ✅ SUBMIT (ADD / UPDATE)
  const onFinish = async (values) => {
    const finalData = {
      ...values,
      period: `${values.startYear} - ${isPresent ? "Present" : values.endYear}`,
    };

    try {
      dispatch(showLoading());

      let res;

      if (mode === "edit") {
        res = await axios.put(
          `/api/portfolio/update-experience/${selectedItem._id}`,
          finalData,
        );
      } else {
        res = await axios.post("/api/portfolio/add-experience", finalData);
      }

      dispatch(HideLoading());

      if (res.data.success) {
        message.success(res.data.message);
        setShowModal(false);
        form.resetFields();
        dispatch(getPortfolioData());
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className="p-6">
      {/* ✅ ADD BUTTON */}
      <div className="flex justify-end mb-4">
        <Button onClick={handleAdd} className="bg-green-600 text-white">
          + Add Experience
        </Button>
      </div>

      {/* ✅ CARD UI */}
      <div className="grid grid-cols-3 sm:grid-cols-1  gap-4">
        {portfolioData?.experience?.map((exp) => (
          <div key={exp._id} className="bg-white p-4 rounded shadow">
            <h3 className="font-bold text-lg">{exp.period}</h3>

            <p>
              <b>Company:</b> {exp.company}
            </p>

            <p>
              <b>Role:</b> {exp.title}
            </p>

            <p className="text-sm mt-2">{exp.description}</p>

            {/* ACTION BUTTONS */}
            <div className="flex justify-end gap-2 mt-4">
              <Popconfirm
                title="Are you sure to delete?"
                onConfirm={() => handleDelete(exp)}
              >
                <Button danger>Delete</Button>
              </Popconfirm>

              <Button onClick={() => handleEdit(exp)}>Edit</Button>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ MODAL */}
      <Modal
        title={mode === "add" ? "Add Experience" : "Edit Experience"}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        className="sm:max-w-full "
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          {/* TITLE + COMPANY */}
          <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item
              name="company"
              label="Company"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </div>

          {/* CURRENTLY WORKING */}
          <div className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              checked={isPresent}
              onChange={(e) => {
                setIsPresent(e.target.checked);
              }}
            />
            <span>Currently Working Here</span>
          </div>

          {/* DATE */}
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="startYear"
              label="Start Year"
              rules={[{ required: true }]}
            >
              <Input placeholder="2021" />
            </Form.Item>

            <Form.Item
              name="endYear"
              label="End Year"
              rules={[{ required: !isPresent }]}
            >
              <Input placeholder="2023 or Present" disabled={isPresent} />
            </Form.Item>
          </div>

          {/* DESCRIPTION */}
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          {/* SUBMIT */}
          <div className="flex justify-end">
            <Button type="primary" htmlType="submit">
              {mode === "add" ? "Add" : "Update"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminExperience;
