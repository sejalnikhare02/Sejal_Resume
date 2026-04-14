import { useState } from "react";
import { Form, Input, Button, Modal, message, Popconfirm } from "antd";
import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
import {
  HideLoading,
  showLoading,
  getPortfolioData,
} from "../../../redux/rootSlice";
import { Player } from "@lottiefiles/react-lottie-player";
import axios from "./axiosInstance";

const { TextArea } = Input;

const AdminProject = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const { portfolioData } = useSelector((state) => state.root);

  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("add");
  const [selectedItem, setSelectedItem] = useState(null);

  // ✅ ADD
  const handleAdd = () => {
    setMode("add");
    setSelectedItem(null);
    form.resetFields();
    setShowModal(true);
  };

  // ✅ EDIT
  const handleEdit = (proj) => {
    setMode("edit");
    setSelectedItem(proj);
    form.setFieldsValue(proj);
    setShowModal(true);
  };

  // ✅ DELETE
  const handleDelete = async (proj) => {
    try {
      dispatch(showLoading());

      const res = await axios.delete(
        `/api/portfolio/delete-project/${proj._id}`,
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

  // ✅ SUBMIT
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());

      let res;

      if (mode === "edit") {
        res = await axios.post("/api/portfolio/update-project", {
          ...values,
          _id: selectedItem._id,
        });
      } else {
        res = await axios.post("/api/portfolio/add-project", values);
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
      {/* ADD BUTTON */}
      <div className="flex justify-end mb-4">
        <Button onClick={handleAdd} className="bg-green-600 text-white">
          + Add Project
        </Button>
      </div>

      {/* CARD UI */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {portfolioData?.project?.map((proj) => {
          console.log("Project:", proj);
          console.log("Lottie URL:", proj.lottie);

          return (
            <div key={proj._id} className="bg-white p-4 rounded shadow">
              {/* TITLE */}
              <h3 className="font-bold text-lg">{proj.title}</h3>

              {/* IMAGE */}
              {proj.lottie && (
                <div className="flex justify-center mb-3">
                  <Player
                    autoplay
                    loop
                    src={proj.lottie}
                    style={{ width: "300px", height: "300px" }}
                  />
                </div>
              )}

              {/* TECH */}
              <p className="text-sm text-gray-600">{proj.technologies}</p>

              {/* DESC */}
              <p className="text-sm mt-2">{proj.description}</p>

              {/* ACTIONS */}
              <div className="flex justify-end gap-2 mt-4">
                <Popconfirm
                  title="Delete this project?"
                  onConfirm={() => handleDelete(proj)}
                >
                  <Button danger>Delete</Button>
                </Popconfirm>

                <Button onClick={() => handleEdit(proj)}>Edit</Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL */}
      <Modal
        title={mode === "add" ? "Add Project" : "Edit Project"}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        width={window.innerWidth < 640 ? "95%" : 600}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          {/* TITLE + LINK */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Form.Item
              name="title"
              label="Project Title"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item name="link" label="Project Link">
              <Input />
            </Form.Item>
          </div>

          {/* TECH + IMAGE */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Form.Item
              name="technologies"
              label="Technologies"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="lottie"
              label="Image URL"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </div>

          {/* DESC */}
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          {/* SUBMIT */}
          <div className="flex justify-center sm:justify-end">
            <Button type="primary" htmlType="submit">
              {mode === "add" ? "Add" : "Update"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminProject;
