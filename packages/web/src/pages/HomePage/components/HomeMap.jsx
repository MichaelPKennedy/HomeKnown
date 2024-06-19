import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { Link } from "react-router-dom";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactDOMServer from "react-dom/server";
import styles from "./HomeMap.module.css";

const HomeMap = (city) => {
  const FixMapSize = () => {
    const map = useMap();
    React.useEffect(() => {
      map.invalidateSize();
    }, []);
    return null;
  };

  const toUrlFriendly = (str) => str?.toLowerCase()?.replace(/\s+/g, "_");

  return (
    <Link
      to={`/results/${toUrlFriendly(city.state_name)}/${toUrlFriendly(
        city.city_name
      )}`}
      key={city.city_id}
      state={{ fromPage: "home", city, fromSurvey: false }}
    >
      <MapContainer
        center={[city.latitude, city.longitude]}
        zoom={5}
        zoomControl={false}
        dragging={false}
        scrollWheelZoom={false}
        className={styles.resultsMap}
      >
        <FixMapSize />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
          position={[city.latitude, city.longitude]}
          icon={
            new L.DivIcon({
              className: styles.cityMarker,
              html: ReactDOMServer.renderToString(
                <div>
                  <FontAwesomeIcon
                    icon={faMapMarkerAlt}
                    size="2x"
                    color="black"
                  />
                </div>
              ),
              iconSize: [30, 30],
            })
          }
        >
          <Tooltip direction="top">
            <FontAwesomeIcon icon={faMapMarkerAlt} size="1x" color="black" />
            <span>{city.city_name}</span>
          </Tooltip>
        </Marker>
      </MapContainer>
    </Link>
  );
};

export default HomeMap;
