import React from 'react';

function DelayedTrain({ item, onViewTicket }) {
  const outputDelay = (item) => {
    const advertised = new Date(item.AdvertisedTimeAtLocation);
    const estimated = new Date(item.EstimatedTimeAtLocation);
    const diff = Math.abs(estimated - advertised);
    return `${Math.floor(diff / (1000 * 60))} minuter`;
  };

  return (
    <div className="train">
      <div className="train-number">{item.OperationalTrainNumber}</div>
      <div className="current-station">
        <div>{item.LocationSignature}</div>
        <div>
          {item.FromLocation ? `${item.FromLocation[0].LocationName} -> ` : ''}
          {item.ToLocation ? item.ToLocation[0].LocationName : ''}
        </div>
      </div>
      <div className="delay">{outputDelay(item)}</div>
      <button onClick={onViewTicket}>View Ticket</button>
    </div>
  );
}

export default DelayedTrain;
