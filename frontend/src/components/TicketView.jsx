import React, { useEffect, useState, useRef } from 'react';
import { outputDelay } from '../utils/utils';
import { createTicket, fetchTickets, fetchTicketCodes } from '../utils/api';

function TicketView({ item }) {
  const [reasonCodes, setReasonCodes] = useState([]);
  const [existingTickets, setExistingTickets] = useState([]);

  useEffect(() => {

    const fetchTicketsData = async () => {
      try {
        const result = await fetchTickets();
        setExistingTickets(result);
      } catch (error) {
        console.log(error)
      }
    };

    fetchTicketsData();

    fetchTicketCodes()
    .then((result) => setReasonCodes(result))
    .catch((error) => {
      // Handle the error here
      console.log(error);
    });
  }, []);

  const causeCodeRef = useRef();
  const handleSubmit = async (event) => {
    event.preventDefault();

    const newTicket = {
      code: causeCodeRef.current.value,
      trainnumber: item.OperationalTrainNumber,
      traindate: item.EstimatedTimeAtLocation.substring(0, 10),
    };

    try {
      const result = await createTicket(newTicket);

     // Update the existingTickets state with the new ticket
      setExistingTickets([result, ...existingTickets]);
     // Clear the cause code input field
      causeCodeRef.current.value = '';
    } catch (error) {
      console.error('Error creating ticket:', error);
      // Handle the error here, e.g., show an error message to the user
    }
  };


  return (
    <div className="ticketFormDiv max-w-lg mx-auto p-4 bg-gray-100 relative">

      <a href="/~pasi21/editor/" className="text-gray-600 text-lg font-bold absolute top-0 left-0 mt-4 ml-4">&times;</a>

      <h1 className="text-2xl font-semibold my-4">Nytt ärende</h1>

      <p className="my-4">{`Tåg från ${item.FromLocation[0].LocationName} till ${item.ToLocation[0].LocationName}. Just nu i ${item.LocationSignature}.`}</p>

      <p className="my-4">{outputDelay(item)}</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="cause-code" className="text-lg font-semibold">Orsakskod</label>

        <select id="cause-code" className="block w-full p-2 border focus:outline-none focus:ring focus:border-blue-400" ref={causeCodeRef}>

          <option value="" disabled selected>Select a cause code</option>
          {reasonCodes.map((code) => (
            <option key={code.Code} value={code.Code}>
              {`${code.Code} - ${code.Level3Description}`}
            </option>
          ))}
        </select>

        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-4 rounded">Submit</button>
      </form>

      <div className="old-tickets" id="old-tickets">
        <h2>Befintliga ärenden</h2>
        <ul>
          {existingTickets.map((ticket) => (
            <li key={ticket.id}>{ticket.code} - {ticket.trainnumber} - {ticket.traindate}</li>
          ))}
        </ul>
      </div>
    </div>

  );
}

export default TicketView;
