import AddNewCourseButton from '../AddNewCourseButton/AddNewCourseButton';
import './EmptyCoursesList.css';
import { Empty, Typography } from 'antd';

const EmptyCoursesList = () => {
  return (
    <Empty
      styles={{ image: { height: 60 } }}
      description={
        <>
          <Typography.Title level={2}>Your list is empty</Typography.Title>
          <Typography.Text>
            Please use &apos;Add New Course&apos; button to add your first
            course
          </Typography.Text>
        </>
      }
    >
      <AddNewCourseButton />
    </Empty>
  );
};

export default EmptyCoursesList;
