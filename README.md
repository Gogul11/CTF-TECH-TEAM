# Developer Community - Full-Stack Application

This full-stack application serves as a user management platform for a developer community, featuring user authentication, profile management, and the ability to view and register profiles. Built with React on the frontend and a Node.js backend, the application employs various technologies to enhance user experience and functionality.

## Key Features

### User Authentication
- Users can register and log in using their credentials.
- Login and registration forms utilize **Zod** for frontend validation, ensuring data integrity and providing real-time feedback for user input.

### Profile Management
- Users can create, view, and manage their profiles.
- The application supports dynamic routing, allowing developers to view other developers' profiles and access additional information based on the profile ID.

### Email Notifications
- After successful registration, users receive a confirmation email using **Nodemailer**. This feature enhances user engagement and confirms successful account creation.

### Responsive Routing
- The application utilizes **React Router** for client-side routing, enabling smooth navigation between different components without page reloads.
  
#### Key Routes
- Home (`/`)
- Login (`/login`)
- Signup (`/signup`)
- Profiles (`/profiles`)
- Profile Info (`/profiles/info/:id`)
- User Profile (`/profiles/myprofile/:id`)

## Technology Stack

- **Frontend**: React, Zod for form validation
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Email Service**: Nodemailer for sending emails

## Application Structure

The application consists of several key components:
- **Main**: The landing page of the application.
- **Login**: The component handling user login functionality.
- **Register**: The component for new user registration.
- **Profiles**: A component that lists user profiles.
- **Info**: A component displaying detailed information about a specific profile.
- **MyProfile**: A component for users to view and manage their personal profile.

## Conclusion

This full-stack application effectively integrates user authentication, profile management, and email notifications, providing a comprehensive solution for user management within a developer community.
