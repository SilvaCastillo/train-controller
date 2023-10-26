import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { outputDelay, URL_ROUTE } from '../utils/utils';
import { useMutation } from '@apollo/client';
import { CREATE_TICKET} from '../utils/queries';

function TicketView({ item, ticketsData, codesData, }) {
  const [reasonCodes, setReasonCodes] = useState([]);// Store reason codes Trains in state
  const [existingTickets, setExistingTickets] = useState([]);// Store existing tickets 
  const [createTicket, ] = useMutation(CREATE_TICKET);
  useEffect(() => {

    // Setting existingTickets
    setExistingTickets(ticketsData);
    // Setting setReasonCodes
    setReasonCodes(codesData);

  }, []);

  const causeCodeRef = useRef();
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a new ticket based on the form input
    const newTicket = {
      code: causeCodeRef.current.value,
      trainnumber: item.OperationalTrainNumber,
      traindate: item.EstimatedTimeAtLocation.substring(0, 10),
    };

    try {
      createTicket({
        variables: {
          code: newTicket.code, // Replace with the actual code
          trainnumber: newTicket.trainnumber, // Replace with the actual train number
          traindate: newTicket.traindate, // Replace with the actual date
        },
      })
        .then(result => {
          // Handle the result
          const createdTicket = result.data.createTicket;

        // Update the existingTickets state with the new ticket
        setExistingTickets([createdTicket, ...existingTickets]);

        // Clear the cause code input field
        causeCodeRef.current.value = '';
        })
        .catch(error => {
          // Handle any errors
          console.error('Error creating ticket:', error);
        });
    } catch (error) {
      console.error('Error creating ticket:', error);
      // Handle the error here, e.g., show an error message to the user
    }
  };

  return (
    <div className="ticketFormDiv max-w-lg mx-auto p-4 bg-gray-100 relative">

      <a href={`${URL_ROUTE}/`} className="text-gray-600 text-lg font-bold absolute top-0 left-0 mt-4 ml-4">&times;</a>

      <h1 className="text-2xl font-semibold my-4">Nytt ärende</h1>

      <p className="my-4">{`Tåg från ${item.FromLocation[0].LocationName} till ${item.ToLocation[0].LocationName}. Just nu i ${item.LocationSignature}.`}</p>

      <p className="my-4">{outputDelay(item.AdvertisedTimeAtLocation, item.EstimatedTimeAtLocation)}</p>

      <form onSubmit={handleSubmit}>
        <label htmlFor="cause-code" className="text-lg font-semibold">Orsakskod</label>

        <select id="cause-code" className="block w-full p-2 border focus:outline-none focus:ring focus:border-blue-400" ref={causeCodeRef} defaultValue="">

          <option value="" disabled>Select a cause code</option>
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

// PropTypes validation to ensure that the required props are provided correctly.
TicketView.propTypes = {
  item: PropTypes.object.isRequired,
  ticketsData: PropTypes.array.isRequired,
  codesData: PropTypes.array.isRequired,
};

export default TicketView;
