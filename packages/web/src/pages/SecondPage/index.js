import React, { useState, useEffect } from "react";

import client from "../../feathersClient.js";

function PlacesComponent() {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await client.service("places").find();
        setPlaces(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Places</h1>
      <ul>
        {places.map((place) => (
          <li key={place.id}>{place.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default PlacesComponent;
