import './CourseAddEdit.css';
import {
  Button,
  Card,
  Form,
  FormProps,
  Input,
  Space,
  Typography,
} from 'antd';
import { Course } from '../../types';

type FieldType = {
  title?: string;
  description?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log(values);
};
const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (error) => {
  console.log(error);
};

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
  },
};

interface CourseInfoProps {
  courseData?: Course;
}

const CourseAddEdit = ({ courseData }: CourseInfoProps) => {
  return (
    <>
      <div className="title">
        <Typography.Title level={2}>
          {courseData ? `Edit course` : 'Create new course'}
        </Typography.Title>
      </div>
      <Card className="edit-card">
        <Form
          {...formItemLayout}
          className="edit-form"
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          scrollToFirstError
        >
          <Form.Item<FieldType>
            className="edit-form-field"
            label="Title"
            name="title"
            rules={[
              { required: true, message: 'Title is required' },
              {
                type: 'string',
                min: 2,
                message: 'Title must be at least 2 characters',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            className="edit-form-field"
            label="Description"
            name="description"
            rules={[
              { required: true, message: 'Description is required' },
              {
                type: 'string',
                min: 2,
                message: 'Description must be at least 2 characters',
              },
            ]}
          >
            <Input.TextArea showCount maxLength={1000} />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button htmlType="button">Cancel</Button>
              <Button type="primary" htmlType="submit">
                {courseData ? 'Edit' : 'Create'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default CourseAddEdit;
