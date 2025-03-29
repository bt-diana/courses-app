import './CourseCard.css';
import { Course } from '../../types';
import { Card } from 'antd';
interface CourseCardProps {
  courseData: Course;
}

const CourseCard = ({ courseData }: CourseCardProps) => {
  return <Card title={courseData.title}>{courseData.description}</Card>;
};

export default CourseCard;
