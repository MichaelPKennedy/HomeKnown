import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import ReactDOMServer from "react-dom/server";
import FilterModal from "./FilterModal";
import FilterBar from "./FilterBar";
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
      <div style={{ width: "300px", height: "315px", overflow: "auto" }}>
        {children}
      </div>
    </Popup>
  );
};

const RealEstate = ({ data, city }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filteredData, setFilteredData] = useState(data);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
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

  const applyFilters = (filters) => {
    const filtered = data.filter((result) => {
      const matchesType =
        filters.type === "any" || result.status === filters.type;
      const matchesPropertyType =
        filters.propertyType === "any" ||
        result.description.type === filters.propertyType;
      const matchesMinPrice =
        filters.price.min === "any" || result.list_price >= filters.price.min;
      const matchesMaxPrice =
        filters.price.max === "any" || result.list_price <= filters.price.max;
      const matchesBeds =
        filters.beds === "any" || result.description.beds >= filters.beds;
      const matchesBaths =
        filters.baths === "any" || result.description.baths >= filters.baths;
      const matchesSqftMin =
        filters.sqft.min === "any" ||
        result.description.sqft >= filters.sqft.min;
      const matchesSqftMax =
        filters.sqft.max === "any" ||
        result.description.sqft <= filters.sqft.max;

      return (
        matchesType &&
        matchesPropertyType &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesBeds &&
        matchesBaths &&
        matchesSqftMin &&
        matchesSqftMax
      );
    });

    setFilteredData(filtered);
    setIsFilterModalOpen(false);
  };

  const [filters, setFilters] = useState({
    type: "any",
    price: { min: "any", max: "any" },
    beds: "any",
    baths: "any",
    sqft: { min: "any", max: "any" },
    propertyType: "any",
  });

  const handleFilterChange = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const handleFilterChangeDesktop = (filterName, value) => {
    const newFilters = {
      ...filters,
      [filterName]: value,
    };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  const handleApplyFilters = () => {
    applyFilters(filters);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.mapContainer}>
      {!isMobile && (
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChangeDesktop}
          onApplyFilters={handleApplyFilters}
        />
      )}
      {isMobile && (
        <div className={styles.buttonContainer}>
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className={styles.filterButton}
          >
            Filter Properties
          </button>
        </div>
      )}
      <Card className={styles.card}>
        <MapContainer
          center={[city.latitude, city.longitude]}
          zoom={11}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer url={tileUrl} />
          {filteredData
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
                      style={{ width: "100%", height: "210px" }}
                    />
                    <p className="mb-0">
                      Price:{" "}
                      {result.list_price
                        ? `$${result.list_price}`
                        : `$${result.list_price_min} - $${result.list_price_max}`}
                    </p>
                    <span>{result.description.type.replace(/_/g, " ")} | </span>
                    {result.description.beds && (
                      <span>{result.description.beds} beds | </span>
                    )}
                    {result.description.baths && (
                      <span>{result.description.baths} baths | </span>
                    )}
                    <span>{result.description.sqft} sqft </span>
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
        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          onApplyFilters={applyFilters}
        />
      </Card>
    </div>
  );
};

export default RealEstate;
