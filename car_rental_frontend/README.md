# Car Rental Frontend

A modern, responsive car rental application built with React, Redux, React Query, and Tailwind CSS.

## Features

- 🚗 Browse and search cars with advanced filters
- 🔐 User authentication (login, register, profile management)
- 📅 Book cars with date selection
- 💳 Integrated payment processing
- 👥 Multiple user roles (Customer, Fleet Manager)
- 📊 Fleet manager dashboard for car management
- ⭐ Car reviews and ratings
- 📱 Fully responsive design

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management for authentication
- **React Query (TanStack Query)** - Server state management
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Modern icon library
- **date-fns** - Date utility library

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API running (Django backend)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory (optional):
```env
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Layout.jsx
│   ├── CarCard.jsx
│   ├── ProtectedRoute.jsx
│   └── LoadingSpinner.jsx
├── pages/              # Page components
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── CarList.jsx
│   ├── CarDetail.jsx
│   ├── BookingList.jsx
│   ├── Profile.jsx
│   └── Dashboard.jsx
├── services/           # API service functions
│   ├── authService.js
│   ├── carService.js
│   └── bookingService.js
├── store/             # Redux store configuration
│   ├── store.js
│   └── authSlice.js
├── hooks/             # Custom React Query hooks
│   ├── useCars.js
│   └── useBookings.js
├── utils/             # Utility functions
│   └── helpers.js
├── config/            # Configuration files
│   └── api.js
├── App.jsx            # Main app component with routes
└── main.jsx           # Application entry point
```

## API Integration

The frontend integrates with the Django backend API with the following endpoints:

### Authentication
- `POST /api/v1/register/` - User registration
- `POST /api/v1/login/` - User login
- `POST /api/v1/logout/` - User logout
- `GET /api/v1/me/` - Get current user
- `POST /api/v1/change-password/` - Change password

### Cars
- `GET /api/v1/cars/` - List all cars
- `GET /api/v1/cars/:id/` - Get car details
- `POST /api/v1/cars/` - Create car (fleet managers)
- `PUT /api/v1/cars/:id/` - Update car (fleet managers)
- `DELETE /api/v1/cars/:id/` - Delete car (fleet managers)
- `GET /api/v1/cars/available/` - Get available cars
- `GET /api/v1/cars/popular/` - Get popular cars
- `GET /api/v1/cars/:id/reviews/` - Get car reviews
- `POST /api/v1/cars/:id/review/` - Create review

### Bookings
- `GET /api/v1/bookings/` - List bookings
- `GET /api/v1/bookings/:id/` - Get booking details
- `POST /api/v1/bookings/` - Create booking
- `POST /api/v1/bookings/:id/cancel/` - Cancel booking

### Payments
- `POST /api/v1/payment/create-intent/` - Create payment intent

## Features by User Role

### Customer
- Browse and search cars
- View car details and reviews
- Book cars
- Manage bookings
- View profile and change password

### Fleet Manager
- All customer features
- Add, edit, and delete cars
- Manage car inventory through dashboard
- Set car availability and pricing

## Configuration

### API Base URL

The API base URL is configured in `src/config/api.js`. By default, it's set to:
```javascript
export const API_BASE_URL = 'http://localhost:8000/api/v1';
```

Change this to match your backend URL if different.

### Authentication

Authentication tokens are stored in localStorage and automatically attached to API requests via Axios interceptors.

## Styling

The application uses Tailwind CSS for styling. The main color scheme uses indigo/purple gradients for a modern look.

Custom styles can be added in:
- `src/index.css` - Global styles and Tailwind directives
- `tailwind.config.js` - Tailwind configuration

## Development Notes

- React Query handles caching and invalidation for car and booking data
- Redux manages authentication state globally
- Protected routes automatically redirect unauthenticated users to login
- All forms include validation and error handling
- Responsive design works on mobile, tablet, and desktop

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready to deploy to any static hosting service.

## License

This project is part of a car rental management system.
