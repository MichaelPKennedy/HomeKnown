import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useCityData, CityDataProvider } from "../../../utils/CityDataContext";

const Overview = () => {
  const location = useLocation();
  const { city } = location?.state || {};
  const { cityId } = useParams();
  const { cityData, isLoading, error, setCityId } = useCityData();

  const currentCity = city ? city : cityData;
  const { description } = currentCity || {};

  useEffect(() => {
    if (cityId) {
      setCityId(cityId);
    }
  }, [cityId]);

  if (isLoading && !currentCity) return <div>Loading city data...</div>;
  if (error) return <div>Error loading city data: {error.message}</div>;
  if (!cityData && !currentCity) return <div>No city data available.</div>;

  return (
    <CityDataProvider>
      {description ? (
        <div>
          <p>{description}</p>
        </div>
      ) : (
        <p>No description available for this city.</p>
      )}
    </CityDataProvider>
  );
};

export default Overview;
