# Courses Web-Application (Fullstack)

This project is a **web application for searching, creating, and editing courses**.

The main goal of the project was to gain practical experience in building a **full-stack React + Node.js application**. The frontend is built with **React**, **Redux Toolkit**, and **Ant Design**, while the backend is a custom-built **Node.js** server built with **Express**, **TypeORM (PostgreSQL)** and **HTTPS** support for secure communication.

The frontend part was developed as part of a training project during the [RS EPAM Short Track Course](https://pr755.rs.school/courses/short-track) by The Rolling Scopes School.

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

## API Endpoints

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| GET    | /api/courses          | Get all courses          |
| POST   | /api/courses          | Create a new course      |
| PUT    | /api/courses/:id      | Update a course          |
| DELETE | /api/courses/:id      | Delete a course          |
| GET    | /api/authors          | Get all authors          |
| POST   | /api/authors          | Add a new author         |
| PUT    | /api/authors/:id      | Update an author         |
| DELETE | /api/authors/:id      | Delete an author         |


## Getting Started

To run the app locally:

1. Clone the repository:
  
  ```bash
  git clone https://github.com/bt-diana/courses-app.git
  ```

### Fronted Setup

1. Navigate to the project directory:

  ```bash
  cd courses-app/frontend
  ```

2. Install dependencies:

  ```bash
  npm install
  ```

3. Create a .env file by copying the provided example:
   
  ```bash
  cp .env.example .env
  ```

4. Adjust the `VITE_API_URL` in .env if necessary

5. To builds the project and start a local web server run the following commands:

  ```bash
  npm run build
  npm run preview
  ```

4. Open the app in your browser at http://localhost:5173

### Backend Setup

1. Navigate to the project directory:

  ```bash
  cd cd courses-app/backend
  ```

2. Install dependencies:

  ```bash
  npm install
  ```

3. Create a .env file by copying the provided example:

  ```bash
  cp .env.example .env
  ```

4. Fill in your environment variables in .env.

5. Build and start the backend server:

  ```bash
  npm run start:build
  npm run start:prod
  ```

By default, the backend will be available at https://localhost:4000

## Technologies Used

### Frontend
- React + TypeScript
- Redux Toolkit
- Context API
- Ant Design (Antd)
- Vite
- Jest + React Testing Library

### Backend
- Node.js
- Express
- TypeORM + PostgreSQL
- Dotenv

## License

This project is licensed under the MIT License.
