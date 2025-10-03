import { useParams, Link } from 'react-router-dom';
import { useBooking } from '../hooks/useBookings';
import LoadingSpinner from '../components/LoadingSpinner';
import { formatDateTime, formatCurrency, getStatusColor } from '../utils/helpers';

const BookingDetail = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useBooking(id);

  if (isLoading) {
    return (
      <div className="py-12">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
        Failed to load booking.
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-12 text-gray-500">Booking not found.</div>
    );
  }

  const booking = data;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Booking #{booking.id}</h1>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
          {booking.status}
        </span>
      </div>

      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-gray-600 text-sm">Pickup</div>
            <div className="text-gray-900">{formatDateTime(booking.start)}</div>
          </div>
          <div>
            <div className="text-gray-600 text-sm">Return</div>
            <div className="text-gray-900">{formatDateTime(booking.end)}</div>
          </div>
          <div>
            <div className="text-gray-600 text-sm">Car</div>
            <div className="text-gray-900">{booking.car_detail?.name || booking.car}</div>
          </div>
          <div>
            <div className="text-gray-600 text-sm">Total</div>
            <div className="text-gray-900">{formatCurrency(booking.total_price)}</div>
          </div>
        </div>
        <div className="pt-4">
          <Link to="/bookings" className="text-indigo-600 hover:text-indigo-700 font-medium">← Back to bookings</Link>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;


