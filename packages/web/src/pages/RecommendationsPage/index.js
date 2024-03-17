import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { useCityData } from "../../utils/CityDataContext";
import CityCard from "./components/CityCard";
import styles from "./RecommendationsPage.module.css";

const RecommendationsPage = () => {
  const { userRecommendations } = useCityData();

  useEffect(() => {
    console.log("userRecommendations", userRecommendations);
  }, [userRecommendations]);
  return (
    <div className={styles.pageContainer}>
      <div className={styles.recommendationsHeader}>
        <p>Cities we think you will like</p>
      </div>
      <Row className={styles.recommendationsContainer}>
        {userRecommendations?.slice(0, 50).map((city, index) => (
          <Col
            key={`monthly-${city.cityId}-${index}`}
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
    </div>
  );
};

export default RecommendationsPage;
