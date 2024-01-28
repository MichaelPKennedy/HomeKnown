import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useCityData, CityDataProvider } from "../../../utils/CityDataContext";
import ReactDOMServer from "react-dom/server";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "../ResultsPage.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  Circle,
  useMap,
} from "react-leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMountain,
  faTree,
  faWater,
  faUmbrellaBeach,
  faMapMarkerAlt,
  faArchway,
  faTint,
  faBinoculars,
  faHiking,
  faLandmark,
  faMonument,
  faPaw,
  faTractor,
  faMusic,
  faUniversity,
  faRoad,
  faBuilding,
  faLeaf,
  faFrog,
  faLaugh,
  faSnowboarding,
  faSatellite,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-bootstrap";

const placeToIconMap = {
  "National Park": faTree,
  "Mountain Peak": faMountain,
  "Hiking Trail": faHiking,
  "National Monument": faLandmark,
  "Historic Site": faMonument,
  "National Recreation Area": faTree,
  "National Seashore": faWater,
  "Natural Arch": faArchway,
  Waterfall: faTint,
  Viewpoint: faBinoculars,
  "Hiking Spot": faHiking,
  Mountain: faMountain,
  "Granite Dome": faMountain,
  "Slot Canyon": faMountain,
  "National Memorial": faMonument,
  "Mountain Memorial": faMountain,
  Valley: faMountain,
  "Historical Park": faLandmark,
  "National Riverway": faWater,
  Rainforest: faTree,
  "National Forest": faTree,
  Beach: faUmbrellaBeach,
  "State Park": faTree,
  Volcano: faMountain,
  "National Lakeshore": faWater,
  "Wilderness Area": faTree,
  "National Reserve": faTree,
  "National Grassland": faTree,
  "Scenic Area": faTree,
  "National Preserve": faTree,
  "National Scenic River": faWater,
  "National Historical Park": faLandmark,
  "National Battlefield": faLandmark,
  "National River": faWater,
  Memorial: faMonument,
  Park: faTree,
  "Historical Site": faLandmark,
  Ranch: faTractor,
  "Historic Landmark": faLandmark,
  Monument: faMonument,
  "National Military Park": faLandmark,
  "National Park for the Performing Arts": faMusic,
  "Heritage Corridor": faLandmark,
  Museum: faUniversity,
  "Scenic River": faWater,
  "Historic Trail": faHiking,
  "Memorial Park": faMonument,
  "Heritage Area": faLandmark,
  Estuary: faWater,
  "National Museum": faUniversity,
  "Battlefields Memorial": faLandmark,
  Parkway: faRoad,
  Center: faBuilding,
  Lake: faWater,
  "Great Lake": faWater,
  Lakes: faWater,
  Reservoir: faWater,
  Bay: faWater,
  Inlet: faWater,
  River: faWater,
  "Lake Region": faWater,
  Fjord: faWater,
  "Lake System": faWater,
  "Botanical Garden": faLeaf,
  "Scenic Drive": faRoad,
  "Wildlife Reserve": faFrog,
  Cave: faMountain,
  "Climbing Area": faMountain,
  Zoo: faPaw,
  "Amusement Park": faLaugh,
  "Ski Resort": faSnowboarding,
  Observatory: faSatellite,
  Landmark: faLandmark,
};

const getTypeIcon = (type) => {
  const iconComponent = (
    <FontAwesomeIcon icon={placeToIconMap[type] || faMapMarkerAlt} />
  );
  return ReactDOMServer.renderToString(iconComponent);
};

const FixMapSize = () => {
  const map = useMap();
  React.useEffect(() => {
    map.invalidateSize();
  }, []);
  return null;
};

const RecreationMap = () => {
  const location = useLocation();
  const { city } = location?.state || {};
  const { cityId } = useParams();
  const { cityData, isLoading, error, setCityId } = useCityData();
  const [activeLandmarkId, setActiveLandmarkId] = React.useState(null);

  const currentCity = city ? city : cityData;

  useEffect(() => {
    if (cityId) {
      setCityId(cityId);
    }
  }, [cityId]);

  if (isLoading && !currentCity) return <div>Loading city data...</div>;
  if (error) return <div>Error loading city data: {error.message}</div>;
  if (!cityData && !currentCity) return <div>No city data available.</div>;

  const { Recreation: recreation } = cityData;

  return (
    <CityDataProvider>
      <Card className={styles.card}>
        <Card.Header>
          <h4>Recreation</h4>
        </Card.Header>
        <MapContainer
          center={[cityData.latitude, cityData.longitude]}
          zoom={9}
          scrollWheelZoom={false}
          className={styles.map}
        >
          <FixMapSize />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Circle
            center={[cityData.latitude, cityData.longitude]}
            radius={80467} // 50 miles in meters
            color="black"
            fillColor="green"
            fillOpacity={0.1}
            opacity={0.2}
          />
          <Marker
            position={[cityData.latitude, cityData.longitude]}
            icon={
              new L.DivIcon({
                className: styles.cityMarker,
                html: ReactDOMServer.renderToString(
                  <div>
                    <FontAwesomeIcon icon={faStar} size="2x" color="gold" />
                  </div>
                ),
                iconSize: [30, 30],
              })
            }
          >
            <Tooltip
              direction="top"
              permanent={activeLandmarkId === cityData.city_id}
            >
              <div
                className={styles.tooltipLabel}
                onMouseOver={() => setActiveLandmarkId(cityData.city_id)}
                onMouseOut={() => setActiveLandmarkId(null)}
              >
                <FontAwesomeIcon icon={faStar} size="1x" color="gold" />
                <span>{cityData.city_name}</span>
              </div>
            </Tooltip>
          </Marker>
          {recreation.map((landmark, index) => (
            <Marker
              key={`${landmark.Location}-${index}`}
              position={[landmark.Latitude, landmark.Longitude]}
              className={styles.markerLabel}
              icon={
                new L.DivIcon({
                  className: styles.tooltipIcon,
                  html: getTypeIcon(landmark.Type),
                  iconSize: [40, 40],
                })
              }
              eventHandlers={{
                mouseover: () => setActiveLandmarkId(landmark.id),
                mouseout: () => setActiveLandmarkId(null),
              }}
            >
              <Tooltip open={activeLandmarkId === landmark.id}>
                <div
                  className={styles.tooltipLabel}
                  style={{
                    maxWidth: "400px",
                    whiteSpace: "normal",
                  }}
                >
                  {landmark.Location} - {landmark.Type}
                </div>
              </Tooltip>
            </Marker>
          ))}
        </MapContainer>
      </Card>
    </CityDataProvider>
  );
};

export default RecreationMap;
