import React, { useState, useEffect } from "react";
import client from "../../feathersClient.js";

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
      const response = await client.service("places").find({
        query: {
          query: searchTerm,
        },
      });
      setPlaces(response?.results);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Places</h1>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a place..."
        />
        <button onClick={fetchPlaces}>Search</button>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <ul>
        {places.map((place) => (
          <li key={place.place_id}>
            <h2>{place.name}</h2>
            {place.photos && place.photos.length > 0 && (
              <img
                src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${place.photos[0].photo_reference}&key=${GOOGLE_API_KEY}`}
                alt={place.name}
              />
            )}
          </li>
        ))}
      </ul>
      <div id="map" style={{ width: "800px", height: "400px" }}></div>
    </div>
  );
}

export default PlacesComponent;
