import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCityData } from "../../../utils/CityDataContext";
import WeatherForecast from "../components/WeatherForecast";
import CityPhotos from "../components/CityPhotos";
import styles from "../City.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Assuming you are using FontAwesome for icons
import {
  faBuilding,
  faUsers,
  faMountain,
} from "@fortawesome/free-solid-svg-icons";

const CityFactCard = ({ factName, factValue, icon }) => {
  return (
    <div className="col col-lg-3 col-md-6 col-sm-6 pl-2 pr-2">
      <div className={styles.factCard}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.fact}>
          <div className={styles.factName}>{factName}</div>
          <div className={styles.factValue}>{factValue}</div>
        </div>
      </div>
    </div>
  );
};

const Overview = () => {
  const location = useLocation();
  const { city } = location?.state || {};
  const { cityData, isLoading, error } = useCityData();

  const currentCity = city ? city : cityData;
  const { photos } = currentCity || {};
  const { description } = currentCity || {};

  const cityFacts = [
    {
      name: "Population",
      value: currentCity?.Population?.pop_2022,
      icon: faUsers,
    },
    { name: "County", value: currentCity.county_name, icon: faBuilding },
    { name: "Metro Area", value: currentCity.metroArea, icon: faBuilding },
    {
      name: "Elevation",
      value: `${currentCity?.elevation} ft`,
      icon: faMountain,
    },
  ];

  if (isLoading && !currentCity) return <div>Loading city data...</div>;
  if (error) return <div>Error loading city data: {error.message}</div>;
  if (!cityData && !currentCity) return <div>No city data available.</div>;

  return (
    <div className="container pl-0 pr-0">
      {photos?.length > 0 && (
        <div className={styles.cityPhotos}>
          <CityPhotos photos={photos} />
        </div>
      )}
      <div className="row">
        <div className="col-md-12">
          <h5>About</h5>
          {description ? (
            <div>
              <p>{description}</p>
            </div>
          ) : (
            <div>
              <p>No description available for this city.</p>
            </div>
          )}
        </div>

        {/* <div className="col-md-4">
          <WeatherForecast {...currentCity} />
        </div> */}
      </div>
      <div
        className={`${styles.factsContainer} row gx-lg-1 gx-md-1 gx-0 mb-5 mt-3`}
      >
        {cityFacts.map((fact, index) => (
          <CityFactCard
            key={index}
            factName={fact.name}
            factValue={fact.value}
            icon={<FontAwesomeIcon icon={fact.icon} />}
          />
        ))}
      </div>
    </div>
  );
};

export default Overview;
