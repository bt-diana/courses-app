import './CourseAddEdit.css';
import {
  Button,
  Card,
  Form,
  FormProps,
  Input,
  InputNumber,
  Space,
  Typography,
} from 'antd';
import { CourseResource } from '../../types';
import { useEffect, useState } from 'react';
import normalizeDuration from '../../helpers/normalizeDuration';
import AuthorsAddEdit from '../AuthorsAddEdit/AuthorsAddEdit';
import currentDate from '../../helpers/currentDate';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, getCourseAuthors, getCoursesStatus } from '../../store';
import { addCourse, editCourse } from '../../store/coursesSlice';
import { isLoading } from '../../helpers/status';

type FieldType = {
  title: string;
  description: string;
  duration: number;
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

interface CourseAddEditProps {
  courseResource?: CourseResource;
}

const CourseAddEdit = ({ courseResource }: CourseAddEditProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const coursesStatus = useSelector(getCoursesStatus);
  const courseAuthors = useSelector(getCourseAuthors);

  const [isSaving, setIsSaving] = useState<boolean>(false);

  const [duration, setDuration] = useState<number | null>(
    courseResource?.duration ?? null
  );
  const [authorsError, setAuthorsError] = useState<boolean>(false);

  const navigate = useNavigate();
  const navigateToCorses = () => {
    navigate('/courses');
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    if (courseAuthors.length < 2) {
      setAuthorsError(true);
    } else {
      const courseData = {
        ...values,
        authors: courseAuthors,
        creationDate: courseResource?.creationDate ?? currentDate(),
      };

      dispatch(
        courseResource
          ? editCourse({ id: courseResource.id, ...courseData })
          : addCourse(courseData)
      );
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = () => {
    if (courseAuthors.length < 2) {
      setAuthorsError(true);
    }
  };

  useEffect(() => {
    if (authorsError && courseAuthors.length > 1) {
      setAuthorsError(false);
    }
  }, [courseAuthors]);

  useEffect(() => {
    if (isLoading(coursesStatus)) {
      setIsSaving(true);
    } else if (isSaving) {
      navigateToCorses();
    }
  }, [coursesStatus]);

  return (
    <>
      <div className="title">
        <Typography.Title level={2}>
          {courseResource ? `Edit course` : 'Create new course'}
        </Typography.Title>
      </div>
      <Form
        initialValues={courseResource}
        disabled={isSaving}
        {...formItemLayout}
        className="edit-form"
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        scrollToFirstError
      >
        <Card className="edit-card">
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

          <Form.Item<FieldType>
            className="edit-form-field"
            label="Duration"
            name="duration"
            rules={[{ required: true, message: 'Duration is required' }]}
          >
            <InputNumber
              type="number"
              min={0}
              value={duration}
              onChange={setDuration}
              addonAfter={normalizeDuration(duration ?? 0)}
            />
          </Form.Item>

          <Form.Item>
            <AuthorsAddEdit error={authorsError} />
          </Form.Item>
        </Card>

        <Form.Item className="edit-card-options">
          <Space>
            <Button
              htmlType="button"
              disabled={isSaving}
              onClick={navigateToCorses}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={isSaving}>
              {courseResource ? 'Edit course' : 'Create course'}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default CourseAddEdit;
