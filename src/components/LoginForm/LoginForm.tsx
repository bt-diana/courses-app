import './LoginForm.css';
import { Form, Input, Button, Typography, Card } from 'antd';
import type { FormProps } from 'antd';
import { useState } from 'react';

type FieldType = {
  username: string;
  password: string;
};

interface LoginFormProps {
  requestOnFinish: ({ username, password }: FieldType) => Promise<void>;
}

const LoginForm = ({ requestOnFinish }: LoginFormProps) => {
  const [errorMessage, setErrorMessage] = useState<string>();

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    requestOnFinish(values).catch((error) => {
      setErrorMessage(error.message);
    });
  };

  const onFocus = () => {
    setErrorMessage(undefined);
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <Form
          className="login-form"
          name="basic"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          onFocus={onFocus}
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
            {errorMessage && (
              <Typography.Text type="danger">{errorMessage}</Typography.Text>
            )}
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default LoginForm;
