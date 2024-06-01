import React, { useEffect, useState } from "react";
import client from "../../../feathersClient";
import { useCityData } from "../../../utils/CityDataContext";
import { useLocation } from "react-router-dom";
import HousingChart from "../components/HousingChart";
import RealEstate from "../components/RealEstate";

const Housing = () => {
  const location = useLocation();
  const {
    cityData,
    isLoading,
    error,
    realEstateData,
    realEstateLoading,
    realEstateError,
  } = useCityData();

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

  return (
    <>
      <RealEstate city={currentCity} />
      <HousingChart housingData={homePrice} rentData={rentPrice} />
    </>
  );
};

export default Housing;
