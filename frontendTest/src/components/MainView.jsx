
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import io from 'socket.io-client';
import DelayedTrain from './DelayedTrain';
import TicketView from './TicketView';

import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS

function MainView() {
  const [delayedTrains, setDelayedTrains] = useState([]);
  const [ticketView, setTicketView] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:1337");

    // Listen for "message" events from the socket
    socket.on("message", (data) => {
      // Handle the data received from the socket here
      console.log("Received a message:", data);
      // You can update markers on the map or handle other actions as needed
    });

    // Fetch data and update delayedTrains state
    fetch("http://localhost:1337/delayed")
      .then((response) => response.json())
      .then((result) => setDelayedTrains(result.data));

    // Cleanup the socket connection when the component unmounts
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
          style={{ width: '100%', height: '400px' }} // Adjust the size as needed
        >
          <TileLayer
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            maxZoom={19}
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />
          {/* Add markers or other map components here */}
        </MapContainer>
      </div>
      {ticketView}
    </div>
  );
}

export default MainView;
