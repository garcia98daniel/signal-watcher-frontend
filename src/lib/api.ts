import toast from 'react-hot-toast';
import { CreateEventForm, CreateWatchlistForm } from '@/types/events.types';

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/${process.env.NEXT_PUBLIC_API_VERSION || 'v1'}`;

const handleResponse = async (response: Response) => {
  const contentType = response.headers.get('content-type');
  if (!response.ok) {
    let errorMessage = 'Ocurrió un error en el servidor.';
    if (contentType && contentType.includes('application/json')) {
      const errorData = await response.json();
      errorMessage = errorData.error || errorData.message || errorMessage;
    }
    throw new Error(errorMessage);
  }
  if (response.status === 204) {
    return null;
  }
  return response.json();
};

export const getWatchlists = async () => {
  const response = await fetch(`${API_BASE_URL}/watchlists`);
  return handleResponse(response);
};

export const createWatchlist = (data: CreateWatchlistForm) => {
  const promise = fetch(`${API_BASE_URL}/watchlists`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(handleResponse);

  return toast.promise(promise, {
    loading: 'Creando watchlist...',
    success: 'Watchlist creada con éxito!',
        error: (err) => err.message,
  });
};

export const deleteWatchlist = (id: string) => {
  const promise = fetch(`${API_BASE_URL}/watchlists/${id}`, {
    method: 'DELETE',
  }).then(handleResponse);

  return toast.promise(promise, {
    loading: 'Eliminando watchlist...',
    success: 'Watchlist eliminada con éxito!',
        error: (err) => err.message,
  });
};

// Event Endpoints
export const getEvents = async () => {
  const response = await fetch(`${API_BASE_URL}/events`);
  return handleResponse(response);
};

export const simulateEvent = (data: CreateEventForm) => {
  const promise = fetch(`${API_BASE_URL}/events/simulate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(handleResponse);

  return toast.promise(promise, {
    loading: 'Simulando evento...',
    success: 'Evento simulado y analizado con éxito!',
        error: (err) => err.message,
  });
};
