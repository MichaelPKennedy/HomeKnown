import React from "react";
import { useCityData } from "../../../utils/CityDataContext";
import { useLocation } from "react-router-dom";
import HousingChart from "../components/HousingChart";

const Housing = () => {
  const location = useLocation();
  const { cityData, isLoading, error } = useCityData();

  const { city } = location?.state || {};
  const currentCity = city ? city : cityData;
  const { HomePrice: homePriceData, MonthlyRent: rentPriceData } =
    currentCity || {};

  const homePrice = homePriceData?.map(
    ({
      city_id,
      city_name,
      county,
      id,
      abbrev,
      state_abbrev,
      metro,
      ...rest
    }) => rest
  );
  const rentPrice = rentPriceData?.map(
    ({
      city_id,
      city_name,
      county,
      id,
      abbrev,
      state_abbrev,
      metro,
      ...rest
    }) => rest
  );

  if (isLoading && !currentCity) return <div>Loading city data...</div>;
  if (error) return <div>Error loading city data: {error.message}</div>;
  if (!cityData && !currentCity) return <div>No city data available.</div>;
  if (
    (!homePrice && !rentPrice) ||
    (homePrice?.length === 0 && rentPrice?.length === 0)
  ) {
    return <div>No housing data available for this location</div>;
  }
  return (
    <>
      <HousingChart housingData={homePrice} rentData={rentPrice} />
    </>
  );
};

export default Housing;
