import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useCityData } from "../../utils/CityDataContext";
import CookieConsent from "./components/CookieConsent";
import SearchBar from "./components/SearchBar";
import CityCard from "./components/CityCard";
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
    <Container style={{ maxWidth: "70%", margin: "0 auto" }}>
      <Row className="mt-4 mb-5">
        <Col xs={12}>
          <SearchBar onSearch={handleSearch} />
        </Col>
      </Row>
      <Row className={styles.statsContainer}>
        <Col md={4} xs={12}>
          <div className={styles.statsHeader}>
            <p>Top User Cities This Month</p>
          </div>
          {topMonthlyCities?.slice(0, 10).map((city, index) => (
            <CityCard city={city} index={index} key={index} />
          ))}
        </Col>
        <Col md={4} xs={12}>
          <div className={styles.statsHeader}>
            <p>Top User Cities All Time</p>
          </div>
          {topCities?.slice(0, 10).map((city, index) => (
            <CityCard city={city} index={index} key={index} />
          ))}
        </Col>
      </Row>

      <CookieConsent />
    </Container>
  );
};

export default HomePage;
