import React, { useEffect, useState, useContext } from "react";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import { useCityData, CityDataProvider } from "../../../utils/CityDataContext";
import ReactDOMServer from "react-dom/server";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "../ResultsPage.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  Circle,
  useMap,
} from "react-leaflet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTree,
  faMountain,
  faHiking,
  faArchway,
  faTint,
  faBinoculars,
  faUmbrellaBeach,
  faLandmark,
  faMonument,
  faTractor,
  faMusic,
  faUniversity,
  faRoad,
  faBuilding,
  faLeaf,
  faFrog,
  faPaw,
  faLaugh,
  faSnowboarding,
  faSatellite,
  faStar,
  faFish,
  faSwimmer,
  faDumbbell,
  faWineBottle,
  faSpa,
  faGolfBall,
  faShoppingCart,
  faTheaterMasks,
  faCampground,
  faBicycle,
  faPizzaSlice,
  faCocktail,
  faPalette,
  faCameraRetro,
  faSkating,
  faRunning,
  faSwimmingPool,
  faAnchor,
  faDrum,
  faBasketballBall,
  faFutbol,
  faHotTub,
  faCarrot,
  faWater,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Card, Button, Modal, Form } from "react-bootstrap";

const placeToIconMap = {
  restaurants: faPizzaSlice,
  beaches: faUmbrellaBeach,
  lakes: faWater,
  bars: faCocktail,
  mountains: faMountain,
  hikingTrails: faHiking,
  caves: faArchway,
  monuments: faLandmark,
  archaeologicalSites: faCameraRetro,
  museums: faUniversity,
  waterfalls: faTint,
  forests: faTree,
  skiResorts: faSnowboarding,
  nationalParks: faTree,
  botanicalGardens: faLeaf,
  rivers: faWater,
  sportsCentres: faBasketballBall,
  swimmingFacilities: faSwimmer,
  climbingCentres: faMountain,
  tennisCentres: faFutbol,
  crossCountrySkiAreas: faSkating,
  rockClimbing: faMountain,
  zoos: faPaw,
  wildlifeReserves: faFrog,
  artGalleries: faPalette,
  aquariums: faFish,
  parks: faLeaf,
  bicycleTrails: faBicycle,
  musicVenues: faMusic,
  farmersMarkets: faCarrot,
  golfCourses: faGolfBall,
  spasAndWellnessCenters: faSpa,
  vineyards: faWineBottle,
  hotAirBalloonRides: faHotTub,
  artStudios: faPalette,
  yogaStudios: faRunning,
  fitnessGyms: faDumbbell,
  danceStudios: faTheaterMasks,
  racecourses: faRunning,
  swimmingPoolFacilities: faSwimmingPool,
  shoppingCenters: faShoppingCart,
  amusementParks: faLaugh,
  telescopeObservatories: faSatellite,
  planetariums: faStar,
  nightclubs: faMusic,
};

const getTypeIcon = (type) => {
  const iconComponent = (
    <FontAwesomeIcon icon={placeToIconMap[type] || faMapMarkerAlt} />
  );
  return ReactDOMServer.renderToString(iconComponent);
};

const FixMapSize = () => {
  const map = useMap();
  React.useEffect(() => {
    map.invalidateSize();
  }, []);
  return null;
};

const RecreationMap = ({ data }) => {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [filters, setFilters] = useState({});
  const [tempFilters, setTempFilters] = useState({});
  const { userRecInterests } = useCityData();

  useEffect(() => {
    console.log("recreational Interests from context", userRecInterests);
  }, [userRecInterests]);

  const handleFilterModalToggle = () => {
    setShowFilterModal(!showFilterModal);
    if (!showFilterModal) {
      setTempFilters(filters);
    }
  };

  const setOnlyFilter = (type) => {
    setTempFilters((prev) =>
      Object.keys(prev).reduce((acc, key) => {
        acc[key] = key === type;
        return acc;
      }, {})
    );
  };

  const applyFilters = () => {
    setFilters(tempFilters);
    localStorage.setItem("recreationFilters", JSON.stringify(tempFilters));
    setShowFilterModal(false);
  };

  useEffect(() => {
    const storedFilters = localStorage.getItem("recreationFilters");
    if (storedFilters) {
      setFilters(JSON.parse(storedFilters));
    }
  }, []);

  useEffect(() => {
    if (userRecInterests && !filters) {
      const newFilters = Object.keys(userRecInterests).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {});

      setFilters(newFilters);
    }
  }, [userRecInterests]);

  return (
    <CityDataProvider>
      <Card className={styles.card}>
        <Card.Header>
          <h4>Recreation</h4>
          <Button variant="primary" onClick={handleFilterModalToggle}>
            Filter Preferences
          </Button>
        </Card.Header>
        <MapContainer
          center={[data.latitude, data.longitude]}
          zoom={9}
          scrollWheelZoom={false}
          className={styles.map}
        >
          <FixMapSize />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Circle
            center={[data.latitude, data.longitude]}
            radius={50000} // 50 km in meters
            color="black"
            fillColor="green"
            fillOpacity={0.1}
            opacity={0.2}
          />
          <Marker
            position={[data.latitude, data.longitude]}
            icon={
              new L.DivIcon({
                className: styles.cityMarker,
                html: ReactDOMServer.renderToString(
                  <FontAwesomeIcon icon={faStar} size="2x" color="gold" />
                ),
                iconSize: [30, 30],
              })
            }
          >
            <Tooltip direction="top" offset={[0, 0]} opacity={1}>
              {data.city_name}
            </Tooltip>
          </Marker>
          {userRecInterests &&
            Object.entries(userRecInterests).map(([type, elements]) => {
              if (filters[type]) {
                return elements.map((element, index) => {
                  const position = element.center
                    ? [element.center.lat, element.center.lon]
                    : [element.lat, element.lon];
                  return (
                    <Marker
                      key={`${type}-${index}`}
                      position={position}
                      icon={
                        new L.DivIcon({
                          className: styles.marker,
                          html: getTypeIcon(type),
                          iconSize: [30, 30],
                        })
                      }
                    >
                      <Tooltip direction="top" offset={[0, 0]} opacity={1}>
                        {element.tags.name || type}
                      </Tooltip>
                    </Marker>
                  );
                });
              } else {
                return null;
              }
            })}
        </MapContainer>
      </Card>
      <Modal show={showFilterModal} onHide={handleFilterModalToggle}>
        <Modal.Header closeButton>
          <Modal.Title>Filter Recreational Interests</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {Object.keys(filters).length === 0 ? (
            <p>No recreational interests selected.</p>
          ) : (
            Object.keys(tempFilters).map((type) => (
              <div key={type} className="d-flex align-items-center mb-2">
                <Form.Check
                  type="checkbox"
                  id={`checkbox-${type}`}
                  label={
                    type.charAt(0).toUpperCase() +
                    type.slice(1).replaceAll(/([A-Z])/g, " $1")
                  }
                  checked={tempFilters[type]}
                  onChange={() =>
                    setTempFilters((prev) => ({ ...prev, [type]: !prev[type] }))
                  }
                  className="flex-grow-1"
                />
                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={() => setOnlyFilter(type)}
                >
                  Only
                </Button>
              </div>
            ))
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFilterModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={applyFilters}>
            Save and Apply
          </Button>
        </Modal.Footer>
      </Modal>
    </CityDataProvider>
  );
};

export default RecreationMap;
