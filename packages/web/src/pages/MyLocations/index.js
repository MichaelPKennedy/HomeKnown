import React, { useEffect, useState, useContext } from "react";
import client from "../../feathersClient";
import styles from "../ResultsPage/ResultsPage.module.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext";

const MyLocations = () => {
  const { isLoggedIn, user } = useContext(AuthContext);
  const [cityData, setCityData] = useState([]);

  const fetchCityData = async () => {
    try {
      const response = await client
        .service("survey")
        .find({ query: { user_id: user.user_id } });
      console.log("cities response find method", response);
      setCityData(response);
    } catch (error) {
      console.error("Error fetching saved cities:", error);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    fetchCityData();
  }, [user]);

  return (
    <div className={styles.resultsPageContainer}>
      <div className={styles.resultsContainer}>
        <h1 className={styles.resultsHeader}>My Locations</h1>
        <div className={styles.resultsList}>
          {cityData.map((city) => (
            <div key={city.city_id} className={styles.cityContainer}>
              <Link
                to={`/city/${city.city_id}`}
                key={city.city_id}
                state={{ city }}
              >
                <div className={styles.cityName}>{city.city_name}</div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default MyLocations;
