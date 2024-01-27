import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactDOMServer from "react-dom/server";
import styles from "../ResultsPage.module.css";

const LargeResultsMap = ({ cities }) => {
  const FixMapSize = () => {
    const map = useMap();
    React.useEffect(() => {
      map.invalidateSize();
    }, []);
    return null;
  };

  // Set map center to the geographical center of the contiguous United States
  const mapCenter = [39.5, -98.35];

  return (
    <MapContainer
      center={mapCenter}
      zoom={4}
      scrollWheelZoom={false}
      className={styles.largeResultsMap}
    >
      <FixMapSize />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {cities.map((city, index) => (
        <Marker
          key={index}
          position={[city.latitude, city.longitude]}
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
          <Tooltip direction="top">
            <FontAwesomeIcon icon={faStar} size="1x" color="gold" />
            <span>{city.city_name}</span>
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default LargeResultsMap;
