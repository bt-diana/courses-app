import CourseCard from '../CourseCard/CourseCard';
import './CoursesList.css';
import { Course } from '../../types';

interface CoursesListProps {
  courses: Course[];
}

const CoursesList = ({ courses }: CoursesListProps) => {
  return (
    <div className="courses-list">
      {courses.map((course) => (
        <CourseCard key={course.id} courseData={course} />
      ))}
    </div>
  );
};

export default CoursesList;
