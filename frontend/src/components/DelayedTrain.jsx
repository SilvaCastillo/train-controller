import PropTypes from 'prop-types';
import { outputDelay } from '../utils/utils';

function DelayedTrain({ item, onViewTicket, onSelectTrain  }) {
  return (
    <div
    className="train justify-between flex flex-row border-t border-gray-300 py-1 px-2 items-center justify-center h-16"
    onClick={() => onSelectTrain(item)}
    >
        <div className="train-number text-3xl font-bold w-1/5">{item.OperationalTrainNumber}</div>
        <div className="current-station flex flex-col w-1/3">
          <div className='font-bold mb-2'>{item.LocationSignature}</div>
          <div>
            {/* Display "From" and "To" locations if available */}
            {item.FromLocation && item.ToLocation && (
              <div className="mb-1">
                {item.FromLocation[0].LocationName} <span className="text-gray-400">&rarr;</span> {item.ToLocation[0].LocationName}
              </div>
            )}
          </div>
        </div>
        <div className="delay mr-4">
          {/* Display the delay time using the outputDelay function */}
          {outputDelay(item.AdvertisedTimeAtLocation, item.EstimatedTimeAtLocation)}
        </div>
        <button className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        onClick={onViewTicket}
        >View Ticket</button>
      </div>
  );
}

// PropTypes validation to ensure that the required props are provided correctly.
DelayedTrain.propTypes = {
  item: PropTypes.object.isRequired,
  onViewTicket: PropTypes.func.isRequired,
  onSelectTrain: PropTypes.func.isRequired,
};

export default DelayedTrain;
