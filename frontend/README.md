# Courses Web-Application

This project is a **web application for searching, creating, and editing courses**.

The main goal of the project was to gain practical experience in building a **React application** with modern tools and libraries, such as **Ant Design**, **Redux Toolkit**, and **asynchronous API handling** via `createAsyncThunk`. Users are fetched from [dummy json](https://dummyjson.com/docs/auth). All other data is fetched from a [mock API](https://mockapi.io/).

This web app was developed as part of a training project during the [RS EPAM Short Track Course](https://pr755.rs.school/courses/short-track) by The Rolling Scopes School.

[Demo](https://fanciful-wisp-7ee5e5.netlify.app/)  
Login: `emilys`  
Password: `emilyspass`

## Features

### Authentication
- **Login Page:** Simple login form with credential check and token storage.
- **Protected Routes:** Access to the application is restricted to logged-in users only.

### Courses Page
- **Course List with Search and Filter:** Browse all available courses.
- **Add New Course:** A form to create a new course with validation and authors selection.
- **Edit Course:** Edit existing course data with form state pre-filled.
- **Delete Course:** Remove a course from the list.

### Course Info Page
- **Course Details:** View full information about a selected course, including description, duration, authors, and creation date.

## Getting Started

To run the app locally:

1. Clone the repository:
  
  ```bash
  git clone https://github.com/bt-diana/courses-app.git
  ```

2. Navigate to the project directory:

  ```bash
  cd courses-app/frontend
  ```

3. Install dependencies:

  ```bash
  npm install
  ```

4. To builds the project and start a local web server run the following commands:

  ```bash
  npm run build
  npm run preview
  ```

5. Open the app in your browser at http://localhost:5173

## Technologies Used

- React + TypeScript
- Context API
- Redux Toolkit
- Ant Design (Antd)
- Jest + React Testing Library
- Vite

## License

This project is licensed under the MIT License.
