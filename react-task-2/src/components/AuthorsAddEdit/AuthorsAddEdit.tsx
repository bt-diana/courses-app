'use client';

import { Button, Card, Typography } from 'antd';
import './AuthorsAddEdit.css';
import { AuthorResource } from '../../types';
import { PlusOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons';
import { useState } from 'react';
import postAuthor from '../../api/postAuthor';
import CreateAuthor from '../CreateAuthor/CreateAuthor';

interface AuthorsAddEditProps {
  courseAuthors: string[];
  setCourseAuthors: (authors: string[]) => void;
  authorsResource: AuthorResource[];
  error: boolean;
}

const AuthorsAddEdit = ({
  courseAuthors,
  setCourseAuthors,
  authorsResource,
  error,
}: AuthorsAddEditProps) => {
  const [authors, setAuthors] = useState<Record<string, string>>(
    authorsResource.reduce(
      (acc, { id, name }) => ({
        ...acc,
        [id]: name,
      }),
      {}
    )
  );

  const createAuthor = (name: string) =>
    postAuthor(name).then(({ id, name }) => {
      setAuthors({ ...authors, [id]: name });
    });

  return (
    <div className="authors-container">
      <Card title="Authors List" className="authors-list">
        {Object.entries(authors).map(([id, name]) =>
          courseAuthors.includes(id) ? null : (
            <div key={id} className="author-container">
              <div className="author-name">{name}</div>
              <div className="author-options">
                <Button
                  onClick={() => {
                    setCourseAuthors([...courseAuthors, id]);
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
        <CreateAuthor createAuthor={createAuthor} />
      </Card>
      <Card title="Course Authors" className="course-authors">
        {courseAuthors.map((id) => (
          <div key={id} className="author-container">
            <div className="author-name">{authors[id]}</div>
            <div className="author-options">
              <Button
                onClick={() => {
                  setCourseAuthors(
                    courseAuthors.filter((authorId) => authorId !== id)
                  );
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
