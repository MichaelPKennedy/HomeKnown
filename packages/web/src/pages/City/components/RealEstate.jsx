import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Modal from "react-modal";
import styles from "./RealEstate.module.css";

const RealEstate = ({ data, city }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  // State to control the visibility of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  Modal.setAppElement("#root");

  const handleMarkerClick = (property) => {
    setSelectedProperty(property);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <MapContainer
        center={[city.latitude, city.longitude]}
        zoom={11}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer url={tileUrl} />
        {data
          .filter((result) => result.location.address.coordinate)
          .map((result) => {
            const { lat, lon } = result.location.address.coordinate;
            return (
              <Marker
                key={result.property_id}
                position={[lat, lon]}
                eventHandlers={{
                  click: () => handleMarkerClick(result),
                }}
              >
                <Popup>
                  <div onClick={handleOpenModal}>
                    <h2>
                      {result.location.address.line},{" "}
                      {result.location.address.city}
                    </h2>
                    <img
                      src={result.location.street_view_url}
                      alt="Street View"
                      style={{ width: "100%" }}
                    />
                    <p>
                      Price: ${result.list_price_min} - ${result.list_price_max}
                    </p>
                  </div>
                </Popup>
              </Marker>
            );
          })}
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
            style={{ width: "100%" }}
          />
          <p>
            Price: ${selectedProperty.list_price_min} - $
            {selectedProperty.list_price_max}
          </p>
          <button onClick={() => setIsModalOpen(false)}>Close</button>
        </Modal>
      )}
    </div>
  );
};

export default RealEstate;
