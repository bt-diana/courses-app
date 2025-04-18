import { Button, Input, Typography } from 'antd';
import { ChangeEventHandler, useEffect, useState } from 'react';
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

  const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setName((e.target as HTMLInputElement).value);
  };

  const onFinish: React.MouseEventHandler<HTMLElement> = () => {
    if (name?.trim()) {
      createAuthor(name.trim());
    } else {
      setError(true);
    }
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
          onChange={handleInput}
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
        onClick={onFinish}
        loading={isLoading(authorsStatus)}
      >
        Create author
      </Button>
    </div>
  );
};

export default CreateAuthor;
