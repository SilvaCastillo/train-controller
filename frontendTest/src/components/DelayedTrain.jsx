import React from 'react';
import { outputDelay } from '../utils/utils';

function DelayedTrain({ item, onViewTicket }) {

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
