import { useBookings, useCancelBooking } from '../hooks/useBookings';
import LoadingSpinner from '../components/LoadingSpinner';
import { Calendar, Car, DollarSign, MapPin, X } from 'lucide-react';
import { formatDateTime, formatCurrency, getStatusColor } from '../utils/helpers';
import { useState } from 'react';

const BookingList = () => {
  const { data, isLoading, error } = useBookings();
  const cancelBooking = useCancelBooking();
  const [cancellingId, setCancellingId] = useState(null);
  const [confirmId, setConfirmId] = useState(null);
  const [actionError, setActionError] = useState('');

  const handleCancel = (bookingId) => {
    setActionError('');
    setConfirmId(bookingId);
  };

  const confirmCancel = async () => {
    if (!confirmId) return;
    setCancellingId(confirmId);
    setActionError('');
    try {
      await cancelBooking.mutateAsync(confirmId);
      setConfirmId(null);
    } catch (e) {
      setActionError(e?.message || 'Failed to cancel booking');
    } finally {
      setCancellingId(null);
    }
  };

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
        Error loading bookings: {error.message}
      </div>
    );
  }

  const bookings = data?.results || data || [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Bookings</h1>
        <p className="text-gray-600">View and manage your car rental bookings</p>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No bookings yet</h2>
          <p className="text-gray-600 mb-6">Start exploring our cars and make your first booking!</p>
          <a
            href="/cars"
            className="inline-block px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700"
          >
            Browse Cars
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {actionError && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
              {actionError}
            </div>
          )}
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-1 mb-4 md:mb-0">
                  <div className="flex items-center mb-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">
                        <strong>Pickup:</strong> {formatDateTime(booking.start)}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">
                        <strong>Return:</strong> {formatDateTime(booking.end)}
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="h-4 w-4 mr-2" />
                      <span className="text-sm">
                        <strong>Total:</strong> {formatCurrency(booking.total_price)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  {booking.status === 'pending' && (
                    <button
                      onClick={() => handleCancel(booking.id)}
                      disabled={cancellingId === booking.id}
                      className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 disabled:opacity-50"
                    >
                      {cancellingId === booking.id ? 'Cancelling...' : 'Cancel Booking'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirm Cancel Modal */}
      {confirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="relative bg-white w-full max-w-md rounded-lg shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Cancel booking?</h3>
              <button
                onClick={() => setConfirmId(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to cancel this booking? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmId(null)}
                className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-md hover:bg-gray-200"
              >
                Keep Booking
              </button>
              <button
                onClick={confirmCancel}
                disabled={cancellingId === confirmId}
                className="px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 disabled:opacity-50"
              >
                {cancellingId === confirmId ? 'Cancelling...' : 'Confirm Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingList;


