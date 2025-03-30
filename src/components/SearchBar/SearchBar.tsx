import './SearchBar.css';
import { Input } from 'antd';
import type { GetProps } from 'antd';

type SearchProps = GetProps<typeof Input.Search>;

const { Search } = Input;

const onSearch: SearchProps['onSearch'] = (value) => console.log(value);

const SearchBar = () => {
  return <Search placeholder="Input text" onSearch={onSearch} enterButton />;
};

export default SearchBar;
