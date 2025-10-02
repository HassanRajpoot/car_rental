import apiClient from '../config/api';

const bookingService = {
  // Get all bookings (filtered by user role)
  getBookings: async (params = {}) => {
    const response = await apiClient.get('/bookings/', { params });
    return response.data;
  },

  // Get single booking by ID
  getBooking: async (id) => {
    const response = await apiClient.get(`/bookings/${id}/`);
    return response.data;
  },

  // Create new booking
  createBooking: async (bookingData) => {
    const response = await apiClient.post('/bookings/', bookingData);
    return response.data;
  },

  // Cancel booking
  cancelBooking: async (id) => {
    const response = await apiClient.post(`/bookings/${id}/cancel/`);
    return response.data;
  },

  // Create payment intent
  createPaymentIntent: async (bookingId) => {
    const response = await apiClient.post('/payment/create-intent/', {
      booking_id: bookingId,
    });
    return response.data;
  },
};

export default bookingService;

