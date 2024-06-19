import React, { useState, useEffect } from "react";
import { Form, InputGroup, Button, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import debounce from "lodash/debounce";
import styles from "../HomePage.module.css";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const debouncedSearch = debounce(async (query) => {
    if (query.length === 0) {
      setResults([]);
      setShowResults(false);
      return;
    }

    try {
      const searchResults = await onSearch(query);
      setResults(searchResults);
      setShowResults(true);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
      setShowResults(false);
    }
  }, 300);

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm]);

  const handleCloseResults = () => {
    setTimeout(() => {
      setShowResults(false);
    }, 200);
  };

  const toUrlFriendly = (str) => str?.toLowerCase()?.replace(/\s+/g, "_");

  return (
    <>
      <Form onSubmit={(e) => e.preventDefault()}>
        <InputGroup>
          <Form.Control
            placeholder="Search places you are interested in"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onBlur={handleCloseResults}
            onFocus={() => searchTerm.length > 0 && setShowResults(true)}
            className={styles.ellipsisText}
          />
          <Button
            variant="outline-secondary"
            type="submit"
            className={`${styles.button} ml-1`}
          >
            Search
          </Button>
        </InputGroup>
      </Form>
      {showResults && results && (
        <ListGroup
          className="search-results-dropdown"
          style={{ maxHeight: "300px", overflowY: "auto" }}
        >
          {results.map((city) => (
            <Link
              to={`/results/${toUrlFriendly(city.state_name)}/${toUrlFriendly(
                city.city_name
              )}`}
              key={city.city_id}
              state={{ fromPage: "search", city, fromSurvey: false }}
            >
              <ListGroup.Item action>
                <div className={styles.ellipsisText}>
                  {city.city_name}, {city.state_name}
                </div>
              </ListGroup.Item>
            </Link>
          ))}
        </ListGroup>
      )}
    </>
  );
};

export default SearchBar;
