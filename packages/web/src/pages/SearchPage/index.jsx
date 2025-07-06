import React, { useState, useEffect } from "react";
import client from "../../feathersClient.js";
import styles from "./SearchPage.module.css";

function PlacesComponent() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

  const initMap = () => {
    const location = {
      lat: places[0]?.geometry?.location?.lat,
      lng: places[0]?.geometry?.location?.lng,
    };
    const map = new google.maps.Map(document.getElementById("map"), {
      center: location,
      zoom: 8,
    });
    const marker = new google.maps.Marker({
      position: location,
      map: map,
    });
  };

  useEffect(() => {
    if (places.length > 0) {
      initMap();
    }
  }, [places]);

  const fetchPlaces = async () => {
    try {
      setLoading(true);
      // const storedPlaces = localStorage.getItem("places");
      const storedPlaces = null;
      if (storedPlaces) {
        setPlaces(JSON.parse(storedPlaces));
        setLoading(false);
        return;
      }

      const response = await client.service("places").find({
        query: {
          query: searchTerm,
        },
      });
      setPlaces(response?.results);

      localStorage.setItem("places", JSON.stringify(response?.results));

      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className={`d-flex justify-content-center mb-4 ${styles.searchbar}`}>
        <input
          type="text"
          className="form-control mr-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a place..."
          style={{ flex: "1" }}
        />
        <button className="btn btn-primary" onClick={fetchPlaces}>
          Search
        </button>
      </div>

      {loading && <div className="mt-3 text-center">Loading...</div>}
      {error && (
        <div className="mt-3 alert alert-danger text-center">
          Error: {error}
        </div>
      )}

      <ul className="mt-3">
        {places.map((place) => (
          <li key={place.place_id}>
            <div className={`card mb-4 ${styles.card}`}>
              <div className={`card-body ${styles.cardBody}`}>
                <h4 className={`text-center ${styles.name}`}>{place.name}</h4>
                {place.photos && place.photos.length > 0 && (
                  <img
                    src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photoreference=${place.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`}
                    alt={place.name}
                    className={`img-fluid mt-3 mb-4 ${styles.placeImage}`}
                  />
                )}
                <div className="d-flex justify-content-center mt-3">
                  <div id="map" className={`pt-4 ${styles.map}`}></div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlacesComponent;
