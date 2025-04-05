import './AddNewCourseButton.css';
import { Button } from 'antd';

interface AddNewCourseButtonProps {
  restoreCourses?: () => void;
}

const AddNewCourseButton = ({ restoreCourses }: AddNewCourseButtonProps) => {
  return (
    <Button
      onClick={() => {
        restoreCourses?.();
      }}
    >
      Add New Course
    </Button>
  );
};

export default AddNewCourseButton;
