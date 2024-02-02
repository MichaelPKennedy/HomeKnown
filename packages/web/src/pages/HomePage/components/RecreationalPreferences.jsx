import React from "react";
import styles from "./LivingPreferenceForm.module.css";

const RecreationalPreferences = ({ formData, handleCheckboxChange }) => {
  const recreationalCategories = {
    "Nature and Scenery": [
      "beaches",
      "lakes",
      "mountains",
      "waterfalls",
      "forests",
      "nationalParks",
      "parks",
    ],
    "Adventure and Sports": [
      "hikingTrails",
      "caves",
      "skiResorts",
      "rockClimbing",
      "crossCountrySkiAreas",
      "climbingCentres",
      "tennisCentres",
      "sportsCentres",
      "swimmingFacilities",
      "golfCourses",
      "hotAirBalloonRides",
      "bicycleTrails",
    ],
    "Culture and History": [
      "monuments",
      "archaeologicalSites",
      "museums",
      "artGalleries",
      "historicSites",
    ],
    "Wildlife and Nature": ["zoos", "wildlifeReserves", "botanicalGardens"],
    "Relaxation and Wellness": [
      "spasAndWellnessCenters",
      "yogaStudios",
      "fitnessGyms",
      "danceStudios",
    ],
    "Entertainment and Leisure": [
      "restaurants",
      "bars",
      "musicVenues",
      "farmersMarkets",
      "shoppingCenters",
      "amusementParks",
      "nightclubs",
    ],
    "Astronomy and Exploration": ["telescopeObservatories", "planetariums"],
    "Water Activities": ["rivers", "swimmingPoolFacilities"],
  };

  return (
    <div className={`form-group ${styles.formGroup}`}>
      <h4 className="pb-3">Recreational Interests</h4>
      <p className="mb-3">
        Please select the recreational activities you are interested in.
      </p>

      <div className={styles.collapsibleSections}>
        {Object.entries(recreationalCategories).map(([category, interests]) => (
          <details key={category}>
            <summary>{category}</summary>
            {interests.map((interest) => (
              <div className={styles.formCheck} key={interest}>
                <input
                  className={styles.formCheckInput}
                  type="checkbox"
                  value={interest}
                  id={interest}
                  name="recreationalInterests"
                  onChange={handleCheckboxChange}
                  checked={formData.recreationalInterests.includes(interest)}
                />
                <label className={styles.formCheckLabel} htmlFor={interest}>
                  {interest.charAt(0).toUpperCase() +
                    interest.slice(1).replaceAll(/([A-Z])/g, " $1")}
                </label>
              </div>
            ))}
          </details>
        ))}
      </div>
    </div>
  );
};

export default RecreationalPreferences;
