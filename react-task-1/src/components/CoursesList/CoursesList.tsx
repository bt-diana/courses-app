import CourseCard from '../CourseCard/CourseCard';
import './CoursesList.css';
import { Course } from '../../types';

interface CoursesListProps {
  courses: Course[];
  openCourse: (course: Course) => void;
  deleteCourse: (id: string) => void;
}

const CoursesList = ({
  courses,
  openCourse,
  deleteCourse,
}: CoursesListProps) => {
  return (
    <div className="courses-list">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          courseData={course}
          openCourse={openCourse}
          deleteCourse={deleteCourse}
        />
      ))}
    </div>
  );
};

export default CoursesList;
