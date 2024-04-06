import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Modal from "react-modal";

const RealEstate = ({ data, city }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  Modal.setAppElement("#root");

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
            console.log("result", result);
            const { lat, lon } = result.location.address.coordinate;
            return (
              <Marker
                key={result.property_id}
                position={[lat, lon]}
                eventHandlers={{
                  click: () => {
                    setSelectedProperty(result);
                  },
                }}
              />
            );
          })}
      </MapContainer>

      {selectedProperty && (
        <Modal
          isOpen={true}
          onRequestClose={() => setSelectedProperty(null)}
          contentLabel="Property Details"
          style={{ overlay: { zIndex: 1000 }, width: "50%" }}
        >
          <h2>
            {selectedProperty.location.address.line},{" "}
            {selectedProperty.location.address.city}
          </h2>
          <img
            src={selectedProperty.primary_photo.href}
            alt="Primary"
            style={{ width: "100%" }}
          />
          <img
            src={selectedProperty.location.street_view_url}
            alt="Street View"
            style={{ width: "100%" }}
          />
          <p>
            Price: ${selectedProperty.list_price_min} - $
            {selectedProperty.list_price_max}
          </p>
          {/* Add more details as needed */}
          <button onClick={() => setSelectedProperty(null)}>Close</button>
        </Modal>
      )}
    </div>
  );
};

export default RealEstate;
