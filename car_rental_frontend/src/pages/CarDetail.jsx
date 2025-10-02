import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useCar } from '../hooks/useCars';
import { useCreateBooking } from '../hooks/useBookings';
import LoadingSpinner from '../components/LoadingSpinner';
import { MapPin, Users, Gauge, Fuel, Calendar, Star, DollarSign } from 'lucide-react';
import { formatCurrency, formatDateTimeForAPI, calculateDays, getErrorMessage } from '../utils/helpers';

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { data: car, isLoading, error } = useCar(id);
  const createBooking = useCreateBooking();

  const [bookingDates, setBookingDates] = useState({
    start: '',
    end: '',
  });
  const [bookingError, setBookingError] = useState('');

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingError('');

    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      const bookingData = {
        car: id,
        start: formatDateTimeForAPI(new Date(bookingDates.start)),
        end: formatDateTimeForAPI(new Date(bookingDates.end)),
      };

      const result = await createBooking.mutateAsync(bookingData);
      navigate(`/bookings/${result.id}`);
    } catch (error) {
      setBookingError(getErrorMessage(error));
    }
  };

  const totalDays = calculateDays(bookingDates.start, bookingDates.end);
  const totalPrice = car ? totalDays * parseFloat(car.price_per_day) : 0;

  if (isLoading) {
    return (
      <div className="py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
        Car not found or error loading details.
      </div>
    );
  }

  return (
    <div>
      {/* Car Images */}
      <div className="bg-white rounded-lg shadow-md mb-8">
        {car.images && car.images.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            {car.images.map((image, index) => (
              <img
                key={index}
                src={image.file}
                alt={image.alt || car.name}
                className="w-full h-64 object-cover rounded-lg"
              />
            ))}
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center bg-gray-200 rounded-lg">
            <Gauge className="h-24 w-24 text-gray-400" />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Car Details */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{car.name}</h1>
            <p className="text-xl text-gray-600 mb-4">
              {car.make} {car.model} {car.year}
            </p>

            {car.average_rating > 0 && (
              <div className="flex items-center mb-4">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="ml-1 font-medium">{car.average_rating.toFixed(1)}</span>
                <span className="ml-2 text-gray-500">
                  ({car.review_count} {car.review_count === 1 ? 'review' : 'reviews'})
                </span>
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center text-gray-600">
                <Users className="h-5 w-5 mr-2" />
                <span>{car.seats} seats</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Gauge className="h-5 w-5 mr-2" />
                <span className="capitalize">{car.transmission}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Fuel className="h-5 w-5 mr-2" />
                <span className="capitalize">{car.fuel_type}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{car.location}</span>
              </div>
            </div>

            {car.description && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-600">{car.description}</p>
              </div>
            )}

            {car.feature_list && car.feature_list.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Features</h2>
                <div className="flex flex-wrap gap-2">
                  {car.feature_list.map((feature, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Reviews */}
          {car.reviews && car.reviews.length > 0 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Reviews</h2>
              <div className="space-y-4">
                {car.reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-center mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 font-medium">{review.user_name}</span>
                    </div>
                    {review.title && (
                      <h3 className="font-semibold mb-1">{review.title}</h3>
                    )}
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Booking Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <div className="mb-6">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-indigo-600">
                  {formatCurrency(car.price_per_day)}
                </span>
                <span className="text-gray-500 ml-2">/day</span>
              </div>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Pickup Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={bookingDates.start}
                  onChange={(e) => setBookingDates({ ...bookingDates, start: e.target.value })}
                  required
                  min={new Date().toISOString().slice(0, 16)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Return Date & Time
                </label>
                <input
                  type="datetime-local"
                  value={bookingDates.end}
                  onChange={(e) => setBookingDates({ ...bookingDates, end: e.target.value })}
                  required
                  min={bookingDates.start || new Date().toISOString().slice(0, 16)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {totalDays > 0 && (
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium">{totalDays} {totalDays === 1 ? 'day' : 'days'}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total:</span>
                    <span className="text-indigo-600">{formatCurrency(totalPrice)}</span>
                  </div>
                </div>
              )}

              {bookingError && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                  {bookingError}
                </div>
              )}

              <button
                type="submit"
                disabled={createBooking.isPending || !bookingDates.start || !bookingDates.end}
                className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {createBooking.isPending ? (
                  <LoadingSpinner size="sm" />
                ) : (
                  <>
                    <DollarSign className="h-5 w-5 mr-2" />
                    {isAuthenticated ? 'Book Now' : 'Login to Book'}
                  </>
                )}
              </button>
            </form>

            {!isAuthenticated && (
              <p className="text-xs text-gray-500 text-center mt-4">
                You need to login to make a booking
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetail;


