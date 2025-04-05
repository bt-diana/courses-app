import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Course } from '../../types';
import Courses from './Courses';

const courseDataTemplate: Course = {
  id: '',
  title: '',
  description: '',
  creationDate: '',
  duration: '',
  authors: '',
};

describe('Courses', () => {
  test('should render search bar', () => {
    const mockCurrentCoursesList: Course[] = Array.from({ length: 3 }, () => ({
      ...courseDataTemplate,
    }));
    render(
      <Courses
        courses={mockCurrentCoursesList}
        openCourse={jest.fn()}
        restoreCourses={jest.fn()}
      />
    );
    expect(screen.getByPlaceholderText('Input text')).toBeInTheDocument();
  });

  test("should render 'add new course' button", () => {
    const mockCurrentCoursesList: Course[] = Array.from({ length: 3 }, () => ({
      ...courseDataTemplate,
    }));
    render(
      <Courses
        courses={mockCurrentCoursesList}
        openCourse={jest.fn()}
        restoreCourses={jest.fn()}
      />
    );
    expect(
      screen.getByRole('button', { name: 'Add New Course' })
    ).toBeInTheDocument();
  });

  test('should render current courses list', () => {
    const coursesTitles = ['Javascript', 'Angular', 'React'];
    const mockCurrentCoursesList: Course[] = Array.from(
      { length: coursesTitles.length },
      (_, i) => ({
        ...courseDataTemplate,
        title: coursesTitles[i],
      })
    );
    render(
      <Courses
        courses={mockCurrentCoursesList}
        openCourse={jest.fn()}
        restoreCourses={jest.fn()}
      />
    );
    coursesTitles.forEach((title) =>
      expect(screen.getByText(title)).toBeInTheDocument()
    );
  });

  test('should render empty course list placeholder if no courses available', () => {
    const mockCurrentCoursesList: Course[] = [];
    render(
      <Courses
        courses={mockCurrentCoursesList}
        openCourse={jest.fn()}
        restoreCourses={jest.fn()}
      />
    );
    expect(screen.getByText('Your list is empty')).toBeInTheDocument();
    expect(
      screen.getByText(
        "Please use 'Add New Course' button to add your first course"
      )
    ).toBeInTheDocument();
  });

  test("should render 'add new course' button if no courses available", () => {
    const mockCurrentCoursesList: Course[] = [];
    render(
      <Courses
        courses={mockCurrentCoursesList}
        openCourse={jest.fn()}
        restoreCourses={jest.fn()}
      />
    );
    expect(
      screen.getByRole('button', { name: 'Add New Course' })
    ).toBeInTheDocument();
  });
});
