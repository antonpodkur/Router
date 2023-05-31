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
import { Box, List, ListItem, ListItemText } from "@mui/material";
import { Button, Icon, Input, Divider } from "@vechaiui/react"
import { Home, Search, XCircle, MapPin, Navigation } from 'react-feather';
import RouteOptions from "../../components/RouteOptions/RouteOptions";


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
    console.log(coords)
  }

  const deleteRoute = () => {
    setRoutePoints([])
    setRoutePointTexts([])
    setShowRoutePointsSearchResult(false)
    setRoutePointsSearchText('') 
    setRoutePointSearchResults([])
    setRouteCoords([])
  }

  const center: [number, number] = [userLocation!.latitude, userLocation!.longitude]

  //TODO: move everything to vechai ui
  return (
    <Box className="map flex-col md:flex-row">
        <Box className="sidebar max-h-[50vh] md:max-h-[100vh] overflow-y-auto p-3 items-center">
          <div className="container w-full flex flex-col items-center justify-center">
            <Button 
              variant="solid" 
              onClick={() => setLocateUser(!locateUser)}
              leftIcon={<Icon as={Home} label="home" className="w-4 h-4 mr-1" />}
              className="mb-2"
              >
                Home
            </Button>
            <Divider
              orientation="horizontal"
              className="border-neutral-300 w-full dark:border-neutral-700"
            />
          </div>


{/* search place */}
          <div className="m-3 w-full flex flex-col items-center w-full">
            <div className="w-full font-bold text-center m-2">
              Search for a place
            </div>
            <div className="container">
              <div className="search-box flex-col md:flex-row ">
                <Input className="mb-1 md:mr-1" placeholder="Type a place" value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
                <Button 
                  variant="solid" 
                  onClick={ async () => {await handleSearchPlace()}}
                  leftIcon={<Icon as={Search} label="search" className="w-4 h-4 mr-1" />}
                  >
                    Find
                </Button>
              </div>

              {showSearchResults && (
              <div className="flex flex-col items-center justify-center">
                <div className="search-results items-center">
                {places.map((item) => {
                  return (
                    <div className="flex items-center m-2 p-1 border-solid border-2 shadow-md shadow-slate-200 rounded-md" key={item?.place_id} onClick={() => setSearchPosition([item?.lat, item?.lon])}>
                      <div>
                        <Icon as={MapPin} label="map pin" className="w-6 h-6 mx-3 text-grey-500" />
                      </div>
                      <div>
                        {item?.display_name}
                      </div>
                    </div>
                  );
                })}
                </div>
                <Button 
                  variant="solid" 
                  onClick={() => setShowSearchResults(false)}
                  leftIcon={<Icon as={XCircle} label="close" className="w-4 h-4 mr-1" />}
                  >
                    Close
                </Button>              
              </div>
              )}
            </div>
            <Divider
              orientation="horizontal"
              className="border-neutral-300 w-full dark:border-neutral-700"
            />
          </div>


{/* routes */}
          <div className="m-3 w-full flex flex-col items-center">
            <div className="w-full font-bold text-center m-2">
              Build a route
            </div>

            <div className="container flex flex-col">
              {routePointTexts.length > 0 && 
              <div>
                <div className="flex items-center justify-center">
                  <div className="text-center font-medium">
                    Your route:
                  </div>
                </div>
                <div className="search-results items-center">
                  {routePointTexts.map((item, index) => (
                      <div className="flex items-center m-2 p-1 border-solid border-2 shadow-md shadow-slate-200 rounded-md" key={item?.place_id}>
                      <div>
                        <Icon as={Navigation} label="navigation point" className="w-6 h-6 mx-3 text-grey-500" />
                      </div>
                      <div>
                        {item?.display_name}
                      </div>
                    </div>
                  ))}
                </div>
                {routeCoords.length > 0 && <RouteOptions coords={routeCoords} points={routePoints} deleteRoute={deleteRoute}/>}
              </div>
              }

              <div className="search-box flex-col md:flex-row">
                <Input className="mb-1 md:mr-1" placeholder="Type a place" value={routePointsSearchText} onChange={(e) => setRoutePointsSearchText(e.target.value)}/>
                <Button 
                  variant="solid" 
                  onClick={ async () => {await handleSearchRoutePointPlace()}}
                  leftIcon={<Icon as={Search} label="search" className="w-4 h-4 mr-1" />}
                  >
                    Find
                </Button>              </div>

              {showRoutePointsSearchResult && (
                <div className="flex flex-col items-center justify-center my-1">                  
                  <div className="search-results items-center">
                    {routePointSearchResults.map((item) =>
                      (
                        <div className="flex items-center m-2 p-1 border-solid border-2 shadow-md shadow-slate-200 rounded-md" key={item?.place_id} 
                          onClick={() => handleRoutePointSet(item)}>
                          <div>
                            <Icon as={MapPin} label="map pin" className="w-6 h-6 mx-3 text-grey-500" />
                          </div>
                          <div>
                            {item?.display_name}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                  <Button 
                    variant="solid" 
                    onClick={() => setShowRoutePointsSearchResult(false)}
                    leftIcon={<Icon as={XCircle} label="close" className="w-4 h-4 mr-1" />}
                    > 
                      Close
                  </Button>
                </div>
              )}

              {routePoints.length > 0 && 
                  <Button variant="solid" onClick={async () => await CalculateRoute()}>Get route</Button>
              }
            </div>
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


