import React, { useEffect, useState, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { useCityData } from "../../utils/CityDataContext";
import CookieConsent from "./components/CookieConsent";
import SearchNavStrip from "./components/SearchNavStrip";
import SearchBar from "./components/SearchBar";
import PlaceholderCard from "./components/PlaceholderCard";
import CityCard from "./components/CityCard";
import client from "../../feathersClient.js";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const { categories, categoriesLoading } = useCityData();
  const [selectedOption, setSelectedOption] = useState("coast");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [currentPage, setCurrentPage] = useState(1);
  const citiesPerPage = 20;
  const paginationRef = useRef(null);

  const handleSelectionChange = (optionId) => {
    setSelectedOption(optionId);
    setCurrentPage(1);
  };

  const getSelectedCities = () => {
    if (isMobile) {
      return categories[selectedOption] || [];
    } else {
      const start = (currentPage - 1) * citiesPerPage;
      const end = start + citiesPerPage;
      return categories[selectedOption]?.slice(start, end) || [];
    }
  };

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

  const getCanonicalUrl = () => {
    return window.location.href;
  };

  const totalPages = Math.ceil(
    (categories[selectedOption]?.length || 0) / citiesPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }, 0);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.homeContainer}>
      <Helmet>
        <title>HomeKnown | Search</title>
        <meta
          name="description"
          content="Welcome to HomeKnown, your go-to platform for discovering amazing cities."
        />
        <link rel="canonical" href={getCanonicalUrl()} />
      </Helmet>
      <div className={styles.banner}>
        <div className={styles.bannerText}>
          <p className={styles.bannerHeader}>Discover Your Perfect Place</p>
          <p className={styles.bannerBodyText}>
            Let us match you to your personalized top cities and towns!
          </p>
        </div>
        <a href="/explore" className={styles.ctaButton}>
          Start Exploring
        </a>
      </div>
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
        {categoriesLoading
          ? Array.from({ length: 12 }).map((_, index) => (
              <Col
                key={`placeholder-${index}`}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={3}
                className="d-flex align-items-stretch"
              >
                <PlaceholderCard index={index} />
              </Col>
            ))
          : getSelectedCities().map((city, index) => (
              <Col
                key={`${selectedOption}-${city.city_id}-${index}`}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={3}
                className="d-flex align-items-stretch"
              >
                <CityCard city={city} index={index} category={selectedOption} />
              </Col>
            ))}
      </Row>
      {totalPages > 1 && (
        <div className={styles.paginationContainer} ref={paginationRef}>
          <button
            className={styles.paginationButton}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className={styles.paginationInfo}>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className={styles.paginationButton}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
      {/* <CookieConsent /> */}
    </div>
  );
};

export default HomePage;
