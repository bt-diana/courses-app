import { Button, Input, Typography } from 'antd';
import { useState } from 'react';

interface CreateAuthorProps {
  createAuthor: (name: string) => Promise<void>;
}

const CreateAuthor = ({ createAuthor }: CreateAuthorProps) => {
  const [name, setName] = useState<string>();
  const [error, setError] = useState<boolean>();
  const [isLoading, setIsLoading] = useState<boolean>();

  return (
    <div className="create-author-form">
      <div className="create-author-form-field">
        <Input
          placeholder="Author's name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          status={error ? 'error' : ''}
          onFocus={() => {
            setError(false);
          }}
        />
        <Typography.Text type="danger" className="create-author-form-error">
          {error
            ? "Author's name should have at least 2 non-space characters"
            : null}
        </Typography.Text>
      </div>
      <Button
        type="primary"
        onClick={() => {
          if (name?.trim()) {
            setIsLoading(true);
            createAuthor(name.trim()).then(() => {
              setIsLoading(false);
              setName(undefined);
            });
          } else {
            setError(true);
          }
        }}
        loading={isLoading}
      >
        Create author
      </Button>
    </div>
  );
};

export default CreateAuthor;
