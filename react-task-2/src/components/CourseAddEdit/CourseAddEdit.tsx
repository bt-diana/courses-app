import './CourseAddEdit.css';
import { Typography } from 'antd';
import { Course } from '../../types';

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
    </>
  );
};

export default CourseAddEdit;
