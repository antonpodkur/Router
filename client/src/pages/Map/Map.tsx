import React, { useState, useEffect } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  Polyline,
  useMapEvents,
} from "react-leaflet";
import L, { LatLngExpression } from 'leaflet'
import "leaflet/dist/leaflet.css";


import './Map.css'
import LocationService, { LatLng, LngLat, Place } from "../../services/LocationService";
import { Box, Button, Divider, List, ListItem, ListItemText, TextField, TextareaAutosize } from "@mui/material";

interface Position {
  latitude: number;
  longitude: number;
}



const CenterMap: React.FC<{ center: LatLng }> = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, map.getZoom());
  }, [center, map]);

  return null;
};

const LocateUser: React.FC<{ locate: boolean }> = ({ locate }) => {
  const map = useMap(); 
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
        (postition) => {
            const {latitude, longitude}  = postition.coords;
            map.flyTo([latitude, longitude], 16.0);
        },
        (error) => {
            alert("Error getting current location");
            console.error(error)
        }
    )
  }, [locate]);
  return null;
}

const ResetCenterView: React.FC<{position: [number, number] | null}> = ({position}) => {
  const map = useMap();

  useEffect(() => {
    if(position) {
      map.flyTo(position, map.getZoom())
    }
  }, [position]);

  return null;
}

// const RouteMap: React.FC<{routePoints: Array<LatLng>}> = ({routePoints}) => {
//   const [routeCoordinates, setRouteCoordinates] = useState<number[]>([])
  
//   useEffect(() => {
//     const getRoute = async () => {
//       const coordinates = await LocationService.calculateRoute(routePoints);
//       setRouteCoordinates(coordinates);
//     };
//     getRoute();
//   }, [routePoints]);

//   return (
//     <Polyline positions={routeCoordinates} color="blue" />
//   );
// }

const OpenStreetMap: React.FC = () => {
  const [userLocation, setUserLocation] = useState<Position | null>({latitude:50.45007183381818, longitude:30.524225234985355});
  const [locationAvailable, setLocationAvailable] = useState(false);
  const [locateUser, setLocateUser] = useState(false);

  const [searchText, setSearchText] = useState<string>('')
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
  const [searchPosition, setSearchPosition] = useState<[number, number] | null>(null)
  const [places, setPlaces] = useState<Array<any>>([])
  
  const [routePoints, setRoutePoints] = useState<Array<LngLat>>([]);
  const [routePointTexts, setRoutePointTexts] = useState<Array<any>>([]); 
  const [showRoutePointsSearchResult, setShowRoutePointsSearchResult] = useState<boolean>(false);
  const [routePointsSearchText, setRoutePointsSearchText] = useState<string>('');
  const [routePointSearchResults, setRoutePointSearchResults] = useState<Array<any>>([]);
  const [routeCoords, setRouteCoords] = useState<LatLngExpression[]>([]);


  useEffect(() => {
    const successCallback = (position: GeolocationPosition) => {
      setUserLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setLocationAvailable(true);
    };
    const errorCallback = (error: GeolocationPositionError) => {
      console.log(error);
    };
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);
  
  const handleMapClick = (event: L.LeafletMouseEvent) => {
    console.log("Coordinates:", event.latlng);
  };

  const handleSearchPlace = async () => {
    const places = await LocationService.searchPlace(searchText);
    setPlaces(places);
    setShowSearchResults(true);
  }

  const handleSearchRoutePointPlace = async () => {
    const places = await LocationService.searchPlace(routePointsSearchText);
    setRoutePointSearchResults(places);
    setShowRoutePointsSearchResult(true);
  }

  const handleRoutePointSet = (place: any) => {
    setRoutePointTexts([...routePointTexts, place]);
    setRoutePoints([...routePoints, [place.lon, place.lat]])
    console.log(routePoints)
  } 

  const CalculateRoute = async () => {
    const route = await LocationService.calculateRoute(routePoints);
    console.log(route);
    const coords = route.map(coord => [coord[1], coord[0]] as LatLngExpression);
    setRouteCoords(coords);
  }

  const center: [number, number] = [userLocation!.latitude, userLocation!.longitude]

  return (
    <Box className="map">
        <Box className="sidebar">
          <div className="container">
            <Button variant="contained" onClick={() => setLocateUser(!locateUser)}>Home</Button>
          </div>


{/* search place */}


          <div className="container">
            <div className="search-box">
              <TextField id="outlined-basic" label="Type a place" variant="outlined" value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
              <Button variant="contained" onClick={ async () => {await handleSearchPlace()}}>Find</Button>
            </div>

            {showSearchResults && (
            <div>
              <List className="search-results"  component={"nav"} aria-label="mailbox folders">
              {places.map((item) => {
                return (
                  <ListItem key={item?.place_id} onClick={() => setSearchPosition([item?.lat, item?.lon])}>
                    <ListItemText primary={item?.display_name} />
                    <Divider variant="middle" />
                  </ListItem>
                );
              })}
              </List>
              <Button variant="contained" onClick={() => setShowSearchResults(false)}>CLOSE</Button>
              </div>
            )}
          </div>


{/* routes */}


          <div className="container">
            {routePointTexts.length > 0 && <List className="search-results"  component={"nav"} aria-label="mailbox folders">
              {routePointTexts.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText primary={item?.display_name} />
                  <Divider variant="middle" />
                </ListItem>
              ))}
            </List>
            }

            <div className="search-box">
              <TextField id="outlined-basic" label="Type a place" variant="outlined" value={routePointsSearchText} onChange={(e) => setRoutePointsSearchText(e.target.value)}/>
              <Button variant="contained" onClick={ async () => {await handleSearchRoutePointPlace()}}>Find</Button>
            </div>

            {showRoutePointsSearchResult && (
              <div>
                <List className="search-results"  component={"nav"} aria-label="mailbox folders">
                {routePointSearchResults.map((item) =>
                  (
                    <ListItem key={item?.place_id} onClick={() => handleRoutePointSet(item)}>
                      <ListItemText primary={item?.display_name} />
                      <Divider variant="middle" />
                    </ListItem>
                  )
                )}
                </List>
                <Button variant="contained" onClick={() => setShowRoutePointsSearchResult(false)}>CLOSE</Button>
              </div>
            )}

            {routePoints.length > 0 && 
                <Button variant="contained" onClick={async () => await CalculateRoute()}>GetRoute</Button>
            }
          </div>

        </Box>


{/* map */}


        <MapContainer
          center={center}
          zoom={15}
          scrollWheelZoom={true}
          className="map-container"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {locationAvailable && userLocation && (
            <Marker position={[userLocation.latitude, userLocation.longitude]}>
              <Popup>
                You are here. <br /> This is your current location.
              </Popup>
            </Marker>
          )}
          {searchPosition && (
            <Marker position={searchPosition}>
              <Popup>
                Place you search. 
              </Popup>
            </Marker>
          )}
          {routePointTexts.length > 0 && <div>
            {routePointTexts.map((item, index) => (
              <Marker key={index} position={[item.lat, item.lon]}>
                <Popup>
                  {item.display_name}
                </Popup>
              </Marker>
            ))}
          </div>
          }

            <CenterMap center={center} />
            <LocateUser locate={locateUser}/>
            <ResetCenterView position={searchPosition} />
            {
              routeCoords.length > 0 && (
                <Polyline positions={routeCoords} pathOptions={{ color: "blue", opacity: 0.9 }} />
              )
            }
        </MapContainer>
    </Box>
  );
};

export default OpenStreetMap;


