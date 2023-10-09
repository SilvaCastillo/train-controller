import React, { useEffect, useState, useRef } from 'react';
import { outputDelay } from '../utils/utils';


function TicketView({ item }) {
  const [reasonCodes, setReasonCodes] = useState([]);
  const [newTicketId, setNewTicketId] = useState(0);

  useEffect(() => {
    fetch("https://jsramverk-editor-pasi21.azurewebsites.net/tickets")
      .then((response) => response.json())
      .then((result) => {
        const lastId = result.data[1] ? result.data[1].id : 0;
        const newId = lastId + 1;
        setNewTicketId(newId);
      });

    fetch("https://jsramverk-editor-pasi21.azurewebsites.net/codes")
      .then((response) => response.json())
      .then((result) => setReasonCodes(result.data));
  }, []);


  const causeCodeRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    const newTicket = {
      code: causeCodeRef.current.value,
      trainnumber: item.OperationalTrainNumber,
      traindate: item.EstimatedTimeAtLocation.substring(0, 10),
    };

    fetch("https://jsramverk-editor-pasi21.azurewebsites.net/tickets", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTicket),
    })
      .then((response) => response.json())
      // Rather than simply submitting the form, consider redirecting the user to a dedicated page that displays all submitted cause codes for a comprehensive overview.
      .then(() => renderTicketView(item));
  };


  return (
    <div className="ticketFormDiv max-w-lg mx-auto p-4 bg-gray-100 relative">

      <a href="/" className="text-gray-600 text-lg font-bold absolute top-0 left-0 mt-4 ml-4">&times;</a>

      <h1 className="text-2xl font-semibold my-4">Unique ID: {newTicketId}</h1>

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

      {/* Consider displaying previous cause codes */}

      {/* <div className="old-tickets" id="old-tickets">
        <h2>Befintliga ärenden</h2>
      </div> */}
    </div>

  );
}

export default TicketView;
