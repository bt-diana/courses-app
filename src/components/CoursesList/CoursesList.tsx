import CourseCard from '../CourseCard/CourseCard';
import './CoursesList.css';
import { Course } from '../../types';

interface CoursesListProps {
  courses: Course[];
  deleteCourse: (id: string) => void;
}

const CoursesList = ({ courses, deleteCourse }: CoursesListProps) => {
  return (
    <div className="courses-list">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          courseData={course}
          deleteCourse={deleteCourse}
        />
      ))}
    </div>
  );
};

export default CoursesList;
