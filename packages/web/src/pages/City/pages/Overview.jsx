import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCityData } from "../../../utils/CityDataContext";
import WeatherForecast from "../components/WeatherForecast";
import CityPhotos from "../components/CityPhotos";
import styles from "../City.module.css";

const Overview = () => {
  const location = useLocation();
  const { city } = location?.state || {};
  const { cityData, isLoading, error } = useCityData();

  const currentCity = city ? city : cityData;
  const { photos } = cityData || {};
  const { description } = currentCity || {};

  if (isLoading && !currentCity) return <div>Loading city data...</div>;
  if (error) return <div>Error loading city data: {error.message}</div>;
  if (!cityData && !currentCity) return <div>No city data available.</div>;

  return (
    <div className="container">
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
    </div>
  );
};

export default Overview;
