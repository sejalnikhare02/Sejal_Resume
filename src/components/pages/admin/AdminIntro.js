import { Form, Input, Button, Select, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, showLoading } from "../../../redux/rootSlice";
import axios from "axios";

const { Option } = Select;

const AdminIntro = () => {
  const { portfolioData } = useSelector((state) => state.root);
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/portfolio/update-intro", {
        ...values,
        _id: portfolioData.intro._id,
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
    <div className="p-6 rounded-lg">
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={portfolioData?.intro}
      >
        {/* ROW: Welcome + Names */}
        <div className="flex flex-row sm:flex-col gap-4">
          {/* Welcome Dropdown */}
          <Form.Item
            name="welcomeText"
            label="Welcome Text"
            className="w-1/4  sm:w-full"
            rules={[{ required: true, message: "Required" }]}
          >
            <Select placeholder="Select">
              <Option value="Hi, I'm">Hi, I'm</Option>
              <Option value="Hello, I'm">Hello, I'm</Option>
              <Option value="Hey, I'm">Hey, I'm</Option>
            </Select>
          </Form.Item>

          {/* First Name */}
          <Form.Item
            name="firstName"
            label="First Name"
            className="w-1/4  sm:w-full"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input placeholder="First Name" />
          </Form.Item>

          {/* Middle Name */}
          <Form.Item
            name="middleName"
            label="Middle Name"
            className="w-1/4  sm:w-full"
          >
            <Input placeholder="Middle Name" />
          </Form.Item>

          {/* Last Name */}
          <Form.Item
            name="lastName"
            label="Last Name"
            className="w-1/4  sm:w-full"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
        </div>

        {/* Caption */}
        <Form.Item
          name="caption"
          label="Profile"
          rules={[{ required: true, message: "Required" }]}
        >
          <Input placeholder="Software Engineer" />
        </Form.Item>

        {/* Description */}
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Required" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        {/* Button */}
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

export default AdminIntro;
