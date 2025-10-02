import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import carService from '../services/carService';

// Get all cars
export const useCars = (params = {}) => {
  return useQuery({
    queryKey: ['cars', params],
    queryFn: () => carService.getCars(params),
  });
};

// Get single car
export const useCar = (id) => {
  return useQuery({
    queryKey: ['car', id],
    queryFn: () => carService.getCar(id),
    enabled: !!id,
  });
};

// Get available cars
export const useAvailableCars = (params = {}) => {
  return useQuery({
    queryKey: ['cars', 'available', params],
    queryFn: () => carService.getAvailableCars(params),
  });
};

// Get popular cars
export const usePopularCars = () => {
  return useQuery({
    queryKey: ['cars', 'popular'],
    queryFn: () => carService.getPopularCars(),
  });
};

// Get car reviews
export const useCarReviews = (carId, params = {}) => {
  return useQuery({
    queryKey: ['car', carId, 'reviews', params],
    queryFn: () => carService.getCarReviews(carId, params),
    enabled: !!carId,
  });
};

// Create car mutation
export const useCreateCar = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (carData) => carService.createCar(carData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] });
    },
  });
};

// Update car mutation
export const useUpdateCar = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => carService.updateCar(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['cars'] });
      queryClient.invalidateQueries({ queryKey: ['car', variables.id] });
    },
  });
};

// Delete car mutation
export const useDeleteCar = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id) => carService.deleteCar(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] });
    },
  });
};

// Create review mutation
export const useCreateReview = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ carId, reviewData }) => carService.createReview(carId, reviewData),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['car', variables.carId, 'reviews'] });
      queryClient.invalidateQueries({ queryKey: ['car', variables.carId] });
    },
  });
};


