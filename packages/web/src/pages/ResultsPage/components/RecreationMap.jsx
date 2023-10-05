import React, { useRef } from "react";
import ReactDOMServer from "react-dom/server";
import L from "leaflet"; // Importing base leaflet library
import "leaflet/dist/leaflet.css";
import styles from "../ResultsPage.module.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
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

const RecreationMap = ({ data }) => {
  const markerRefs = new Map();
  return (
    <div>
      {data.map((item, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <h2>
            {item?.city?.city_name}, {item?.city?.Area?.State?.state}
          </h2>
          <MapContainer
            center={[item.city.Latitude, item.city.Longitude]}
            zoom={10}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker
              position={[item.city.Latitude, item.city.Longitude]}
              icon={
                new L.DivIcon({
                  // Using L.DivIcon from the leaflet library
                  className: styles.markerLabel,
                  html: item.city.city_name,
                  iconSize: [100, 20], // adjust as needed
                })
              }
            />
            {item.nearbyLandmarks.map((landmark) => (
              <Marker
                key={landmark.id}
                position={[landmark.Latitude, landmark.Longitude]}
                icon={
                  new L.DivIcon({
                    className: styles.tooltipIcon,
                    html: getTypeIcon(landmark.Type),
                    iconSize: [30, 30], // adjust as needed
                  })
                }
                ref={(ref) =>
                  markerRefs.set(`${item.city.city_id}-${landmark.id}`, ref)
                }
                eventHandlers={{
                  mouseover: () => {
                    const marker = markerRefs.get(
                      `${item.city.city_id}-${landmark.id}`
                    );
                    if (marker) {
                      marker.openPopup();
                    }
                  },
                  mouseout: () => {
                    const marker = markerRefs.get(
                      `${item.city.city_id}-${landmark.id}`
                    );
                    if (marker) {
                      marker.closePopup();
                    }
                  },
                }}
              >
                <Popup>
                  {landmark.Location} - {landmark.Type}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      ))}
    </div>
  );
};

export default RecreationMap;
