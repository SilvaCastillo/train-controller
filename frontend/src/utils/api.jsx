// api.js
import { API_URL } from './utils';

// Fetch delayed trains data from the API
export const fetchDelayedTrains = () => {
  return fetch(`${API_URL}/delayed`)
    .then((response) => response.json())
    .then((result) => {
      if (result.data && Array.isArray(result.data) && result.data.length > 0) {
        return result.data;
      } else {
        throw new Error('Invalid data format');
      }
    });
};

// Fetch ticket codes from the API
export const fetchTicketCodes = async () => {
  try {
    const response = await fetch(`${API_URL}/codes`)
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching codes:', error);
    throw error;
  }
};

// Fetch existing tickets from the API
export const fetchTickets = () => {
  return fetch(`${API_URL}/tickets`)
    .then((response) => response.json())
    .then((result) => {
      return result.data;
    });
};

// Create a new ticket
export async function createTicket(ticketData) {
  const response = await fetch(`${API_URL}/tickets`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ticketData),
  });

  if (!response.ok) {
    throw new Error('Failed to create ticket');
  }

  const result = await response.json();
  return result.data;
}
