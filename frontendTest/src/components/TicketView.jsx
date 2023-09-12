import React, { useEffect, useState } from 'react';

function TicketView({ item, onBack }) {
  const [reasonCodes, setReasonCodes] = useState([]);
  const [newTicketId, setNewTicketId] = useState(0);

  useEffect(() => {
    fetch("http://localhost:1337/tickets")
      .then((response) => response.json())
      .then((result) => {
        const lastId = result.data[1] ? result.data[1].id : 0;
        const newId = lastId + 1;
        setNewTicketId(newId);
      });

    fetch("http://localhost:1337/codes")
      .then((response) => response.json())
      .then((result) => setReasonCodes(result.data));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newTicket = {
      code: event.target.reasonCode.value,
      trainnumber: item.OperationalTrainNumber,
      traindate: item.EstimatedTimeAtLocation.substring(0, 10),
    };

    fetch("http://localhost:1337/tickets", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTicket),
    })
      .then((response) => response.json())
      .then(() => renderTicketView(item));
  };

  return (
    <div className="ticket-container">
      <div className="ticket">
        <a href="#" id="back" onClick={onBack}>{"<- Tillbaka"}</a>
        <h1>Nytt ärende #{newTicketId}</h1>
        {item.FromLocation && (
          <h3>{`Tåg från ${item.FromLocation[0].LocationName} till ${item.ToLocation[0].LocationName}. Just nu i ${item.LocationSignature}.`}</h3>
        )}
        <p><strong>Försenad:</strong> {outputDelay(item)}</p>
        <form id="new-ticket-form" onSubmit={handleSubmit}>
          <label>Orsakskod</label><br />
          <select id="reason-code">
            {reasonCodes.map((code) => (
              <option key={code.Code} value={code.Code}>
                {`${code.Code} - ${code.Level3Description}`}
              </option>
            ))}
          </select><br /><br />
          <input type="submit" value="Skapa nytt ärende" />
        </form>
      </div>
      <br />
      <div className="old-tickets" id="old-tickets">
        <h2>Befintliga ärenden</h2>
      </div>
    </div>
  );
}

export default TicketView;
