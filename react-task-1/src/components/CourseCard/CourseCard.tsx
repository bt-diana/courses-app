import './CourseCard.css';
import { Course } from '../../types';
import { Card } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

interface CourseCardProps {
  courseData: Course;
  openCourse: (course: Course) => void;
  deleteCourse: (id: string) => void;
}

const CourseCard = ({
  courseData,
  openCourse,
  deleteCourse,
}: CourseCardProps) => {
  return (
    <Card
      title={courseData.title}
      actions={[
        <div
          key="show"
          onClick={() => {
            openCourse(courseData);
          }}
        >
          Show course
        </div>,
        <EditOutlined key="edit" />,
        <DeleteOutlined
          key="delete"
          onClick={() => {
            deleteCourse(courseData.id);
          }}
        />,
      ]}
    >
      <div className="course-card-content">
        <div className="course-card-description">{courseData.description}</div>
        <div className="course-card-params">
          <div key="authors" className="course-card-param">
            <span className="param-title">Authors:&#32;</span>
            <span className="param-value">{courseData.authors.join(', ')}</span>
          </div>
          <div key="duration" className="course-card-param">
            <span className="param-title">Duration:&#32;</span>
            <span className="param-value">{courseData.duration}</span>
          </div>
          <div key="creationDate" className="course-card-param">
            <span className="param-title">Created:&#32;</span>
            <span className="param-value">
              {courseData.creationDate.split('/').join('.')}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;
