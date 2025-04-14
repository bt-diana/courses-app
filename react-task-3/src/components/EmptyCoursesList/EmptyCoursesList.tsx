import AddNewCourseButton from '../AddNewCourseButton/AddNewCourseButton';
import './EmptyCoursesList.css';
import { Empty, Typography } from 'antd';

const EmptyCoursesList = () => {
  return (
    <Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
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
