import { Author } from './author';

export type CourseResource = {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: Author[];
};

export type Course = {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: string;
  authors: string;
};
