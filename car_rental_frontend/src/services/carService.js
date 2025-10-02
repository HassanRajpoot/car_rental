import apiClient from '../config/api';

const carService = {
  // Get all cars with filters
  getCars: async (params = {}) => {
    const response = await apiClient.get('/cars/', { params });
    return response.data;
  },

  // Get single car by ID
  getCar: async (id) => {
    const response = await apiClient.get(`/cars/${id}/`);
    return response.data;
  },

  // Create new car (fleet managers only)
  createCar: async (carData) => {
    const response = await apiClient.post('/cars/', carData);
    return response.data;
  },

  // Update car (fleet managers only)
  updateCar: async (id, carData) => {
    const response = await apiClient.put(`/cars/${id}/`, carData);
    return response.data;
  },

  // Partial update car
  patchCar: async (id, carData) => {
    const response = await apiClient.patch(`/cars/${id}/`, carData);
    return response.data;
  },

  // Delete car (fleet managers only)
  deleteCar: async (id) => {
    const response = await apiClient.delete(`/cars/${id}/`);
    return response.data;
  },

  // Get available cars for specific dates
  getAvailableCars: async (params = {}) => {
    const response = await apiClient.get('/cars/available/', { params });
    return response.data;
  },

  // Get popular cars
  getPopularCars: async () => {
    const response = await apiClient.get('/cars/popular/');
    return response.data;
  },

  // Get reviews for a car
  getCarReviews: async (carId, params = {}) => {
    const response = await apiClient.get(`/cars/${carId}/reviews/`, { params });
    return response.data;
  },

  // Create review for a car
  createReview: async (carId, reviewData) => {
    const response = await apiClient.post(`/cars/${carId}/review/`, reviewData);
    return response.data;
  },
};

export default carService;

