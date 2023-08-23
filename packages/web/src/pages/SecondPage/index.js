import React, { useState } from "react";
import client from "../../feathersClient.js";

function PlacesComponent() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchPlaces = async () => {
    try {
      setLoading(true);
      const response = await client.service("places").find({
        query: {
          // Your query criteria here, for instance:
          name: searchTerm,
        },
      });
      setPlaces(response.data);
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
          <li key={place.id}>{place.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default PlacesComponent;
