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
import { AuthorResource, CourseResource } from '../../types';
import { useState } from 'react';
import normalizeDuration from '../../helpers/normalizeDuration';
import AuthorsAddEdit from '../AuthorsAddEdit/AuthorsAddEdit';
import postCourse from '../../api/postCourse';
import currentDate from '../../helpers/currentDate';
import { useNavigate } from 'react-router-dom';
import putCourse from '../../api/putCourse';
import { addCourse, editCourse } from '../../store/coursesSlice';
import { useDispatch } from 'react-redux';

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

interface CourseInfoProps {
  courseResource?: CourseResource;
  authorsResource: AuthorResource[];
}

const CourseAddEdit = ({
  courseResource,
  authorsResource,
}: CourseInfoProps) => {
  const [duration, setDuration] = useState<number | null>(
    courseResource?.duration ?? null
  );
  const [courseAuthors, setCourseAuthors] = useState<string[]>(
    courseResource?.authors ?? []
  );
  const [authorsError, setAuthorsError] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const navigate = useNavigate();

  const navigateToCorses = () => {
    navigate('/courses');
  };

  const dispatch = useDispatch();

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    if (courseAuthors.length < 2) {
      setAuthorsError(true);
    } else {
      setIsDisabled(true);
      if (courseResource) {
        const courseData: CourseResource = {
          id: courseResource.id,
          ...values,
          authors: courseAuthors,
          creationDate: courseResource.creationDate,
        };
  
        dispatch(editCourse(courseData));
      } else {
        const courseData: Omit<CourseResource, 'id'> = {
          ...values,
          authors: courseAuthors,
          creationDate: currentDate(),
        };
  
        dispatch(addCourse(courseData));
      }
      navigateToCorses();
      // (() =>
      //   courseResource
      //     ? putCourse(courseResource.id, course)
      //     : postCourse(course))()
      //   .then(() => {
      //     navigateToCorses();
      //   })
      //   .catch(() => {
      //     setIsDisabled(false);
      //   });
    }
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = () => {
    if (courseAuthors.length < 2) {
      setAuthorsError(true);
    }
  };

  const onCourseAuthorsChange = (newAuthors: string[]) => {
    setCourseAuthors(newAuthors);
    if (authorsError && newAuthors.length > 1) setAuthorsError(false);
  };

  return (
    <>
      <div className="title">
        <Typography.Title level={2}>
          {courseResource ? `Edit course` : 'Create new course'}
        </Typography.Title>
      </div>
      <Form
        initialValues={courseResource}
        disabled={isDisabled}
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
              onChange={(value) => {
                setDuration(value);
              }}
              addonAfter={normalizeDuration(duration ?? 0)}
            />
          </Form.Item>

          <Form.Item>
            <AuthorsAddEdit
              courseAuthors={courseAuthors}
              setCourseAuthors={onCourseAuthorsChange}
              authorsResource={authorsResource}
              error={authorsError}
            />
          </Form.Item>
        </Card>

        <Form.Item className="edit-card-options">
          <Space>
            <Button
              htmlType="button"
              disabled={isDisabled}
              onClick={navigateToCorses}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={isDisabled}>
              {courseResource ? 'Edit course' : 'Create course'}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default CourseAddEdit;
