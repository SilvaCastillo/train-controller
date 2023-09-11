import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import io from 'socket.io-client';
import DelayedTrain from './DelayedTrain';
import TicketView from './TicketView';

function MainView() {
  const [delayedTrains, setDelayedTrains] = useState([]);
  const [ticketView, setTicketView] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:1337");

    const map = L.map('map').setView([62.173276, 14.942265], 5);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const markers = {};

    socket.on("message", (data) => {
      if (markers.hasOwnProperty(data.trainnumber)) {
        const marker = markers[data.trainnumber];
        marker.setLatLng(data.position);
      } else {
        const marker = L.marker(data.position).bindPopup(data.trainnumber).addTo(map);
        markers[data.trainnumber] = marker;
      }
    });

    fetch("http://localhost:1337/delayed")
      .then((response) => response.json())
      .then((result) => setDelayedTrains(result.data));
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
      <div id="map" className="map"></div>
      {ticketView}
    </div>
  );
}

export default MainView;
