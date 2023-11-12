import React from "react";
import styles from "./LivingPreferenceForm.module.css";

const RecreationalPreferences = ({ formData, handleCheckboxChange }) => {
  return (
    <div className={`form-group ${styles.formGroup}`}>
      <h4 className="pb-3">Recreational Interests</h4>
      <p className="mb-3">
        Please select the recreational activities you are interested in.
      </p>

      <div className={styles.collapsibleSections}>
        <details>
          <summary>Nature and Scenery</summary>
          <div className={styles.formCheck}>
            <input
              className={styles.formCheckInput}
              type="checkbox"
              value="mountains"
              id="mountains"
              name="recreationalInterests"
              onChange={handleCheckboxChange}
              checked={formData.recreationalInterests.includes("mountains")}
            />
            <label className={styles.formCheckLabel} htmlFor="mountains">
              Hiking and Trekking in Mountains
            </label>
          </div>
          <div className={styles.formCheck}>
            <input
              className={styles.formCheckInput}
              type="checkbox"
              value="nationalParks"
              id="nationalParks"
              name="recreationalInterests"
              onChange={handleCheckboxChange}
              checked={formData.recreationalInterests.includes("nationalParks")}
            />
            <label className={styles.formCheckLabel} htmlFor="nationalParks">
              Exploring National Parks and Reserves
            </label>
          </div>
          <div className={styles.formCheck}>
            <input
              className={styles.formCheckInput}
              type="checkbox"
              value="forests"
              id="forests"
              name="recreationalInterests"
              onChange={handleCheckboxChange}
              checked={formData.recreationalInterests.includes("forests")}
            />
            <label className={styles.formCheckLabel} htmlFor="forests">
              Forests
            </label>
          </div>
          <div className={styles.formCheck}>
            <input
              className={styles.formCheckInput}
              type="checkbox"
              value="waterfrontViews"
              id="waterfrontViews"
              name="recreationalInterests"
              onChange={handleCheckboxChange}
              checked={formData.recreationalInterests.includes(
                "waterfrontViews"
              )}
            />
            <label className={styles.formCheckLabel} htmlFor="waterfrontViews">
              Scenic Waterfront Views
            </label>
          </div>
          <div className={styles.formCheck}>
            <input
              className={styles.formCheckInput}
              type="checkbox"
              value="scenicDrives"
              id="scenicDrives"
              name="recreationalInterests"
              onChange={handleCheckboxChange}
              checked={formData.recreationalInterests.includes("scenicDrives")}
            />
            <label className={styles.formCheckLabel} htmlFor="scenicDrives">
              Scenic Drives
            </label>
          </div>
        </details>

        <details>
          <summary>History and Culture</summary>
          <div className={styles.formCheck}>
            <input
              className={styles.formCheckInput}
              type="checkbox"
              value="historicSites"
              id="historicSites"
              name="recreationalInterests"
              onChange={handleCheckboxChange}
              checked={formData.recreationalInterests.includes("historicSites")}
            />
            <label className={styles.formCheckLabel} htmlFor="historicSites">
              Visiting Historic Sites and Landmarks
            </label>
          </div>
          <div className={styles.formCheck}>
            <input
              className={styles.formCheckInput}
              type="checkbox"
              value="monuments"
              id="monuments"
              name="recreationalInterests"
              onChange={handleCheckboxChange}
              checked={formData.recreationalInterests.includes("monuments")}
            />
            <label className={styles.formCheckLabel} htmlFor="monuments">
              Exploring National Monuments and Memorials
            </label>
          </div>
          <div className={styles.formCheck}>
            <input
              className={styles.formCheckInput}
              type="checkbox"
              value="museums"
              id="museums"
              name="recreationalInterests"
              onChange={handleCheckboxChange}
              checked={formData.recreationalInterests.includes("museums")}
            />
            <label className={styles.formCheckLabel} htmlFor="museums">
              Museums
            </label>
          </div>
        </details>
        <details>
          <summary>Adventure and Exploration</summary>
          <div className={styles.formCheck}>
            <input
              className={styles.formCheckInput}
              type="checkbox"
              value="naturalWonders"
              id="naturalWonders"
              name="recreationalInterests"
              onChange={handleCheckboxChange}
              checked={formData.recreationalInterests.includes(
                "naturalWonders"
              )}
            />
            <label className={styles.formCheckLabel} htmlFor="naturalWonders">
              Exploring Natural Wonders (Caves, Waterfalls)
            </label>
          </div>
          <div className={styles.formCheck}>
            <input
              className={styles.formCheckInput}
              type="checkbox"
              value="rockClimbing"
              id="rockClimbing"
              name="recreationalInterests"
              onChange={handleCheckboxChange}
              checked={formData.recreationalInterests.includes("rockClimbing")}
            />
            <label className={styles.formCheckLabel} htmlFor="rockClimbing">
              Rock Climbing and Adventurous Activities
            </label>
          </div>
        </details>

        <details>
          <summary>Water Activities</summary>
          <div className={styles.formCheck}>
            <input
              className={styles.formCheckInput}
              type="checkbox"
              value="waterSports"
              id="waterSports"
              name="recreationalInterests"
              onChange={handleCheckboxChange}
              checked={formData.recreationalInterests.includes("waterSports")}
            />
            <label className={styles.formCheckLabel} htmlFor="waterSports">
              Boating, Fishing, Swimming
            </label>
          </div>
          <div className={styles.formCheck}>
            <input
              className={styles.formCheckInput}
              type="checkbox"
              value="beach"
              id="beach"
              name="recreationalInterests"
              onChange={handleCheckboxChange}
              checked={formData.recreationalInterests.includes("beach")}
            />
            <label className={styles.formCheckLabel} htmlFor="beach">
              Living Near a Beach
            </label>
          </div>
        </details>

        <details>
          <summary>Wildlife and Flora</summary>
          <div className={styles.formCheck}>
            <input
              className={styles.formCheckInput}
              type="checkbox"
              value="diverseFloraFauna"
              id="diverseFloraFauna"
              name="recreationalInterests"
              onChange={handleCheckboxChange}
              checked={formData.recreationalInterests.includes(
                "diverseFloraFauna"
              )}
            />
            <label
              className={styles.formCheckLabel}
              htmlFor="diverseFloraFauna"
            >
              Visiting Places with Diverse Flora and Fauna
            </label>
          </div>
          <div className={styles.formCheck}>
            <input
              className={styles.formCheckInput}
              type="checkbox"
              value="birdWatching"
              id="birdWatching"
              name="recreationalInterests"
              onChange={handleCheckboxChange}
              checked={formData.recreationalInterests.includes("birdWatching")}
            />
            <label className={styles.formCheckLabel} htmlFor="birdWatching">
              Bird Watching and Wildlife Activities
            </label>
          </div>
          <div className={styles.formCheck}>
            <input
              className={styles.formCheckInput}
              type="checkbox"
              value="zoos"
              id="zoos"
              name="recreationalInterests"
              onChange={handleCheckboxChange}
              checked={formData.recreationalInterests.includes("zoos")}
            />
            <label className={styles.formCheckLabel} htmlFor="zoos">
              Zoos and Wildlife Reserves
            </label>
          </div>
        </details>

        <details>
          <summary>Winter Sports</summary>
          <div className={styles.formCheck}>
            <input
              className={styles.formCheckInput}
              type="checkbox"
              value="winterSports"
              id="winterSports"
              name="recreationalInterests"
              onChange={handleCheckboxChange}
              checked={formData.recreationalInterests.includes("winterSports")}
            />
            <label className={styles.formCheckLabel} htmlFor="winterSports">
              Skiing and Snowboarding
            </label>
          </div>
        </details>

        <details>
          <summary>Astronomy</summary>
          <div className={styles.formCheck}>
            <input
              className={styles.formCheckInput}
              type="checkbox"
              value="stargazing"
              id="stargazing"
              name="recreationalInterests"
              onChange={handleCheckboxChange}
              checked={formData.recreationalInterests.includes("stargazing")}
            />
            <label className={styles.formCheckLabel} htmlFor="stargazing">
              Stargazing and Observing Celestial Objects
            </label>
          </div>
        </details>

        <details>
          <summary>Entertainment</summary>
          <div className={styles.formCheck}>
            <input
              className={styles.formCheckInput}
              type="checkbox"
              value="amusementParks"
              id="amusementParks"
              name="recreationalInterests"
              onChange={handleCheckboxChange}
              checked={formData.recreationalInterests.includes(
                "amusementParks"
              )}
            />
            <label className={styles.formCheckLabel} htmlFor="amusementParks">
              Visiting Amusement Parks and Entertainment Centers
            </label>
          </div>
        </details>
      </div>
    </div>
  );
};

export default RecreationalPreferences;
