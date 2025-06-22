import { Button, Card, Typography } from 'antd';
import './AuthorsAddEdit.css';
import { Author } from '../../types';
import { PlusOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons';
import CreateAuthor from '../CreateAuthor/CreateAuthor';
import { AppDispatch, getAuthors, getCourseAuthors } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCourseAuthor,
  removeAuthor,
  removeCourseAuthor,
} from '../../store/authorsSlice';

interface AuthorsAddEditProps {
  error: boolean;
}

const AuthorsAddEdit = ({ error }: AuthorsAddEditProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const authors = useSelector(getAuthors);
  const courseAuthors = useSelector(getCourseAuthors);

  const addAuthorHandler = (author: Author) => () =>
    dispatch(addCourseAuthor(author));
  const removeAuthorHandler = (id: string) => () =>
    dispatch(removeCourseAuthor(id));
  const deleteAuthor = (id: string) => () => dispatch(removeAuthor(id));

  return (
    <div className="authors-container">
      <Card title="Authors List" className="authors-list">
        {authors.map((author) =>
          courseAuthors.find(({ id }) => id === author.id) ? null : (
            <div key={author.id} className="author-container">
              <div className="author-name">{author.name}</div>
              <div className="author-options">
                <Button onClick={addAuthorHandler(author)}>
                  <PlusOutlined />
                </Button>
                <Button>
                  <DeleteOutlined onClick={deleteAuthor(author.id)} />
                </Button>
              </div>
            </div>
          )
        )}
        <CreateAuthor />
      </Card>
      <Card title="Course Authors" className="course-authors">
        {courseAuthors.map((author) => (
          <div key={author.id} className="author-container">
            <div className="author-name">{author.name}</div>
            <div className="author-options">
              <Button onClick={removeAuthorHandler(author.id)}>
                <CloseOutlined />
              </Button>
            </div>
          </div>
        ))}
        {error && (
          <Typography.Text type="danger">
            Course chould include at least 2 authors
          </Typography.Text>
        )}
      </Card>
    </div>
  );
};

export default AuthorsAddEdit;
