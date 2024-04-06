import React, { useEffect, useState } from "react";
import client from "../../../feathersClient";
import { useCityData } from "../../../utils/CityDataContext";
import { useLocation } from "react-router-dom";
import HousingChart from "../components/HousingChart";
import RealEstate from "../components/RealEstate";

const Housing = () => {
  const location = useLocation();
  const { cityData, isLoading, error } = useCityData();
  const [apiData, setApiData] = useState([]);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.service("/realty").find({
          query: {
            state_code: currentCity.state_abbrev,
            city: currentCity.city_name,
          },
        });
        console.log("response", response);
        setApiData(response);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [currentCity]);

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
      {apiData?.length > 0 && <RealEstate data={apiData} city={currentCity} />}
      <HousingChart housingData={homePrice} rentData={rentPrice} />
    </>
  );
};

export default Housing;
