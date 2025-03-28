import CourseCard from '../CourseCard/CourseCard';
import './CoursesList.css';

const CoursesList = ({ courses }) => {
  return (
    <>
      <div>CoursesList</div>
      {courses.map((course) => (
        <CourseCard data={course} />
      ))}
    </>
  );
};

export default CoursesList;
