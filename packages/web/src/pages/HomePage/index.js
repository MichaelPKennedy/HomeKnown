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
      <Row>
        <Col xs={12}>
          <SearchBar onSearch={handleSearch} />
        </Col>
      </Row>
      <Row>
        {/* {searchResults.map((city) => (
          <Col md={4} xs={12} key={city.id}>
            <CityCard city={city} />
          </Col>
        ))} */}
      </Row>
      <CookieConsent />
    </Container>
  );
};

export default HomePage;
