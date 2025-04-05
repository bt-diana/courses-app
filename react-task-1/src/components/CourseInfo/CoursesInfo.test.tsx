import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Course } from '../../types';
import CourseInfo from './CourseInfo';

const courseDataTemplate: Course = {
  id: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
  title: 'JavaScript',
  description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`,
  creationDate: '08/03/2021',
  duration: 160,
  authors: ['Vasiliy Dobkin', 'Nicolas Kim', 'Anna Sidorenko'],
};

describe('CourseInfo', () => {
  test('should render course title', () => {
    const title = 'JavaScript';
    const mockCourseData = { ...courseDataTemplate, title };
    render(<CourseInfo courseData={mockCourseData} closeCourse={jest.fn()} />);
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  test('should render course description', () => {
    const description = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`;
    const mockCourseData = { ...courseDataTemplate, description };
    render(<CourseInfo courseData={mockCourseData} closeCourse={jest.fn()} />);
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  test('should render course id', () => {
    const id = 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba';
    const mockCourseData = { ...courseDataTemplate, id };
    render(<CourseInfo courseData={mockCourseData} closeCourse={jest.fn()} />);
    expect(screen.getByText(id)).toBeInTheDocument();
  });

  test('should render course creation date', () => {
    const creationDate = '08/03/2021';
    const creationDateFormatted = '08.03.2021';
    const mockCourseData = { ...courseDataTemplate, creationDate };
    render(<CourseInfo courseData={mockCourseData} closeCourse={jest.fn()} />);
    expect(screen.getByText(creationDateFormatted)).toBeInTheDocument();
  });

  test('should render course duration', () => {
    const duration = 160;
    const durationFormatted = '2:40 hours';
    const mockCourseData = { ...courseDataTemplate, duration };
    render(<CourseInfo courseData={mockCourseData} closeCourse={jest.fn()} />);
    expect(screen.getByText(durationFormatted)).toBeInTheDocument();
  });

  test('should render course authors', () => {
    const authors = ['Vasiliy Dobkin', 'Nicolas Kim', 'Anna Sidorenko'];
    const authorsFormatted = 'Vasiliy Dobkin, Nicolas Kim, Anna Sidorenko';
    const mockCourseData = { ...courseDataTemplate, authors };
    render(<CourseInfo courseData={mockCourseData} closeCourse={jest.fn()} />);
    expect(screen.getByText(authorsFormatted)).toBeInTheDocument();
  });
});
