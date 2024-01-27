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

const ResultsMap = (city) => {
  const FixMapSize = () => {
    const map = useMap();
    React.useEffect(() => {
      map.invalidateSize();
    }, []);
    return null;
  };

  return (
    <MapContainer
      center={[city.latitude, city.longitude]}
      zoom={5}
      scrollWheelZoom={false}
      className={styles.resultsMap}
    >
      <FixMapSize />
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
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
    </MapContainer>
  );
};

export default ResultsMap;
