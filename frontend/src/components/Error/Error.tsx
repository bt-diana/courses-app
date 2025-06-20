import { ExclamationCircleOutlined } from '@ant-design/icons';
import './Error.css';
import { Flex, Typography } from 'antd';

interface ErrorProps {
  message?: string;
}

const Error = ({ message }: ErrorProps) => {
  return (
    <Flex gap="middle" className="error-container" vertical>
      <Flex gap="middle" className="error">
        <Typography.Title level={2}>
          <ExclamationCircleOutlined /> An error has occcured!
        </Typography.Title>
        {message && <Typography.Text>{message}</Typography.Text>}
        <Typography.Text>Try reloading the page.</Typography.Text>
      </Flex>
    </Flex>
  );
};

export default Error;
