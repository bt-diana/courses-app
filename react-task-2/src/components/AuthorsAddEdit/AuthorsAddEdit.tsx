import { Button, Card, Form, Input } from 'antd';
import './AuthorsAddEdit.css';
import { AuthorResource } from '../../types';
import { PlusOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons';
import { useState } from 'react';

type FieldType = {
  name?: string;
};

interface AuthorsAddEditProps {
  initialCourseAuthors?: string[];
  authorsResource: AuthorResource[];
}

const AuthorsAddEdit = ({
  initialCourseAuthors = [],
  authorsResource,
}: AuthorsAddEditProps) => {
  const authors: Record<string, string> = authorsResource.reduce(
    (acc, { id, name }) => ({
      ...acc,
      [id]: name,
    }),
    {}
  );
  const [courseAuthors, setCourseAuthors] =
    useState<string[]>(initialCourseAuthors);

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
                    console.log('click');
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
        <Form className="create-author-form">
          <Form.Item<FieldType>
            className="create-author-form-field"
            name="name"
            rules={[
              { required: true, message: 'Name is required' },
              {
                type: 'string',
                min: 2,
                message: 'Name must be at least 2 characters',
              },
            ]}
          >
            <Input placeholder="Author's name" />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Create author
          </Button>
        </Form>
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
      </Card>
    </div>
  );
};

export default AuthorsAddEdit;
