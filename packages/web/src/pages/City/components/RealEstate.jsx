import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import ReactDOMServer from "react-dom/server";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Modal from "react-modal";
import styles from "./RealEstate.module.css";

const PopupWithAdjustment = ({ children, position }) => {
  const map = useMap();

  React.useEffect(() => {
    if (position && position.lat != null && position.lng != null) {
      const adjustMapForPopup = () => {
        const popupOffsetLatLng = L.latLng(position.lat, position.lng);
        if (map) map.panTo(popupOffsetLatLng, { animate: true });
      };

      adjustMapForPopup();
    }
  }, [map, position]);

  return (
    <Popup>
      <div style={{ width: "300px", height: "310px", overflow: "auto" }}>
        {children}
      </div>
    </Popup>
  );
};

const RealEstate = ({ data, city }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  Modal.setAppElement("#root");

  const handleOpenModal = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const customMarkerIcon = new L.DivIcon({
    html: ReactDOMServer.renderToString(
      <FontAwesomeIcon icon={faMapMarkerAlt} size="2x" color="black" />
    ),
    className: "custom-marker",
    iconSize: [30, 30],
  });

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={[city.latitude, city.longitude]}
        zoom={11}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer url={tileUrl} />
        {data
          .filter((result) => result.location.address.coordinate)
          .map((result) => (
            <Marker
              key={result.property_id}
              position={[
                result.location.address.coordinate.lat,
                result.location.address.coordinate.lon,
              ]}
              icon={customMarkerIcon}
            >
              <PopupWithAdjustment
                position={result.location.address.coordinate}
              >
                <div
                  className={styles.popupClick}
                  onClick={() => handleOpenModal(result)}
                >
                  <div className={styles.addressContainer}>
                    <p className={styles.address}>
                      {result.location.address.line},{" "}
                      {result.location.address.city}
                    </p>
                  </div>
                  <img
                    src={result.location.street_view_url}
                    alt="Street View"
                    style={{ width: "100%", height: "220px" }}
                  />
                  <p className="mb-0">
                    Price:{" "}
                    {result.list_price
                      ? `$${result.list_price}`
                      : `$${result.list_price_min} - $${result.list_price_max}`}
                  </p>
                </div>
              </PopupWithAdjustment>
            </Marker>
          ))}
      </MapContainer>

      {selectedProperty && (
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Property Details"
          style={{ overlay: { zIndex: 1000 } }}
        >
          <h2>
            {selectedProperty.location.address.line},{" "}
            {selectedProperty.location.address.city}
          </h2>
          <img
            src={selectedProperty.location.street_view_url}
            alt="Street View"
            style={{ maxWidth: "80%", height: "80%" }}
          />
          <p className="mb-0">
            Price:{" "}
            {selectedProperty.list_price
              ? `$${selectedProperty.list_price}`
              : `$${selectedProperty.list_price_min} - $${selectedProperty.list_price_max}`}
          </p>
          <button onClick={() => setIsModalOpen(false)}>Close</button>
        </Modal>
      )}
    </div>
  );
};

export default RealEstate;
