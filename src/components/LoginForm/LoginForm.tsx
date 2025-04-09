import './LoginForm.css';
import { Form, Input, Button, Typography, Card } from 'antd';
import type { FormProps } from 'antd';

type FieldType = {
  username?: string;
  password?: string;
};

interface LoginFormProps {
  onFinish: FormProps<FieldType>['onFinish'];
  onFinishFailed: FormProps<FieldType>['onFinishFailed'];
}

const LoginForm = ({ onFinish, onFinishFailed }: LoginFormProps) => {
  return (
    <Card className="login-card">
      <Form
        className="login-form"
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Typography.Title level={2}>Login</Typography.Title>
        <Form.Item<FieldType>
          className="login-form-field"
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          className="login-form-field"
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default LoginForm;
