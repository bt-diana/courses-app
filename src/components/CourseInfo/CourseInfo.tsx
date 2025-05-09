import './CourseInfo.css';
import { Card, Typography } from 'antd';
import { Course } from '../../types';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

interface CourseInfoProps {
  courseData: Course;
}

const CourseInfo = ({ courseData }: CourseInfoProps) => {
  return (
    <>
      <div className="title">
        <Link to="/courses">
          <button className="back" aria-label="back-button">
            <ArrowLeftOutlined />
          </button>
        </Link>
        <Typography.Title level={2}>{courseData.title}</Typography.Title>
      </div>
      <Card className="card-info">
        <div className="card-info-content">
          <div className="card-info-description">
            <div className="description-title">Description:</div>
            <div className="description-value">{courseData.description}</div>
          </div>
          <div className="card-info-params">
            <div key="id" className="card-info-param">
              <span className="info-param-title">ID:&#32;</span>
              <span className="info-param-value">{courseData.id}</span>
            </div>
            <div key="authors" className="card-info-param">
              <span className="info-param-title">Authors:&#32;</span>
              <span className="info-param-value">{courseData.authors}</span>
            </div>
            <div key="duration" className="card-info-param">
              <span className="info-param-title">Duration:&#32;</span>
              <span className="info-param-value">{courseData.duration}</span>
            </div>
            <div key="creationDate" className="card-info-param">
              <span className="info-param-title">Created:&#32;</span>
              <span className="info-param-value">
                {courseData.creationDate}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default CourseInfo;
