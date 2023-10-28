import React, { useState } from "react";
import Autosuggest from "react-autosuggest";
import styles from "./LivingPreferenceForm.module.css";
import "./Slider.css";
import { useQuery } from "react-query";
import client from "../../../feathersClient.js";
import { useNavigate } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import PreferenceWeight from "./PreferenceWeight.jsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const LivingPreferenceForm = () => {
  const [formData, setFormData] = useState({
    temperature: 70,
    temperaturePreference: "mild",
    climatePreference: "warmer",
    snowPreference: "none",
    rainPreference: "regular",
    importantSeason: "winter",
    job: "",
    partnerJob: "",
    livingPreference: "city",
    settingPreference: "",
    hasChildren: false,
    lowCrimePriority: false,
    publicTransportation: false,
    commuteTime: "",
    proximityAirportHighway: false,
    culturalOfferings: false,
    nightlifeImportance: false,
    landscapeFeatures: [],
    recreationalInterests: [],
    publicServices: [],
    industries: [],
    minSalary: null,
    jobLevel: "",
    wagePriority: 5,
    futureAspiration: "",
    selectedJobs: [],
    housingType: "",
    homeMin: 200000,
    homeMax: 300000,
    rentMin: 1000,
    rentMax: 2000,
  });

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [currentJob, setCurrentJob] = useState({});

  const fetchOccCodes = async (inputQuery) => {
    try {
      const results = await client
        .service("occupation")
        .find({ query: { query: inputQuery } });
      return results;
    } catch (error) {
      console.error("Error fetching occupation codes:", error);
      return [];
    }
  };

  const suggestionSelected = (event, { suggestion }) => {
    if (!formData.selectedJobs.includes(suggestion.occ_title)) {
      setFormData((prevState) => ({
        ...prevState,
        selectedJobs: [...prevState.selectedJobs, suggestion],
      }));
    }
    setSearchTerm("");
  };

  const onSuggestionsFetchRequested = async ({ value }) => {
    const results = await fetchOccCodes(value);
    setSuggestions(results);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await client.service("survey").create({
        data: formData,
      });

      if (response && response.jobResponse) {
        console.log("Response from survey:", response);
        navigate("/results", {
          state: {
            data: response.jobResponse,
            recreation: response.recreationResponse,
            weather: response.weatherResponse,
          },
          fullResponse: response,
        });
      }
    } catch (error) {
      console.error("Failed to submit the survey:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;

    if (Array.isArray(formData[name])) {
      if (checked && !formData[name].includes(value)) {
        setFormData((prevState) => ({
          ...prevState,
          [name]: [...prevState[name], value],
        }));
      } else if (!checked && formData[name].includes(value)) {
        setFormData((prevState) => ({
          ...prevState,
          [name]: prevState[name].filter((item) => item !== value),
        }));
      }
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: checked }));
    }
  };

  // const handleSelectMultipleChange = (e) => {
  //   const options = e.target.options;
  //   const value = [];
  //   for (let i = 0, l = options.length; i < l; i++) {
  //     if (options[i].selected) {
  //       value.push(options[i].value);
  //     }
  //   }
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     recreationalInterests: value,
  //   }));
  // };

  return (
    <DndProvider backend={HTML5Backend} className={styles.centerContainer}>
      <form
        onSubmit={handleSubmit}
        className={`container mt-5 ${styles.centerContainer} ${styles.formContent}`}
      >
        <div className={`form-group ${styles.formGroup}`}>
          <PreferenceWeight />
        </div>
        <div className={`form-group ${styles.formGroup}`}>
          <h4 className="pb-2">Job Industry</h4>
          <label htmlFor="job">
            What's your current profession or job title?
          </label>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            onSuggestionSelected={suggestionSelected}
            getSuggestionValue={(suggestion) => suggestion.occ_title}
            renderSuggestion={(suggestion) => <div>{suggestion.occ_title}</div>}
            inputProps={{
              className: `form-control ${styles.formInput}`,
              id: "job",
              placeholder: "Enter job title...",
              value: searchTerm,
              onChange: (_, { newValue }) => setSearchTerm(newValue),
            }}
          />

          <div className="selected-jobs mt-3">
            {formData.selectedJobs.map((job, index) => (
              <div
                key={index}
                className={`badge badge-primary mr-2 ${styles.selectedJobs}`}
              >
                {job.occ_title}
                <span
                  style={{ cursor: "pointer", marginLeft: "5px" }}
                  onClick={() => {
                    const updatedJobs = formData.selectedJobs.filter(
                      (j) => j !== job
                    );
                    setFormData((prevState) => ({
                      ...prevState,
                      selectedJobs: updatedJobs,
                    }));
                  }}
                >
                  &times;
                </span>
              </div>
            ))}
          </div>

          {/* Minimum Salary Input */}
          <label htmlFor="minSalary">
            What's the minimum salary you'd be willing to accept for a job in a
            new state?
          </label>
          <input
            type="number"
            name="minSalary"
            value={formData.minSalary || ""}
            onChange={handleInputChange}
            className={`form-control ${styles.formInput}`}
            id="minSalary"
            placeholder="Enter minimum acceptable salary"
          />
        </div>
        {/* Housing */}
        {/* Rent or Buy */}
        <div className={`form-group ${styles.formGroup}`}>
          <h4 className="pb-2">Housing</h4>
          <label>Are you looking to buy or rent?</label>
          <div>
            <label>
              <input
                type="radio"
                name="housingType"
                value="buy"
                checked={formData.housingType === "buy"}
                onChange={handleInputChange}
              />
              Buy
            </label>
            <label>
              <input
                type="radio"
                name="housingType"
                value="rent"
                checked={formData.housingType === "rent"}
                onChange={handleInputChange}
              />
              Rent
            </label>
          </div>

          {/* If buying */}
          {formData.housingType === "buy" && (
            <div className={`form-group ${styles.formGroup}`}>
              <label htmlFor="homePriceRange">
                What is the home price range you are looking for?
              </label>
              <Slider
                range
                min={50000}
                max={1000000}
                value={[formData.homeMin, formData.homeMax]}
                onChange={(values) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    homeMin: values[0],
                    homeMax: values[1],
                  }));
                }}
              />
              <div className="mt-2">
                ${formData.homeMin || 50000} - ${formData.homeMax || 1000000}
              </div>
            </div>
          )}

          {/* If renting */}
          {formData.housingType === "rent" && (
            <div className={`form-group ${styles.formGroup}`}>
              <label htmlFor="rentPriceRange">
                What is the rent price range you are looking for?
              </label>
              <Slider
                range
                min={500}
                max={5000}
                value={[formData.rentMin, formData.rentMax]}
                onChange={(values) => {
                  setFormData((prevState) => ({
                    ...prevState,
                    rentMin: values[0],
                    rentMax: values[1],
                  }));
                }}
              />
              <div className="mt-2">
                ${formData.rentMin || 500} - ${formData.rentMax || 5000}
              </div>
            </div>
          )}
        </div>

        <div className={`form-group ${styles.formGroup}`}>
          <h4 className="pb-3">Public Services</h4>
          <p className="mb-3">
            Check the following that you want to factor into the search:
          </p>

          <div className={styles.collapsibleSections}>
            <details>
              <summary>Public Services</summary>
              <div className={styles.formCheck}>
                <input
                  className={styles.formCheckInput}
                  type="checkbox"
                  value="schools"
                  id="schools"
                  name="publicServices"
                  onChange={handleCheckboxChange}
                />
                <label className={styles.formCheckLabel} htmlFor="schools">
                  Proximity to K-12 schools
                </label>
              </div>
              <div className={styles.formCheck}>
                <input
                  className={styles.formCheckInput}
                  type="checkbox"
                  value="hospitals"
                  id="hospitals"
                  name="publicServices"
                  onChange={handleCheckboxChange}
                />
                <label className={styles.formCheckLabel} htmlFor="hospitals">
                  Proximity to Hospitals
                </label>
              </div>
              <div className={styles.formCheck}>
                <input
                  className={styles.formCheckInput}
                  type="checkbox"
                  value="libraries"
                  id="libraries"
                  name="publicServices"
                  onChange={handleCheckboxChange}
                />
                <label className={styles.formCheckLabel} htmlFor="libraries">
                  Proximity to public libraries
                </label>
              </div>
              <div className={styles.formCheck}>
                <input
                  className={styles.formCheckInput}
                  type="checkbox"
                  value="emergencyServices"
                  id="emergencyServices"
                  name="publicServices"
                  onChange={handleCheckboxChange}
                />
                <label
                  className={styles.formCheckLabel}
                  htmlFor="emergencyServices"
                >
                  Number of fire departments and police stations
                </label>
              </div>
              <div className={styles.formCheck}>
                <input
                  className={styles.formCheckInput}
                  type="checkbox"
                  value="airports"
                  id="airports"
                  name="publicServices"
                  onChange={handleCheckboxChange}
                />
                <label className={styles.formCheckLabel} htmlFor="airports">
                  Proximity to Airports
                </label>
              </div>
              <div className={styles.formCheck}>
                <input
                  className={styles.formCheckInput}
                  type="checkbox"
                  value="transitStations"
                  id="transitStations"
                  name="publicServices"
                  onChange={handleCheckboxChange}
                />
                <label
                  className={styles.formCheckLabel}
                  htmlFor="transitStations"
                >
                  Proximity to Train stations and bus terminals
                </label>
              </div>
              <div className={styles.formCheck}>
                <input
                  className={styles.formCheckInput}
                  type="checkbox"
                  value="marineTerminals"
                  id="marineTerminals"
                  name="publicServices"
                  onChange={handleCheckboxChange}
                />
                <label
                  className={styles.formCheckLabel}
                  htmlFor="marineTerminals"
                >
                  Proximity to Marine Terminals
                </label>
              </div>
              <div className={styles.formCheck}>
                <input
                  className={styles.formCheckInput}
                  type="checkbox"
                  value="localParks"
                  id="localParks"
                  name="publicServices"
                  onChange={handleCheckboxChange}
                />
                <label className={styles.formCheckLabel} htmlFor="localParks">
                  Local Parks and Recreation Areas
                </label>
              </div>
              <div className={styles.formCheck}>
                <input
                  className={styles.formCheckInput}
                  type="checkbox"
                  value="placesOfWorship"
                  id="placesOfWorship"
                  name="publicServices"
                  onChange={handleCheckboxChange}
                />
                <label
                  className={styles.formCheckLabel}
                  htmlFor="placesOfWorship"
                >
                  Proximity to churches, places of worship
                </label>
              </div>
            </details>
          </div>
        </div>

        {/* Weather */}
        <div className={`form-group ${styles.slider}`}>
          <h4 className="pb-2 pt-2">Weather</h4>
          <label htmlFor="temperature">Ideal average temperature (°F):</label>

          <Slider
            min={0}
            max={120}
            step={1}
            value={formData.temperature}
            onChange={(value) =>
              setFormData((prevState) => ({ ...prevState, temperature: value }))
            }
          />

          <small className="form-text text-muted">
            {formData.temperature}°F
          </small>

          {/* Weather Preference: Temperature */}
          <div className={`form-group ${styles.formGroup}`}>
            <label>
              Do you prefer cities with mild temperatures throughout the year or
              those that experience distinct seasons?
            </label>
            <div className={styles.formCheck}>
              <input
                className={styles.formCheckInput}
                type="radio"
                name="temperaturePreference"
                value="mild"
                onChange={handleInputChange}
                checked={formData.temperaturePreference === "mild"}
              />
              <label className={styles.formCheckLabel}>
                Mild temperatures throughout the year
              </label>
            </div>
            <div>
              <input
                className={styles.formCheckInput}
                type="radio"
                name="temperaturePreference"
                value="distinct"
                onChange={handleInputChange}
                checked={formData.temperaturePreference === "distinct"}
              />
              <label className={styles.formCheckLabel}>Distinct seasons</label>
            </div>
          </div>

          {/* Weather Preference: Climate */}
          <div className={`form-group ${styles.formGroup}`}>
            <label>
              Are you more comfortable with warmer climates or cooler climates?
            </label>
            <div className={styles.formCheck}>
              <input
                className={styles.formCheckInput}
                type="radio"
                name="climatePreference"
                value="warmer"
                onChange={handleInputChange}
                checked={formData.climatePreference === "warmer"}
              />
              <label className={styles.formCheckLabel}>Warmer climates</label>
            </div>
            <div className={styles.formCheck}>
              <input
                className={styles.formCheckInput}
                type="radio"
                name="climatePreference"
                value="cooler"
                onChange={handleInputChange}
                checked={formData.climatePreference === "cooler"}
              />
              <label className={styles.formCheckLabel}>Cooler climates</label>
            </div>
          </div>

          {/* Snow Preference */}
          <div className={`form-group ${styles.formGroup}`}>
            <label>
              Would you be okay living in an area that receives snow? If so,
              would you be okay with heavy snowfall or just light, occasional
              snow?
            </label>
            <div className={styles.formCheck}>
              <input
                className={styles.formCheckInput}
                type="radio"
                name="snowPreference"
                value="none"
                onChange={handleInputChange}
                checked={formData.snowPreference === "none"}
              />
              <label className={styles.formCheckLabel}>No snow</label>
            </div>
            <div className={styles.formCheck}>
              <input
                className={styles.formCheckInput}
                type="radio"
                name="snowPreference"
                value="light"
                onChange={handleInputChange}
                checked={formData.snowPreference === "light"}
              />
              <label className={styles.formCheckLabel}>
                Light, occasional snow
              </label>
            </div>
            <div className={styles.formCheck}>
              <input
                className={styles.formCheckInput}
                type="radio"
                name="snowPreference"
                value="heavy"
                onChange={handleInputChange}
                checked={formData.snowPreference === "heavy"}
              />
              <label className={styles.formCheckLabel}>Heavy snowfall</label>
            </div>
          </div>

          {/* Rain Preference */}
          <div className={`form-group ${styles.formGroup}`}>
            <label>
              Would you like to live in a city that tends to be dryer throughout
              the year, or are you comfortable with regular rainfall?
            </label>
            <div className={styles.formCheck}>
              <input
                className={styles.formCheckInput}
                type="radio"
                name="rainPreference"
                value="dry"
                onChange={handleInputChange}
                checked={formData.rainPreference === "dry"}
              />
              <label className={styles.formCheckLabel}>Generally dry</label>
            </div>
            <div className={styles.formCheck}>
              <input
                className={styles.formCheckInput}
                type="radio"
                name="rainPreference"
                value="regular"
                onChange={handleInputChange}
                checked={formData.rainPreference === "regular"}
              />
              <label className={styles.formCheckLabel}>
                Comfortable with regular rainfall
              </label>
            </div>
          </div>
        </div>
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
                />
                <label
                  className={styles.formCheckLabel}
                  htmlFor="nationalParks"
                >
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
                />
                <label
                  className={styles.formCheckLabel}
                  htmlFor="waterfrontViews"
                >
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
                />
                <label
                  className={styles.formCheckLabel}
                  htmlFor="historicSites"
                >
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
                />
                <label
                  className={styles.formCheckLabel}
                  htmlFor="naturalWonders"
                >
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
                />
                <label
                  className={styles.formCheckLabel}
                  htmlFor="amusementParks"
                >
                  Visiting Amusement Parks and Entertainment Centers
                </label>
              </div>
            </details>
          </div>
        </div>

        {/* <div className={`form-group ${styles.formGroup}`}>
        <label>Living Preference:</label>
        <div className={styles.formCheck}>
          <input
            type="radio"
            name="livingPreference"
            value="city"
            checked={formData.livingPreference === "city"}
            onChange={handleInputChange}
            className={styles.formCheckInput}
            id="cityPreference"
          />
          <label className={styles.formCheckLabel} htmlFor="cityPreference">
            City
          </label>
        </div>
        <div className={styles.formCheck}>
          <input
            type="radio"
            name="livingPreference"
            value="suburb"
            checked={formData.livingPreference === "suburb"}
            onChange={handleInputChange}
            className={styles.formCheckInput}
            id="suburbPreference"
          />
          <label className={styles.formCheckLabel} htmlFor="suburbPreference">
            Suburb
          </label>
        </div>
        <div className={styles.formCheck}>
          <input
            type="radio"
            name="livingPreference"
            value="rural"
            checked={formData.livingPreference === "rural"}
            onChange={handleInputChange}
            className={styles.formCheckInput}
            id="ruralPreference"
          />
          <label className={styles.formCheckLabel} htmlFor="ruralPreference">
            Rural
          </label>
        </div>
      </div> */}

        <button
          type="submit"
          className={`btn btn-info mt-2 ${styles.btnDropdown}`}
        >
          Submit
        </button>
      </form>
    </DndProvider>
  );
};

export default LivingPreferenceForm;
