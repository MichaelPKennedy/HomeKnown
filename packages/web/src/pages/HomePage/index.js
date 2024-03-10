import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useCityData } from "../../utils/CityDataContext";
import CookieConsent from "./components/CookieConsent";
import SearchBar from "./components/SearchBar";
import CityCard from "./components/CityCard";
import Photos from "./components/Photos";
import client from "../../feathersClient.js";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const { userRecommendations, stats } = useCityData();
  const { topCities, topMonthlyCities } = stats || {};
  const handleSearch = async (searchTerm) => {
    try {
      const results = await client.service("/search").find({
        query: {
          search: searchTerm,
        },
      });

      return results;
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  useEffect(() => {
    console.log("userRecommendations", userRecommendations);
    console.log("stats", stats);
  }, [userRecommendations, stats]);

  return (
    <Container style={{ maxWidth: "90%", margin: "0 auto" }}>
      <Row className="mt-4 mb-5" style={{ maxWidth: "70%", margin: "0 auto" }}>
        <Col xs={12}>
          <SearchBar onSearch={handleSearch} />
        </Col>
      </Row>
      <div className={styles.statsHeader}>
        <p>Top User Cities This Month</p>
      </div>
      <Row className={styles.statsContainer}>
        {topMonthlyCities?.slice(0, 10).map((city, index) => (
          <Col
            key={`monthly-${city.city_id}-${index}`}
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

      <CookieConsent />
    </Container>
  );
};

export default HomePage;
