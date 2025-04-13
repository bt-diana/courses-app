import './CourseCard.css';
import { Course } from '../../types';
import { Card } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import DeleteCurrentCourse from '../../contexts/deleteCurrentCourse';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface CourseCardProps {
  courseData: Course;
}

const CourseCard = ({ courseData }: CourseCardProps) => {
  const navigate = useNavigate();
  const deleteCourse = useContext(DeleteCurrentCourse);

  return (
    <Card
      title={courseData.title}
      actions={[
        <Link key="show" to={`/courses/${courseData.id}`}>
          <span>Show course</span>
        </Link>,
        <EditOutlined
          key="edit"
          onClick={() => {
            navigate(`/courses/${courseData.id}/edit`);
          }}
        />,
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
            <span className="param-value">{courseData.authors}</span>
          </div>
          <div key="duration" className="course-card-param">
            <span className="param-title">Duration:&#32;</span>
            <span className="param-value">{courseData.duration}</span>
          </div>
          <div key="creationDate" className="course-card-param">
            <span className="param-title">Created:&#32;</span>
            <span className="param-value">{courseData.creationDate}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;
