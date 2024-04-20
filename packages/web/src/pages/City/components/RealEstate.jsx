import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useCityData } from "../../../utils/CityDataContext";
import { Card } from "react-bootstrap";
import FilterModal from "./FilterModal";
import FilterBar from "./FilterBar";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Modal from "react-modal";
import { Spinner } from "react-bootstrap";
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
      <div className={styles.popup}>{children}</div>
    </Popup>
  );
};

const RealEstate = ({ city }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  Modal.setAppElement("#root");

  const { realEstateData, isRealEstateLoading, realEstateError } =
    useCityData();

  const handleOpenModal = (property) => {
    setSelectedProperty(property);
    setIsModalOpen(true);
  };

  const customMarkerIcon = new L.DivIcon({
    html: `<div class="${styles.circleMapMarker}"></div>`,
    className: "",
    iconSize: [30, 30],
  });

  const applyFilters = (filters) => {
    const filtered = realEstateData?.filter((result) => {
      const matchesStatus = result.status === filters.status;
      const matchesPropertyType =
        filters.propertyTypes === "any" ||
        filters.propertyTypes.includes(result.description.type);

      const listPriceMin = result.list_price || result.list_price_min;
      const listPriceMax = result.list_price || result.list_price_max;
      const matchesMinPrice =
        filters.price.min === "any" || listPriceMin >= filters.price.min;
      const matchesMaxPrice =
        filters.price.max === "any" || listPriceMax <= filters.price.max;
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
        matchesStatus &&
        matchesPropertyType &&
        matchesMinPrice &&
        matchesMaxPrice &&
        matchesBeds &&
        matchesBaths &&
        matchesSqftMin &&
        matchesSqftMax
      );
    });

    setFilters(filters);
    setFilteredData(filtered);
    setIsFilterModalOpen(false);
  };

  const propertyTypes = [
    "apartment",
    "condo_townhome",
    "condos",
    "coop",
    "duplex_triplex",
    "farm",
    "land",
    "mobile",
    "multi_family",
    "single_family",
    "townhomes",
  ];

  const buyPriceOptions = [
    0, 50000, 100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000,
    500000, 550000, 600000, 650000, 700000, 750000, 800000, 850000, 900000,
    950000, 1000000, 1250000, 1500000, 1750000, 2000000, 2250000, 2500000,
    2750000, 3000000, 3250000, 3500000, 3750000, 4000000, 4250000, 4500000,
    4750000, 5000000, 6000000, 7000000, 8000000, 9000000, 10000000, 11000000,
    12000000, 13000000, 14000000, 15000000, 16000000,
  ];

  const rentPriceOptions = [
    0, 500, 1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000,
    6500, 7000, 7500, 8000, 8500, 9000, 9500, 10000,
  ];

  const [filters, setFilters] = useState({
    status: "for_sale",
    price: { min: "any", max: "any" },
    beds: "any",
    baths: "any",
    sqft: { min: "any", max: "any" },
    propertyTypes: propertyTypes,
  });

  useEffect(() => {
    applyFilters(filters);
  }, [realEstateData]);

  useEffect(() => {
    const stored = sessionStorage.getItem("formData");
    if (stored) {
      const storedFilters = JSON.parse(stored);
      if (storedFilters.housingType) {
        const newFilters = { ...filters };
        newFilters.status =
          storedFilters.housingType === "buy" ? "for_sale" : "for_rent";

        if (storedFilters.housingType === "buy") {
          newFilters.price.min = getClosestPrice(
            storedFilters.homeMin,
            buyPriceOptions
          );
          newFilters.price.max = getClosestPrice(
            storedFilters.homeMax,
            buyPriceOptions
          );
        } else if (storedFilters.housingType === "rent") {
          newFilters.price.min = getClosestPrice(
            storedFilters.rentMin,
            rentPriceOptions
          );
          newFilters.price.max = getClosestPrice(
            storedFilters.rentMax,
            rentPriceOptions
          );
        }

        setFilters(newFilters);
        applyFilters(newFilters);
      }
    }
  }, []);

  function getClosestPrice(price, options) {
    const numPrice = Number(price);
    const validOptions = options.filter((option) => typeof option === "number");

    let closest = validOptions[0];
    for (let i = 1; i < validOptions.length; i++) {
      if (validOptions[i] <= numPrice && validOptions[i] > closest) {
        closest = validOptions[i];
      }
    }
    return closest;
  }

  const handleStatusChange = (status) => {
    const newFilters = {
      ...filters,
      price: { min: "any", max: "any" },
      status: status,
    };
    setFilters(newFilters);
    applyFilters(newFilters);
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
        <div>
          <div className={styles.buttonContainer}>
            <div className={styles.dropdown}>
              <select
                className={`form-control custom-select ${styles.select}`}
                value={filters.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                style={{
                  maxWidth: "200px",
                  margin: "0 auto",
                  marginRight: "10px",
                }}
              >
                <option value="for_rent">For Rent</option>
                <option value="for_sale">For Sale</option>
                <option value="sold">Sold</option>
              </select>
            </div>
            <button
              onClick={() => setIsFilterModalOpen(true)}
              className={styles.filterButton}
            >
              Filter Properties
            </button>
          </div>
        </div>
      )}
      {isRealEstateLoading && (
        <div className="d-flex align-items-center ml-3 mb-3">
          <p className="mb-0 mr-1">Real Estate Data Loading...</p>
          <Spinner animation="border" size="sm" />
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
            ?.filter((result) => result.location.address.coordinate)
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
                  position={result?.location?.address?.coordinate}
                >
                  <div
                    className={styles.popupClick}
                    // onClick={() => handleOpenModal(result)}
                  >
                    <div className={styles.addressContainer}>
                      <p className={styles.address}>
                        {result?.location?.address.line},{" "}
                        {result?.location?.address.city}
                      </p>
                    </div>
                    <img
                      src={result?.location?.street_view_url}
                      alt="Street View"
                      className={styles.photo}
                    />
                    <p className="mb-0">
                      Price:{" "}
                      {result.list_price
                        ? `$${result.list_price}`
                        : result.list_price_min && result.list_price_max
                        ? `$${result.list_price_min} - $${result.list_price_max}`
                        : "N/A"}
                    </p>
                    <span>
                      {result?.description?.type?.replace(/_/g, " ")} |{" "}
                    </span>
                    {result.description.beds && (
                      <span>{result?.description?.beds} beds | </span>
                    )}
                    {result.description.baths && (
                      <span>{result?.description?.baths} baths | </span>
                    )}
                    <span>{result?.description?.sqft} sqft </span>
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
                : selectedProperty.list_price_min &&
                  selectedProperty.list_price_max
                ? `$${selectedProperty.list_price_min} - $${selectedProperty.list_price_max}`
                : "N/A"}
            </p>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </Modal>
        )}
        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={() => setIsFilterModalOpen(false)}
          onApplyFilters={applyFilters}
          filters={filters}
        />
      </Card>
    </div>
  );
};

export default RealEstate;
