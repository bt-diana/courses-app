import '@testing-library/jest-dom';
import { screen, cleanup } from '@testing-library/react';
import { Course } from '../../types';
import CourseInfo from './CourseInfo';
import { MemoryRouter as Router } from 'react-router-dom';
import { renderWithProviders } from '../../helpers/testHelpers';

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

const courseDataTemplate: Course = {
  id: '',
  title: '',
  description: '',
  creationDate: '',
  duration: '',
  authors: '',
};

describe('CourseInfo', () => {
  afterEach(() => {
    cleanup();
  });

  test('should render course title', () => {
    const title = 'JavaScript';
    const mockCourseData: Course = { ...courseDataTemplate, title };
    renderWithProviders(
      <Router>
        <CourseInfo courseData={mockCourseData} />
      </Router>
    );
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  test('should render course description', () => {
    const description = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`;
    const mockCourseData: Course = { ...courseDataTemplate, description };
    renderWithProviders(
      <Router>
        <CourseInfo courseData={mockCourseData} />
      </Router>
    );
    expect(screen.getByText(description)).toBeInTheDocument();
  });

  test('should render course id', () => {
    const id = 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba';
    const mockCourseData: Course = { ...courseDataTemplate, id };
    renderWithProviders(
      <Router>
        <CourseInfo courseData={mockCourseData} />
      </Router>
    );
    expect(screen.getByText(id)).toBeInTheDocument();
  });

  test('should render course creation date', () => {
    const creationDate = '08.03.2021';
    const mockCourseData: Course = { ...courseDataTemplate, creationDate };
    renderWithProviders(
      <Router>
        <CourseInfo courseData={mockCourseData} />
      </Router>
    );
    expect(screen.getByText(creationDate)).toBeInTheDocument();
  });

  test('should render course duration', () => {
    const duration = '2:40 hours';
    const mockCourseData: Course = { ...courseDataTemplate, duration };
    renderWithProviders(
      <Router>
        <CourseInfo courseData={mockCourseData} />
      </Router>
    );
    expect(screen.getByText(duration)).toBeInTheDocument();
  });

  test('should render course authors', () => {
    const authors = 'Vasiliy Dobkin, Nicolas Kim, Anna Sidorenko';
    const mockCourseData: Course = { ...courseDataTemplate, authors };
    renderWithProviders(
      <Router>
        <CourseInfo courseData={mockCourseData} />
      </Router>
    );
    expect(screen.getByText(authors)).toBeInTheDocument();
  });
});
