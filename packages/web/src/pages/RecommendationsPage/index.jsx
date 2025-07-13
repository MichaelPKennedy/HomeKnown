import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { Row, Col } from "react-bootstrap";
import { toast } from "react-toastify";
import { useCityData } from "../../utils/CityDataContext";
import { AuthContext } from "../../AuthContext";
import CityCard from "./components/CityCard";
import PleaseLogin from "./components/PleaseLogin";
import styles from "./RecommendationsPage.module.css";

const RecommendationsPage = () => {
  const { userRecommendations, userRecommendationsLoading } = useCityData();
  const { isLoggedIn } = useContext(AuthContext);

  const getCanonicalUrl = () => {
    const url = new URL(window.location.href);
    url.search = "";
    url.hash = "";
    return url.toString();
  };

  return isLoggedIn ? (
    <>
      <Helmet>
        <title>HomeKnown | Recommendations</title>
        <meta
          name="description"
          content="Welcome to HomeKnown, your go-to platform for discovering amazing cities."
        />
        <link rel="canonical" href={getCanonicalUrl()} />
      </Helmet>
      {userRecommendationsLoading ? (
        <div className="ml-5 mt-5">Loading recommendations...</div>
      ) : userRecommendations?.standard?.length > 0 ? (
        <div className={styles.pageContainer}>
          <div className={styles.recommendationsHeader}>
            <p className="mb-2">Your AI Recommendations...</p>
          </div>
          <Row className={styles.recommendationsContainer}>
            {userRecommendations.standard.slice(0, 50).map((city, index) => (
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
      ) : (
        <div className="ml-5 mt-5">
          {" "}
          Start interacting with the app to get AI recommendations!{" "}
        </div>
      )}
    </>
  ) : (
    <PleaseLogin />
  );
};

export default RecommendationsPage;
