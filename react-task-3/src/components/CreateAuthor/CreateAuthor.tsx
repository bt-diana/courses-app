import { Button, Input, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, getAuthorsStatus } from '../../store';
import { addAuthor } from '../../store/authorsSlice';
import { isLoading, isSucceeded } from '../../helpers/status';

const CreateAuthor = () => {
  const dispatch = useDispatch<AppDispatch>();

  const authorsStatus = useSelector(getAuthorsStatus);

  const [name, setName] = useState<string>();
  const [error, setError] = useState<boolean>();

  const createAuthor = (name: string) => {
    dispatch(addAuthor(name));
  };

  useEffect(() => {
    if (isSucceeded(authorsStatus)) {
      setName(undefined);
    }
  }, [authorsStatus]);

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
            createAuthor(name.trim());
          } else {
            setError(true);
          }
        }}
        loading={isLoading(authorsStatus)}
      >
        Create author
      </Button>
    </div>
  );
};

export default CreateAuthor;
