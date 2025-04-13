import './Loading.css';
import { Flex, Spin } from 'antd';

const Loading = () => {
  return (
    <Flex className="spinner" gap="middle" vertical>
      <Flex gap="middle">
        <Spin tip="Loading" size="large">
          <div className="spinner-content"></div>
        </Spin>
      </Flex>
    </Flex>
  );
};

export default Loading;
