import React, { useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import L from "leaflet"; // Importing base leaflet library
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

const RecreationMap = (data) => {
  const markerRefs = new Map();
  const [hoveredCity, setHoveredCity] = React.useState(null);
  const { Recreation: recreation } = data;
  console.log("data", data);

  return (
    <div className={styles.mapContainer}>
      <div>
        <MapContainer
          center={[data.latitude, data.longitude]}
          zoom={9}
          className={styles.map}
        >
          <FixMapSize />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Circle
            center={[data.latitude, data.longitude]}
            radius={80467} // 50 miles in meters
            color="black"
            fillColor="green"
            fillOpacity={0.1} // Opacity of the circle fill
            opacity={0.2}
          />
          <Marker
            position={[data.latitude, data.longitude]}
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
            <Tooltip direction="top" permanent={hoveredCity === data.city_id}>
              <div
                className={styles.tooltipLabel}
                onMouseOver={() => setHoveredCity(data.city_id)}
                onMouseOut={() => setHoveredCity(null)}
              >
                <FontAwesomeIcon icon={faStar} size="1x" color="gold" />
                <span>{data.city_name}</span>
              </div>
            </Tooltip>
          </Marker>
          {recreation.map((landmark) => (
            <Marker
              key={`${data.city_id}-${landmark.Location}`}
              position={[landmark.Latitude, landmark.Longitude]}
              className={styles.markerLabel}
              icon={
                new L.DivIcon({
                  className: styles.tooltipIcon,
                  html: getTypeIcon(landmark.Type),
                  iconSize: [40, 40], // adjust as needed
                })
              }
              ref={(ref) =>
                markerRefs.set(`${data.city_id}-${landmark.id}`, ref)
              }
              eventHandlers={{
                mouseover: () => {
                  const marker = markerRefs.get(
                    `${data.city_id}-${landmark.id}`
                  );
                  if (marker) {
                    marker.openTooltip();
                  }
                },
                mouseout: () => {
                  const marker = markerRefs.get(
                    `${data.city_id}-${landmark.id}`
                  );
                  if (marker) {
                    marker.closeTooltip();
                  }
                },
              }}
            >
              <Tooltip>
                <div className={styles.tooltipLabel}>
                  {landmark.Location} - {landmark.Type}
                </div>
              </Tooltip>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default RecreationMap;
