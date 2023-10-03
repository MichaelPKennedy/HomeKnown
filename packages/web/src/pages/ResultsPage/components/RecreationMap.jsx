import React, { useRef } from "react";
import ReactDOMServer from "react-dom/server";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMountain,
  faTree,
  faWater,
  faUmbrellaBeach,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

import L from "leaflet"; // Importing base leaflet library
import "leaflet/dist/leaflet.css";
import styles from "../ResultsPage.module.css";

const getLabelWidth = (text) => {
  const baseWidth = 60; // A base width
  const additionalWidth = text.length * 6; // Width per character, adjust as needed
  return baseWidth + additionalWidth;
};

const getTypeIcon = (type) => {
  const iconComponent = (() => {
    switch (type) {
      case "Mountain":
        return <FontAwesomeIcon icon={faMountain} />;
      case "National Park":
        return <FontAwesomeIcon icon={faTree} />;
      case "Lake":
        return <FontAwesomeIcon icon={faWater} />;
      case "Beach":
        return <FontAwesomeIcon icon={faUmbrellaBeach} />;
      // ... add cases for other types
      default:
        return <FontAwesomeIcon icon={faMountain} />; // default icon
    }
  })();

  return ReactDOMServer.renderToString(iconComponent);
};

const RecreationMap = ({ data }) => {
  const markerRefs = new Map();
  return (
    <div>
      {data.map((item, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <h2>{item.city.city_name}</h2>
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
                ref={(ref) => markerRefs.set(landmark.id, ref)} // Set the ref for each marker
                eventHandlers={{
                  mouseover: () => {
                    const marker = markerRefs.get(landmark.id);
                    if (marker) {
                      marker.openPopup();
                    }
                  },
                  mouseout: () => {
                    const marker = markerRefs.get(landmark.id);
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
