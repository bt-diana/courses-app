import './SearchBar.css';
import { Input } from 'antd';
import type { GetProps } from 'antd';

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

interface SearchBarProps {
  searchCourse: (value: string) => void;
}

const SearchBar = ({ searchCourse }: SearchBarProps) => {
  const onSearch: SearchProps['onSearch'] = (value: string) =>
    searchCourse(value);

  return <Search placeholder="Input text" onSearch={onSearch} enterButton />;
};

export default SearchBar;
