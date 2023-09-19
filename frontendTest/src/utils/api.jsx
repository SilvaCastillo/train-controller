// api.js

import renderDelayedTable from "./renderUtils"

export function fetchDelayedTrains() {
    fetch("http://localhost:1337/delayed")
        .then((response) => response.json())
        .then(function(result) {
            console.log("yoo", result)
            return renderDelayedTable(result.data);
        });
  }
  
  export function createTicket(ticketData) {
    // ... Create a new ticket on the server
  }
  
  export function fetchTicketCodes() {
    // ... Fetch ticket codes from the server
  }