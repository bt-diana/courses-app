import './AddNewCourseButton.css';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const AddNewCourseButton = () => {
  const navigate = useNavigate();
  const navigateToCorseAdd = () => {
    navigate('/courses/add');
  };

  return <Button onClick={navigateToCorseAdd}>Add New Course</Button>;
};

export default AddNewCourseButton;
