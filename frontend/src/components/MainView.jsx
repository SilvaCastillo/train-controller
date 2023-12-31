import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { GET_DELAYED_TRAINS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { API_URL, URL_ROUTE} from '../utils/utils';
import io from 'socket.io-client';
import L from 'leaflet';
import DelayedTrain from './DelayedTrain';
import { useNavigate } from 'react-router-dom';

function MainView() {
  const [delayedTrains, setDelayedTrains] = useState([]); // Store delayed Trains in state
  const [allMarkers, setMarkers] = useState({}); // Store markers in state
  const [positionData, setPositionData] = useState([]); // Store markers in state
  const [shouldRenderContent, setShouldRenderContent] = useState(true);
  const [filteredMarkers, setFilteredMarkers] = useState({});
  const [filteredTrains, setFilteredTrains] = useState([]);
  const {loading, error, data} = useQuery(GET_DELAYED_TRAINS);
  const navigate = useNavigate();


  useEffect(() => {
    // Fetch delayed trains using the imported function
    if (!loading && !error) {
      // Use the data from the GraphQL query here
      console.log('GraphQL Data:', data.trains);
  
      // Assuming data.trains is an array of train objects, you can process it here
      setDelayedTrains(data.trains); 
  
      // If you want to use the data elsewhere in your component, do so here.
    
      // Initialize a socket connection to the API_URL
      const socket = io(API_URL);
  
      // Listen for messages from the socket
      socket.on('message', (socketData) => {
        setMarkers((prevMarkers) => {
          const newMarkers = { ...prevMarkers };
          const marker = L.marker(socketData.position).bindPopup(`TrainID: ${socketData.trainnumber}`);
          marker.myCustomKey = socketData.trainnumber;
          newMarkers[socketData.trainnumber] = marker;
          return newMarkers;
        });
  
        setPositionData(socketData);
      });
  
      return () => {
        // Clean up the socket connection when the component unmounts
        socket.disconnect();
      };
    }
  }, [loading, error, data]);

  const clearFilteredMarkers = () => {
    setFilteredMarkers({});
  };

  // Initialize an array to store deduplicated train data.
  const deduplicatedTrains = [];

  // Create a Set to keep track of encountered trains to avoid duplicates
  const encounteredTrains = new Set();
  if (positionData && Object.keys(positionData).length > 0  ) {
    // Loop through each train in the 'delayedTrains' array.
      for (const train of delayedTrains) {
        // Check if the current train matches the selected train based on its OperationalTrainNumber or AdvertisedTrainIdent.
        if (train.OperationalTrainNumber == positionData.trainnumber || train.
          AdvertisedTrainIdent == positionData.trainnumber) {

            train.positionData = positionData;
            console.log('Updated delayedTrain:', train.OperationalTrainNumber);
        }

        // Generate a unique key for each train based on OperationalTrainNumber and LocationSignature
        const trainKey = train.OperationalTrainNumber + '-' + train.LocationSignature;

        if (!encounteredTrains.has(trainKey)) {
          // This train hasn't been encountered before, so add it to deduplicatedTrains
          deduplicatedTrains.push(train);
          encounteredTrains.add(trainKey);
          }
      }
  }


  const handleSelectTrain = (selectedTrainId) => {
    if (shouldRenderContent) {
      // If shouldRenderContent is true, we set it to false and clear filteredMarkers.
      setShouldRenderContent(false);
      clearFilteredMarkers();

      // add the chosen train position to setfilterMarkers
      setFilteredMarkers(() => {
        const newMarkers = {};
        const marker = L.marker(selectedTrainId.positionData.position).bindPopup(`TrainID: ${selectedTrainId.positionData.trainnumber}`);
        // const marker = createTrainMarker(selectedTrainId.positionData);
        newMarkers[selectedTrainId.OperationalTrainNumber] = marker;
        return newMarkers; // Return the updated markers object
      })

      setFilteredTrains(selectedTrainId)

    } else {
      // If shouldRenderContent is false, we set it to true and add the selected marker to all markers.
      setShouldRenderContent(true);
    }
  };

  let trainsToShow = shouldRenderContent ? deduplicatedTrains : [filteredTrains];

  const renderDelayedTrains = () => (
    <div className="delayed-trains .flex .flex-col" 
    >
      {trainsToShow
        .filter((item) => item.positionData && item.positionData !== undefined) // Check if positionData exists
        .map((item) => (
          <DelayedTrain
            key={`${item.OperationalTrainNumber}-${item.LocationSignature}`}
            item={item}
            onViewTicket={() => renderTicketView(item)}
            onSelectTrain={handleSelectTrain} // Pass the function as a prop
          />
        ))
      }
    </div>
  );



  const renderTicketView = (item) => {
    navigate(`${URL_ROUTE}ticket`, { state: { ticketView: item } });
  };


  let markersToRender = shouldRenderContent ? Object.values(allMarkers) : Object.values(filteredMarkers);

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
          {
            Object.values(markersToRender).map((marker) => (
              <Marker key={marker.options.trainnumber} position={marker.getLatLng()}>
                <Popup>{marker.getPopup().getContent()}</Popup>
              </Marker>
            ))
          }
        </MapContainer>
      </div>
    </div>
  );
}

export default MainView;
