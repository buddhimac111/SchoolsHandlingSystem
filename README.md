# School Management System

An advanced School Management System developed to streamline various administrative and academic processes, improving efficiency and accessibility for administrators, teachers, and students. This system provides a web application for administrators and teachers and a mobile application for students, offering various features like timetable management, examination result management, automated grading, and more.

## Features

-   Efficient Timetable Management
-   Secure Examination Result Management
-   Automated Grading System and E-Report Card Generation
-   Digitalization of Certificate Generation
-   Enhanced Accessibility to Personal Details and Marks
-   Improved Data Management and Correction System for Student Details
-   Enabling Teachers to Insert Examination Results into a Database

## Technologies Used

-   Backend:
    -   MongoDB (Database)
    -   Express JS (Web Framework)
    -   Node JS (JavaScript Runtime)
-   Frontend:
    -   React JS (JavaScript Library)
    -   Mobile: Flutter (Mobile App Framework)
-   UI: Bootstrap (Front-End Framework)

## Installation

1. **Clone the Repository**

```bash
git clone https://github.com/your-username/school-management-system.git
```

2. **Install Dependencies**

**Backend**

-   Navigate to the `backend` directory
-   Run `npm install` to install dependencies

**Frontend**

-   Navigate to the `frontend` directory
-   Run `npm install` to install dependencies

3. **Database Setup**

**Import Database (Optional)**

-   Replace `/path/to/sourcecode/backend/database/dump/SchoolSystem_development` with the actual path to the database dump file on your system.
-   Open a terminal in the root directory of the project and run:

```bash
mongorestore --db SchoolSystem_development --drop /path/to/sourcecode/backend/database/dump/SchoolSystem_development
```

4. **Run the Application**

**Backend**

-   Open a terminal in the `backend` directory
-   Run `npm run dev` to start the development server

**Frontend**

-   Open a terminal in the `frontend` directory
-   Run `npm start` to start the frontend development server

### Getting Started - Web Application

1. Open your web browser and navigate to `http://localhost:3000` (or the port specified by the backend server).
2. Enter your login credentials (email and password) to access the system.
3. Once logged in, you'll be taken to the dashboard with functionalities specific to your user role.

## User Roles and Functionalities

-   **Divisional Administrator**
    -   Create school administrator profiles and add schools to the system.
    -   Manage subjects within the system.
-   **School Administrator**
    -   View summaries of student marks.
    -   Create and manage teacher and student accounts.
    -   Manage timetables and classes.
    -   Change personal account credentials.
-   **Teacher**
    -   View summaries of student marks in their classes.
    -   View student profiles.
    -   Add student marks for semesters or terms.

## Contributors

This project was developed by:

-   [Iddhi](https://github.com/iddhi-sulakshana)
-   [Chamodh](https://github.com/chamodhpereira)
-   [Chanaka](https://github.com/gncranasingha)
-   [Pramodh](https://github.com/PramodMannapperuma)
-   [Vihansi](https://github.com/VihansiPerera)
-   [Buddhima](https://github.com/buddhimac111)

## Contributing

Contributions are welcome! Please submit a pull request or open an issue to discuss any improvements or feature additions.

## Contact

For any inquiries or feedback, please raise an issue on the GitHub repository.

## Screenshots

### Admin Dashboard

![Admin Dashboard](/screenshots/1.jpg)

### Teachers Dashboard

![Teachers Dashboard](/screenshots/2.jpg)

### Mobile Dashboard

![Mobile Dashboard](/screenshots/3.jpg)

### Mobile Report Card

![Mobile Report Card](/screenshots/4.jpg)

### Student Profile

![Student Profile](/screenshots/5.jpg)

**License**

This project is licensed under the MIT License (see LICENSE.md for details).
