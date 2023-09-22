// api.js

export const fetchDelayedTrains = () => {
  console.log('Fetching delayed trains...');
  return fetch('http://localhost:1337/delayed')
    .then((response) => response.json())
    .then((result) => {
      if (result.data && Array.isArray(result.data) && result.data.length > 0) {
        return result.data;
      } else {
        throw new Error('Invalid data format');
      }
    });
};
  
  export function createTicket(ticketData) {
    // ... Create a new ticket on the server
  }
  
  export function fetchTicketCodes() {
    // ... Fetch ticket codes from the server
  }