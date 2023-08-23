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
      const storedPlaces = localStorage.getItem("places");
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
    <div className="container">
      <div className={`row justify-content-beginning mt-4 ${styles.searchbar}`}>
        <div className="col">
          <input
            type="text"
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a place..."
          />
        </div>
        <div className="col-auto">
          <button className="btn btn-primary" onClick={fetchPlaces}>
            Search
          </button>
        </div>
      </div>
      {loading && <div className="mt-3">Loading...</div>}
      {error && <div className="mt-3 alert alert-danger">Error: {error}</div>}
      <ul className="mt-3">
        {places.map((place) => (
          <ul key={place.place_id}>
            <div className="row mb-4 justify-content-center">
              <h2>{place.name}</h2>
            </div>
            <div
              className={`row mb-4 justify-content-center ${styles.placeImage}`}
            >
              {place.photos && place.photos.length > 0 && (
                <img
                  src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=500&photoreference=${place.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`}
                  alt={place.name}
                  className="img-fluid"
                />
              )}
            </div>
          </ul>
        ))}
      </ul>
      <div
        id="map"
        className="mt-3"
        style={{ width: "100%", height: "400px", margin: "auto" }}
      ></div>
    </div>
  );
}

export default PlacesComponent;
