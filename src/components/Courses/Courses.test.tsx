import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
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
  test("should render 'add new course' button", () => {
    const mockCurrentCoursesList: Course[] = Array.from({ length: 3 }, () => ({
      ...courseDataTemplate,
    }));
    render(<Courses courses={mockCurrentCoursesList} />);
    expect(
      screen.getByRole('button', { name: 'Add New Course' })
    ).toBeInTheDocument();
  });

  test('should render empty course list placeholder if no courses available', () => {
    const mockCurrentCoursesList: Course[] = [];
    render(<Courses courses={mockCurrentCoursesList} />);
    expect(screen.getByText('Your list is empty')).toBeInTheDocument();
    expect(
      screen.getByText(
        "Please use 'Add New Course' button to add your first course"
      )
    ).toBeInTheDocument();
  });

  test("should render 'add new course' button if no courses available", () => {
    const mockCurrentCoursesList: Course[] = [];
    render(<Courses courses={mockCurrentCoursesList} />);
    expect(
      screen.getByRole('button', { name: 'Add New Course' })
    ).toBeInTheDocument();
  });
});

describe('Search bar on Courses page', () => {
  test('should be rendered', () => {
    const mockCurrentCoursesList: Course[] = Array.from({ length: 3 }, () => ({
      ...courseDataTemplate,
    }));
    render(<Courses courses={mockCurrentCoursesList} />);
    expect(screen.getByPlaceholderText('Input text')).toBeInTheDocument();
  });

  test('should filter courses by title or description after clicking search button', () => {
    const coursesTitles = ['Javascript', 'Angular', 'React'];
    const coursesDescriptions = [
      'This is Javascript.',
      'This is not Javascript.',
      'This is React.',
    ];
    const mockCurrentCoursesList: Course[] = Array.from(
      { length: coursesTitles.length },
      (_, i) => ({
        ...courseDataTemplate,
        title: coursesTitles[i],
        description: coursesDescriptions[i],
      })
    );
    render(<Courses courses={mockCurrentCoursesList} />);
    fireEvent.change(screen.getByPlaceholderText('Input text'), {
      target: { value: 'java' },
    });
    fireEvent.click(
      screen.getByPlaceholderText('Input text').nextSibling
        ?.childNodes[0] as Element
    );
    expect(screen.getByText('Javascript')).toBeInTheDocument();
    expect(screen.getByText('Angular')).toBeInTheDocument();
    expect(screen.queryByText('React')).not.toBeInTheDocument();
  });
});

describe('Each CourseCard in CourseList on Courses page', () => {
  test('should render course title', () => {
    const coursesTitles = ['Javascript', 'Angular', 'React'];
    const mockCurrentCoursesList: Course[] = Array.from(
      { length: coursesTitles.length },
      (_, i) => ({
        ...courseDataTemplate,
        title: coursesTitles[i],
      })
    );
    render(<Courses courses={mockCurrentCoursesList} />);
    coursesTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  test('should render course description', () => {
    const coursesAmount = 3;
    const description = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`;
    const mockCurrentCoursesList: Course[] = Array.from(
      { length: coursesAmount },
      () => ({
        ...courseDataTemplate,
        description,
      })
    );
    render(<Courses courses={mockCurrentCoursesList} />);
    expect(screen.getAllByText(description).length).toBe(coursesAmount);
  });

  test('should render course creation date', () => {
    const coursesDates = ['08.03.2021', '10.12.2024', '03.03.2023'];
    const mockCurrentCoursesList: Course[] = Array.from(
      { length: coursesDates.length },
      (_, i) => ({
        ...courseDataTemplate,
        creationDate: coursesDates[i],
      })
    );
    render(<Courses courses={mockCurrentCoursesList} />);
    coursesDates.forEach((date) => {
      expect(screen.getByText(date)).toBeInTheDocument();
    });
  });

  test('should render course duration', () => {
    const coursesDurations = ['2:40 hours', '3:15 hours', '1:00 hours'];
    const mockCurrentCoursesList: Course[] = Array.from(
      { length: coursesDurations.length },
      (_, i) => ({
        ...courseDataTemplate,
        duration: coursesDurations[i],
      })
    );
    render(<Courses courses={mockCurrentCoursesList} />);
    coursesDurations.forEach((duration) => {
      expect(screen.getByText(duration)).toBeInTheDocument();
    });
  });

  test('should render course authors', () => {
    const coursesAmount = 3;
    const authors = 'Vasiliy Dobkin, Nicolas Kim, Anna Sidorenko';
    const mockCurrentCoursesList: Course[] = Array.from(
      { length: coursesAmount },
      () => ({
        ...courseDataTemplate,
        authors,
      })
    );
    render(<Courses courses={mockCurrentCoursesList} />);
    expect(screen.getAllByText(authors).length).toBe(coursesAmount);
  });

  test("should call openCourse function on 'Show course' button click", () => {
    const mockCurrentCoursesList: Course[] = Array.from({ length: 1 }, () => ({
      ...courseDataTemplate,
    }));
    const mockOpenCourse = jest.fn();
    render(<Courses courses={mockCurrentCoursesList} />);
    fireEvent.click(screen.getByText('Show course'));
    expect(mockOpenCourse).toHaveBeenCalledTimes(1);
  });
});
