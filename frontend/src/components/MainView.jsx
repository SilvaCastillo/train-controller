import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { API_URL, URL_ROUTE} from '../utils/utils';
import io from 'socket.io-client';
import L from 'leaflet';
import DelayedTrain from './DelayedTrain';
import { useNavigate } from 'react-router-dom';
import { fetchDelayedTrains } from '../utils/api';

function MainView() {
  const [delayedTrains, setDelayedTrains] = useState([]); // Store delayed Trains in state
  const [markers, setMarkers] = useState({}); // Store markers in state
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize a socket connection to the API_URL
    const socket = io(API_URL);

    // Listen for messages from the socket
    socket.on('message', (data) => {
      setMarkers((prevMarkers) => {
        // Create a copy of the previous markers state
        const newMarkers = { ...prevMarkers };
        const marker = L.marker(data.position).bindPopup(`TrainID: ${data.trainnumber}`);
        newMarkers[data.trainnumber] = marker;

        return newMarkers; // Return the updated markers object
      });
      console.log('Received a message:', data);
    });

    // Fetch delayed trains using the imported function
    fetchDelayedTrains()
    .then((data) => {
      console.log('API Response:', data);
      setDelayedTrains(data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });

  return () => {
    // Clean up the socket connection when the component unmounts
    socket.disconnect();
  };
  }, []);

  const renderDelayedTrains = () => (
    <div className="delayed-trains .flex .flex-col">
      {delayedTrains.map((item) => (
        <DelayedTrain
          key={item.OperationalTrainNumber}
          item={item}
          onViewTicket={() => renderTicketView(item)}n
          />
      ))}
    </div>
  );

  const renderTicketView = (item) => {
    navigate(`${URL_ROUTE}ticket`, { state: { ticketView: item } });

  };

  return (
    <div id="container" className='flex h-screen'>
      <div className="delayed w-2/5 w-40vw p-4 bg-white ">
        <h1 className="mt-4 mb-3 .text-3xl .font-bold .text-center">Försenade tåg</h1>
        {renderDelayedTrains()}
      </div>
      <div id="map" className="map w-4/5 h-screen">
        <MapContainer
          center={[62.173276, 14.942265]}
          zoom={5}
          style={{ width: '100%', height: '100%' }}
        >
          <TileLayer
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={19}
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          {Object.values(markers).map((marker) => (
            <Marker key={marker.options.trainnumber} position={marker.getLatLng()}>
              <Popup>{marker.getPopup().getContent()}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default MainView;
