import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import io from 'socket.io-client';
import DelayedTrain from './DelayedTrain';
import TicketView from './TicketView';
import L from 'leaflet'; // Import Leaflet
// import '../leaflet/dist/leaflet.css'; // Import Leaflet CSS

function MainView() {
  const [delayedTrains, setDelayedTrains] = useState([]);
  const [ticketView, setTicketView] = useState(null);
  const [markers, setMarkers] = useState({}); // Store markers in state

  useEffect(() => {
    // const socket = io('http://localhost:1337');

    // let markers = {};
    // console.log("yoo")
    // socket.on('message', (data) => {
    //   if (markers[data.trainnumber]) {
    //     markers[data.trainnumber].setLatLng(data.position);
    //   } else {
    //     const marker = L.marker(data.position).bindPopup(data.trainnumber);
    //     marker.addTo(map);
    //     markers[data.trainnumber] = marker;
    //   }
    //   console.log('Received a message:', data);
    // });

    fetch('http://localhost:1337/delayed')
      .then((response) => response.json())
      .then((result) => {
        if (result.data && Array.isArray(result.data) && result.data.length > 0) {
          // console.log(result.data)
          setDelayedTrains(result.data);
        } else {
          console.error('Invalid data format:', result.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });

    // return () => {
    //   socket.disconnect();
    // };
  }, [markers]);

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
          {delayedTrains.map((item) => {
            if (item.latitude !== undefined && item.longitude !== undefined) {
              console.log(item.latitude)
              return (
                <Marker
                  key={item.OperationalTrainNumber}
                  position={[item.latitude, item.longitude]}
                >
                  <Popup>{item.OperationalTrainNumber}</Popup>
                </Marker>
              );
            }
            return null;
          })}
        </MapContainer>
      </div>
      {ticketView}
    </div>
  );
}

export default MainView;
