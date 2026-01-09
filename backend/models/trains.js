import 'dotenv/config';
import EventSource from 'eventsource';

/**
 * Function to fetch train positions from Trafikverket API and stream them to connected clients.
 *
 * @param {SocketIO.Server} io - The Socket.IO server instance.
 */
async function fetchTrainPositions(io) {
	// Create the query to request train positions
	const query = `<REQUEST>
        <LOGIN authenticationkey="${process.env.TRAFIKVERKET_API_KEY}" />
        <QUERY sseurl="true" namespace="järnväg.trafikinfo" objecttype="TrainPosition" schemaversion="1.0" limit="1" />
    </REQUEST>`;

	const trainPositions = {};

	// Fetch data from Trafikverket API
	const response = await fetch(
		'https://api.trafikinfo.trafikverket.se/v2/data.json',
		{
			method: 'POST',
			body: query,
			headers: { 'Content-Type': 'text/xml' },
		}
	);

	const result = await response.json();
	const sseurl = result.RESPONSE.RESULT[0].INFO.SSEURL;

	// Create an EventSource to stream data
	const eventSource = new EventSource(sseurl);

	eventSource.onopen = function () {
		console.log('Connection to server opened.');
	};

	// Handle WebSocket client connections
	io.on('connection', (socket) => {
		console.log('a user connected');

		// Listen for messages from the EventSource
		eventSource.onmessage = function (e) {
			try {
				const parsedData = JSON.parse(e.data);

				if (parsedData) {
					const changedPosition =
						parsedData.RESPONSE.RESULT[0].TrainPosition[0];
					const matchCoords = /(\d*\.\d+|\d+),?/g;
					const position = changedPosition.Position.WGS84.match(matchCoords)
						.map((t) => parseFloat(t))
						.reverse();
					const trainObject = {
						trainnumber: changedPosition.Train.AdvertisedTrainNumber,
						position: position,
						timestamp: changedPosition.TimeStamp,
						bearing: changedPosition.Bearing,
						status: !changedPosition.Deleted,
						speed: changedPosition.Speed,
					};

					if (
						Object.hasOwnProperty.call(
							trainPositions,
							changedPosition.Train.AdvertisedTrainNumber
						)
					) {
						socket.emit('message', trainObject);
					}

					trainPositions[changedPosition.Train.AdvertisedTrainNumber] =
						trainObject;
				}
			} catch (err) {
				console.log(err);
			}

			return;
		};
	});

	eventSource.onerror = function (e) {
		console.log('EventSource failed. message:', e);
	};
}

export default { fetchTrainPositions };
