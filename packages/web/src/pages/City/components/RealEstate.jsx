import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Modal from "react-modal";

const RealEstate = ({ data }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Define a base URL for map tiles. You can change this based on your preference or requirements.
  const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  // Ensure to set the modal app element for accessibility purposes.
  Modal.setAppElement("#root");

  return (
    <div>
      <MapContainer
        center={[40.15, -76.6]}
        zoom={13}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer url={tileUrl} />
        {data.home_search.results.map((result) => (
          <Marker
            key={result.property_id}
            position={[
              result.location.address.coordinate.lat,
              result.location.address.coordinate.lon,
            ]}
            eventHandlers={{
              click: () => {
                setSelectedProperty(result);
              },
            }}
          />
        ))}
      </MapContainer>

      {selectedProperty && (
        <Modal
          isOpen={true}
          onRequestClose={() => setSelectedProperty(null)}
          contentLabel="Property Details"
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

//usage <RealEstate data={apiData} />
