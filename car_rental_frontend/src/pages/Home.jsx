import { Link } from 'react-router-dom';
import { usePopularCars } from '../hooks/useCars';
import CarCard from '../components/CarCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { Search, Shield, Clock, DollarSign } from 'lucide-react';

const Home = () => {
  const { data: popularCars, isLoading } = usePopularCars();

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 text-white rounded-2xl p-8 md:p-16 mb-12 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Find Your Perfect Ride
          </h1>
          <p className="text-lg md:text-xl mb-8 text-indigo-100">
            Rent from the best selection of cars. Easy, fast, and affordable.
          </p>
          <Link
            to="/cars"
            className="inline-block bg-white text-indigo-600 font-bold px-8 py-4 rounded-xl hover:bg-indigo-50 hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Browse All Cars
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group">
          <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-100 transition-colors">
            <Search className="h-8 w-8 text-indigo-600" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-900">Easy Search</h3>
          <p className="text-gray-600 text-sm">Find the perfect car with our advanced filters</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group">
          <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-100 transition-colors">
            <Shield className="h-8 w-8 text-indigo-600" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-900">Secure Payment</h3>
          <p className="text-gray-600 text-sm">Safe and encrypted payment processing</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group">
          <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-100 transition-colors">
            <Clock className="h-8 w-8 text-indigo-600" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-900">24/7 Support</h3>
          <p className="text-gray-600 text-sm">Round-the-clock customer assistance</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 text-center group">
          <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-100 transition-colors">
            <DollarSign className="h-8 w-8 text-indigo-600" />
          </div>
          <h3 className="font-bold text-lg mb-2 text-gray-900">Best Prices</h3>
          <p className="text-gray-600 text-sm">Competitive rates with no hidden fees</p>
        </div>
      </div>

      {/* Popular Cars Section */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Popular Cars</h2>
          <Link to="/cars" className="text-indigo-600 hover:text-indigo-700 font-bold text-lg hover:underline transition-all">
            View All →
          </Link>
        </div>

        {isLoading ? (
          <div className="py-12">
            <LoadingSpinner />
          </div>
        ) : popularCars && popularCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCars.slice(0, 6).map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500">No cars available at the moment.</p>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white rounded-2xl p-12 md:p-16 text-center overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20"></div>
        <div className="relative">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">Ready to Hit the Road?</h2>
          <p className="text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Join thousands of satisfied customers and book your car today!
          </p>
          <Link
            to="/register"
            className="inline-block bg-indigo-600 text-white font-bold px-10 py-4 rounded-xl hover:bg-indigo-700 hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;


