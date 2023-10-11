// api.js

export const fetchDelayedTrains = () => {
  return fetch('https://jsramverk-editor-pasi21.azurewebsites.net/delayed')
    .then((response) => response.json())
    .then((result) => {
      if (result.data && Array.isArray(result.data) && result.data.length > 0) {
        return result.data;
      } else {
        throw new Error('Invalid data format');
      }
    });
};

export const fetchTicketCodes = async () => {
  try {
    const response = await fetch("https://jsramverk-editor-pasi21.azurewebsites.net/codes");
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

export const fetchTickets = () => {
  return fetch("https://jsramverk-editor-pasi21.azurewebsites.net/tickets")
    .then((response) => response.json())
    .then((result) => {
      return result.data;
    });
};

export async function createTicket(ticketData) {
  const response = await fetch("https://jsramverk-editor-pasi21.azurewebsites.net/tickets", {
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
