import { MouseEventHandler, useState } from "react";
import Button from "antd/lib/button/button";
import Input from "antd/lib/input";
import Form from "antd/lib/form";
import Typography from "antd/lib/typography";
import Modal from "antd/lib/modal";
import { axios } from "../../apis/axios";

const SignUpForm: React.FC<{
  toggleLogin: MouseEventHandler<HTMLSpanElement>;
}> = ({ toggleLogin }) => {
  const [form] = Form.useForm();
  const [formState, setFormState] = useState({ loading: false, msg: "" });
  const [isMsgModalVisible, setIsMsgModalVisible] = useState(false);

  const handleOk = () => {
    toggleMsgModal();
  };

  const toggleMsgModal = () => {
    setIsMsgModalVisible(() => !isMsgModalVisible);
  };

  const onFinish = (values: {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
  }) => {
    setFormState({ loading: true, msg: "" });

    const { name, email, password } = values;

    axios
      .post("api/user/register/", { name, email, password })
      .then((response) => {
        return response.data;
      })
      .then((result) => {
        setFormState({ loading: false, msg: result.data.msg });
        toggleMsgModal();
      });
  };

  const validatePassword = (rule: any, value: any, callback: any) => {
    if (value && value.length < 8) {
      callback("Your password must contain at least 8 characters.");
    } else if (!isNaN(value)) {
      callback("Your password can’t be entirely numeric.");
    } else {
      callback();
    }
  };

  return (
    <div style={{ width: "300px" }}>
      <Form
        name="Sign Up Form"
        form={form}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        requiredMark={false}
        size="large"
        layout="vertical"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your Name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          hasFeedback
          rules={[
            { required: true, message: "Please input your password!" },
            { validator: validatePassword },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirm_password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Please input your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={formState.loading}
          >
            Sign Up
          </Button>
          {formState.msg !== "" ? (
            <Modal
              title=""
              visible={isMsgModalVisible}
              onOk={handleOk}
              onCancel={handleOk}
              centered
              width={600}
            >
              <p style={{ fontSize: "1.2rem" }}>{formState.msg}</p>
            </Modal>
          ) : null}
        </Form.Item>
      </Form>
      <Typography>
        Already Have an account?{" "}
        <span
          style={{ color: "#00a1ed", cursor: "pointer" }}
          onClick={toggleLogin}
        >
          Sign In
        </span>
      </Typography>
    </div>
  );
};

export default SignUpForm;
