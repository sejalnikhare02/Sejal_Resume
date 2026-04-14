import { Form, Input, Button, Select, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, showLoading } from "../../../redux/rootSlice";
import axios from "./axiosInstance";

const { TextArea } = Input;

const AdminAbout = () => {
  const { portfolioData } = useSelector((state) => state.root);
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/portfolio/update-about", {
        ...values,
        _id: portfolioData.about._id,
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
    <div className=" p-6 rounded-lg">
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        initialValues={portfolioData?.about}
      >
        {/* Lottie URL */}
        <div className="grid grid-cols-12 gap-4 items-center">
          {/* Lottie URL */}
          <Form.Item label="Lottie URL" name="lottieURL" className="col-span-7">
            <Input placeholder="Paste Lottie URL here" />
          </Form.Item>

          {/* <div className="hidden flex col-span-1 justify-center items-center mt-6">
            <span className="text-white font-semibold">OR</span>
          </div>

          <Form.Item label="Upload Animation/Image" className="col-span-4">
            <Upload
              beforeUpload={(file) => {
                setFile(file);
                message.success("File selected");
                return false;
              }}
              maxCount={1}
            >
              <Button className="w-full h-[40px]" icon={<UploadOutlined />}>
                Upload File
              </Button>
            </Upload>
          </Form.Item> */}
        </div>

        {/* Description 1 */}
        <Form.Item
          name="description1"
          label="Description 1"
          rules={[{ required: true }]}
        >
          <TextArea rows={3} />
        </Form.Item>

        {/* Description 2 */}
        <Form.Item
          name="description2"
          label="Description 2"
          rules={[{ required: true }]}
        >
          <TextArea rows={3} />
        </Form.Item>

        {/* Skills (TAG INPUT 🔥) */}
        <Form.Item
          name="skills"
          label="Skills"
          rules={[{ required: true, message: "Add at least two skill" }]}
        >
          <Select
            mode="tags"
            placeholder="Type skill and press enter"
            tokenSeparators={[","]}
          />
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

export default AdminAbout;
