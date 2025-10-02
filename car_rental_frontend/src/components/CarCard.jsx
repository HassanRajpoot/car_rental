import { Link } from 'react-router-dom';
import { MapPin, Users, Gauge, Star } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

const CarCard = ({ car }) => {
  return (
    <Link to={`/cars/${car.id}`} className="block group">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1">
        {/* Car Image */}
        <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          {car.primary_image ? (
            <img
              src={car.primary_image}
              alt={car.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <Gauge className="h-20 w-20" />
            </div>
          )}
          {car.average_rating > 0 && (
            <div className="absolute top-3 right-3 bg-white px-3 py-2 rounded-lg shadow-md flex items-center backdrop-blur-sm bg-white/95">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm font-bold">{car.average_rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Car Details */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">{car.name}</h3>
          <p className="text-sm text-gray-500 mb-4">
            {car.make} {car.model} {car.year}
          </p>

          <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
            <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg">
              <Users className="h-4 w-4 mr-1.5 text-indigo-600" />
              <span className="font-medium">{car.seats} seats</span>
            </div>
            <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg">
              <Gauge className="h-4 w-4 mr-1.5 text-indigo-600" />
              <span className="font-medium capitalize">{car.transmission}</span>
            </div>
          </div>

          <div className="flex items-center text-sm text-gray-600 mb-4 bg-gray-50 px-3 py-2 rounded-lg">
            <MapPin className="h-4 w-4 mr-2 text-indigo-600 flex-shrink-0" />
            <span className="font-medium truncate">{car.location}</span>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div>
              <span className="text-3xl font-extrabold text-indigo-600">
                {formatCurrency(car.price_per_day)}
              </span>
              <span className="text-sm text-gray-500 font-medium">/day</span>
            </div>
            {car.review_count > 0 && (
              <span className="text-sm text-gray-500 font-medium">
                {car.review_count} {car.review_count === 1 ? 'review' : 'reviews'}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CarCard;


