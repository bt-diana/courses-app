export type CourseResource = {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
};

export type Course = {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: string;
  authors: string;
};

export type AuthorResource = {
  id: string;
  name: string;
};

export type Author = {
  id: string;
  name: string;
};

export type User = {
  firstName: string;
  lastName: string;
};
