# 🚗 Car Rental System

A full-stack car rental application with Django REST Framework backend and React frontend.

## ✨ Features

- 🔐 User authentication with JWT
- 🚗 Browse and search cars
- 📅 Book cars with date selection
- 💳 Stripe payment integration
- ⭐ Review and rating system
- 👨‍💼 Fleet manager dashboard
- 📱 Responsive design
- 🎨 Modern UI with Tailwind CSS

## 🚀 Quick Start

### Prerequisites
- Python 3.12+
- Node.js 18+
- npm

### Start the Application

1. **Start Backend** (Terminal 1)
```bash
cd car_rental_backend
.venv\Scripts\activate
python manage.py runserver
```

2. **Start Frontend** (Terminal 2)
```bash
cd car_rental_frontend
npm run dev
```

3. **Open Browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/api/docs/

## 📦 Installation

### Backend Setup
```bash
cd car_rental_backend
uv sync
python manage.py migrate
python manage.py createsuperuser
```

### Frontend Setup
```bash
cd car_rental_frontend
npm install
```

## 🧪 Add Sample Data

```bash
cd car_rental_backend
python manage.py shell
```

```python
from cars.models import Car
from users.models import User

# Create fleet manager
fleet = User.objects.create_user(
    username='fleetmanager',
    password='TestPass123!',
    role='fleet',
    email='fleet@example.com'
)

# Create sample car
Car.objects.create(
    owner=fleet,
    name='Tesla Model 3',
    make='Tesla',
    model='Model 3',
    year=2024,
    seats=5,
    transmission='automatic',
    fuel_type='electric',
    price_per_day=120.00,
    location='San Francisco, CA',
    description='Luxury electric sedan',
    is_active=True
)
```

## 📚 Documentation

- [**START HERE**](START_HERE.md) - Quick start guide
- [**Quick Start Guide**](QUICK_START.md) - Detailed setup
- [**Final Status**](FINAL_STATUS.md) - Complete testing guide
- [**Integration Summary**](INTEGRATION_SUMMARY.md) - Integration details
- [**Backend Review**](car_rental_backend/BACKEND_REVIEW.md) - Backend analysis

## 🏗️ Tech Stack

### Backend
- Django 5.2.6
- Django REST Framework
- JWT Authentication
- SQLite (dev) / PostgreSQL (prod)
- Stripe for payments
- Swagger/OpenAPI docs

### Frontend
- React 19
- Vite 7
- Tailwind CSS 3
- Redux Toolkit
- React Router
- Axios
- React Query

## 📁 Project Structure

```
car_rental/
├── car_rental_backend/       # Django backend
│   ├── backend/              # Settings & config
│   ├── users/                # User authentication
│   ├── cars/                 # Car management
│   ├── bookings/             # Booking system
│   └── manage.py
│
└── car_rental_frontend/      # React frontend
    ├── src/
    │   ├── pages/            # Page components
    │   ├── components/       # Reusable components
    │   ├── services/         # API services
    │   ├── store/            # Redux store
    │   └── hooks/            # Custom hooks
    └── package.json
```

## 🔑 API Endpoints

### Public
- `GET /api/v1/cars/` - List cars
- `GET /api/v1/cars/{id}/` - Car details
- `POST /api/v1/register/` - Register
- `POST /api/v1/login/` - Login

### Protected
- `GET /api/v1/me/` - User profile
- `POST /api/v1/bookings/` - Create booking
- `GET /api/v1/bookings/` - List bookings

## 🧪 Testing

Access API documentation:
- Interactive Swagger UI: http://localhost:8000/api/docs/
- OpenAPI Schema: http://localhost:8000/api/schema/

## 🐛 Troubleshooting

### Backend Issues
```bash
cd car_rental_backend
uv sync
python manage.py migrate
```

### Frontend Issues
```bash
cd car_rental_frontend
rm -rf node_modules package-lock.json
npm install
```

### CORS Errors
- Ensure backend is running on port 8000
- Check `CORS_ALLOWED_ORIGINS` in settings.py

## 📝 Environment Variables

Create `.env` in `car_rental_backend/`:
```env
DJANGO_SECRET_KEY=your-secret-key
DJANGO_DEBUG=true
STRIPE_SECRET_KEY=your-stripe-key
```

## 🚀 Deployment

### Backend (Production)
- Set `DEBUG=False`
- Use PostgreSQL
- Configure AWS S3 for media
- Set up HTTPS
- Add rate limiting

### Frontend (Production)
- Build: `npm run build`
- Deploy to Vercel/Netlify
- Update API_BASE_URL

## 📄 License

This project is for educational purposes.

## 🤝 Contributing

Pull requests are welcome!

## 📞 Support

For issues and questions, check the documentation files or create an issue.

---

**Built with ❤️ using Django and React**

