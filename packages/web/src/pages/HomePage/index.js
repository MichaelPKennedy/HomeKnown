import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useCityData } from "../../utils/CityDataContext";
import CookieConsent from "./components/CookieConsent";
import SearchNavStrip from "./components/SearchNavStrip";
import SearchBar from "./components/SearchBar";
import CityCard from "./components/CityCard";
import client from "../../feathersClient.js";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const { stats } = useCityData();
  const [selectedOption, setSelectedOption] = useState("topMonthlyCities");

  const handleSelectionChange = (optionId) => {
    setSelectedOption(optionId);
  };

  const getSelectedCities = () => {
    return stats[selectedOption]?.slice(0, 10) || [];
  };

  useEffect(() => {
    console.log("Selected Option:", selectedOption);
  }, [selectedOption]);

  const handleSearch = async (searchTerm) => {
    try {
      const authToken = localStorage.getItem("authToken");
      let headers;
      if (authToken) {
        headers = {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        };
      }
      const results = await client.service("/search").find({
        query: {
          search: searchTerm,
        },
        headers,
      });

      return results;
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <div className={styles.homeContainer}>
      <Row className={`${styles.searchBar} mt-4 mb-2 pl-0 pr-0`}>
        <Col xs={12} className="pl-0 pr-0">
          <SearchBar onSearch={handleSearch} />
        </Col>
      </Row>
      <SearchNavStrip
        onSelectionChange={handleSelectionChange}
        currentSelection={selectedOption}
      />
      <Row className={styles.statsContainer}>
        {getSelectedCities()
          .slice(0, 10)
          .map((city, index) => (
            <Col
              key={`${selectedOption}-${city.city_id}-${index}`}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              xl={3}
              className="d-flex align-items-stretch"
            >
              <CityCard city={city} index={index} />
            </Col>
          ))}
      </Row>
      {/* <div className={styles.statsHeader}>
        <p>Top User Cities All Time</p>
      </div>
      <Row className={styles.statsContainer}>
        {topCities?.slice(0, 10).map((city, index) => (
          <Col
            key={`all-time-${city.city_id}-${index}`}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            xl={3}
            className="d-flex align-items-stretch"
          >
            <CityCard city={city} index={index} />
          </Col>
        ))}
      </Row> */}
      {/* <CookieConsent /> */}
    </div>
  );
};

export default HomePage;
