import { Button, Form, Input, Typography } from "antd";
import { MouseEventHandler } from "react";
import { useHistory } from "react-router";
import { axios } from "../../apis/axios";
import { store } from "../../redux/store";
import { setCurrentUser } from "../../redux/user/user.actions";

const LoginForm: React.FC<{ toggleLogin: MouseEventHandler<HTMLSpanElement> }> =
  ({ toggleLogin }) => {
    const history = useHistory();

    const onFinish = async (values: any) => {
      try {
        const { data } = await axios.post("api/user/login/", values);
        if (data) {
          store.dispatch(setCurrentUser(data));
          history.replace("/profile");
        }
      } catch (err) {
        console.log(err);
      }
    };

    return (
      <div style={{ width: "300px" }}>
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          requiredMark={false}
          size="large"
          layout="vertical"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
        <Typography>
          Don't' have an account?{" "}
          <span
            style={{ color: "#00a1ed", cursor: "pointer" }}
            onClick={toggleLogin}
          >
            Sign Up
          </span>
        </Typography>
      </div>
    );
  };

export default LoginForm;
