import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import io from 'socket.io-client';
import L from 'leaflet'; // Import Leaflet
import DelayedTrain from './DelayedTrain';
import TicketView from './TicketView';
import { fetchDelayedTrains } from '../utils/api'; // Import the function

function MainView() {
  const [delayedTrains, setDelayedTrains] = useState([]);
  const [ticketView, setTicketView] = useState(null);
  const [markers, setMarkers] = useState({}); // Store markers in state

  useEffect(() => {
    const socket = io('http://localhost:1337');

    socket.on('message', (data) => {
      setMarkers((prevMarkers) => {
        // Create a copy of the previous markers state
        const newMarkers = { ...prevMarkers };


        const marker = L.marker(data.position).bindPopup(`TrainID: ${data.trainnumber}`);
        newMarkers[data.trainnumber] = marker;

        // if (newMarkers[data.trainnumber]) {
        //   // Update the existing marker's position
        //   const [latitude, longitude] = data.position;
        //   newMarkers[data.trainnumber].setLatLng([latitude, longitude]);
        // } else {
        //   // Create a new marker
        //   const marker = L.marker(data.position).bindPopup(data.trainnumber);
        //   newMarkers[data.trainnumber] = marker;
        // }

        return newMarkers; // Return the updated markers object
      });
      console.log('Received a message:', data);
    });

    fetchDelayedTrains() // Use the imported function here
    .then((data) => {
      setDelayedTrains(data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });

  return () => {
    socket.disconnect();
  };
  }, []);

  const renderDelayedTrains = () => (
    <div className="delayed-trains">
      {delayedTrains.map((item) => (
        <DelayedTrain
          key={item.OperationalTrainNumber}
          item={item}
          onViewTicket={() => renderTicketView(item)}
        />
      ))}
    </div>
  );

  const renderTicketView = (item) => {
    setTicketView(
      <TicketView
        item={item}
        onBack={() => setTicketView(null)}
      />
    );
  };

  return (
    <div id="container">
      <div className="delayed">
        <h1>Försenade tåg</h1>
        {renderDelayedTrains()}
      </div>
      <div id="map" className="map">
        <MapContainer
          center={[62.173276, 14.942265]}
          zoom={5}
          style={{ width: '100%', height: '400px' }}
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
      {ticketView}
    </div>
  );
}

export default MainView;
