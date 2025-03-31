import { Card, Typography } from 'antd';
import { Course } from '../../types';
import './CourseInfo.css';

interface CourseInfoProps {
  courseData: Course;
}

const CourseInfo = ({ courseData }: CourseInfoProps) => {
  return (
    <>
      <Typography.Title>{courseData.title}</Typography.Title>
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
              <span className="info-param-value">
                {courseData.authors.join(', ')}
              </span>
            </div>
            <div key="duration" className="card-info-param">
              <span className="info-param-title">Duration:&#32;</span>
              <span className="info-param-value">{courseData.duration}</span>
            </div>
            <div key="creationDate" className="card-info-param">
              <span className="info-param-title">Created:&#32;</span>
              <span className="info-param-value">
                {courseData.creationDate.split('/').join('.')}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default CourseInfo;
