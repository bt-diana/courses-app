'use client';

import { Button, Card, Typography } from 'antd';
import './AuthorsAddEdit.css';
import { AuthorResource } from '../../types';
import { PlusOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import CreateAuthor from '../CreateAuthor/CreateAuthor';
import { AppDispatch, getAuthors, getCourseAuthors } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { addCourseAuthor, removeCourseAuthor } from '../../store/authorsSlice';

interface AuthorsAddEditProps {
  error: boolean;
}

const AuthorsAddEdit = ({ error }: AuthorsAddEditProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const authors = useSelector(getAuthors);
  const courseAuthors = useSelector(getCourseAuthors);

  const getAuthorsNames = (authors: AuthorResource[]) =>
    authors.reduce(
      (acc, { id, name }) => ({
        ...acc,
        [id]: name,
      }),
      {}
    );
  const [authorsNames, setAuthorsNames] = useState<Record<string, string>>(
    getAuthorsNames(authors)
  );

  useEffect(() => {
    setAuthorsNames(getAuthorsNames(authors));
  }, [authors]);

  return (
    <div className="authors-container">
      <Card title="Authors List" className="authors-list">
        {authors.map(({ id, name }) =>
          courseAuthors.includes(id) ? null : (
            <div key={id} className="author-container">
              <div className="author-name">{name}</div>
              <div className="author-options">
                <Button
                  onClick={() => {
                    dispatch(addCourseAuthor(id));
                  }}
                >
                  <PlusOutlined />
                </Button>
                <Button>
                  <DeleteOutlined />
                </Button>
              </div>
            </div>
          )
        )}
        <CreateAuthor />
      </Card>
      <Card title="Course Authors" className="course-authors">
        {courseAuthors.map((id) => (
          <div key={id} className="author-container">
            <div className="author-name">{authorsNames[id]}</div>
            <div className="author-options">
              <Button
                onClick={() => {
                  dispatch(removeCourseAuthor(id));
                }}
              >
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
