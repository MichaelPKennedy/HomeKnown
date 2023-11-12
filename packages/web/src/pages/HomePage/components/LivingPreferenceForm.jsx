import React, { useState, useEffect, useRef } from "react";
import styles from "./LivingPreferenceForm.module.css";
import "./Slider.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import client from "../../../feathersClient.js";
import { useNavigate } from "react-router-dom";
import PreferenceWeight from "./PreferenceWeight.jsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import LoadingScreen from "./LoadingScreen.jsx";
import JobPreferences from "./JobPreferences.jsx";
import HousingPreferences from "./HousingPreferences.jsx";
import PublicServicePreferences from "./PublicServicePreferences.jsx";
import SceneryPreferences from "./SceneryPreferences.jsx";
import WeatherPreferences from "./WeatherPreferences.jsx";
import RecreationalPreferences from "./RecreationalPreferences.jsx";
import PopulationPreferences from "./PopulationPreferences";
import ResultsPage from "../../ResultsPage";

const initialFormData = {
  snowPreference: "none",
  rainPreference: "regular",
  livingPreference: "city",
  recreationalInterests: [],
  publicServices: [],
  scenery: [],
  searchRadius: 10,
  minSalary: null,
  jobLevel: "",
  selectedJobs: [],
  housingType: "",
  homeMin: 200000,
  homeMax: 300000,
  rentMin: 1000,
  rentMax: 2000,
  temperatureData: [
    { month: "Jan", temp: 30 },
    { month: "Feb", temp: 35 },
    { month: "Mar", temp: 45 },
    { month: "Apr", temp: 55 },
    { month: "May", temp: 65 },
    { month: "Jun", temp: 75 },
    { month: "Jul", temp: 85 },
    { month: "Aug", temp: 85 },
    { month: "Sep", temp: 75 },
    { month: "Oct", temp: 65 },
    { month: "Nov", temp: 50 },
    { month: "Dec", temp: 35 },
  ],
  weights: {
    costOfLivingWeight: 0,
    recreationalActivitiesWeight: 0,
    weatherWeight: 0,
    jobOpportunityWeight: 0,
    publicServicesWeight: 0,
    crimeRateWeight: 0,
    sceneryWeight: 0,
    airQualityWeight: 0,
    totalAvailablePoints: 10,
  },
};

const LivingPreferenceForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const resultsRef = useRef(null);

  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [surveyResults, setSurveyResults] = useState(null);
  const [showForm, setShowForm] = useState(true);

  const resetSurvey = () => {
    setFormData(initialFormData);
    setSurveyResults(null);
    setShowForm(true);
    sessionStorage.removeItem("surveyResults");
    sessionStorage.removeItem("formData");
  };

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
    setLoading(true);
    try {
      const response = await client
        .service("survey")
        .create({ data: formData });
      if (response) {
        console.log("Response from survey:", response);
        setLoading(false);
        setSurveyResults(response);
        setShowForm(false);
        // Save the results and form state to sessionStorage
        sessionStorage.setItem("surveyResults", JSON.stringify(response));
        sessionStorage.setItem("formData", JSON.stringify(formData));
      }
    } catch (error) {
      console.error("Failed to submit the survey:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if there's saved state in sessionStorage
    const savedResults = sessionStorage.getItem("surveyResults");
    const savedFormData = sessionStorage.getItem("formData");

    if (savedResults && savedFormData) {
      setSurveyResults(JSON.parse(savedResults));
      setFormData(JSON.parse(savedFormData));
      setShowForm(false); // Hide form if there are saved results
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    if (loading) {
      resultsRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading]);

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

  const handleTemperatureChange = (updatedData) => {
    setFormData((prevState) => ({
      ...prevState,
      temperatureData: updatedData,
    }));
  };

  const hasColdMonth = () => {
    return formData.temperatureData.some((month) => month.temp <= 35);
  };

  const updateFormDataWithWeights = (newWeights) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      weights: newWeights,
    }));
  };

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    const hasNonZeroWeight = !Object.values(formData.weights)
      .filter((weight) => weight !== formData.weights.totalAvailablePoints)
      .every((weight) => weight === 0);

    setShowSubmitButton(hasNonZeroWeight);
  }, [formData]);

  return (
    <DndProvider backend={HTML5Backend} className={styles.centerContainer}>
      <div>
        {showForm ? (
          <div>
            <form
              onSubmit={handleSubmit}
              className={`container mt-5 ${styles.centerContainer} ${styles.formContent}`}
            >
              {surveyResults && (
                <button
                  type="button"
                  onClick={toggleFormVisibility}
                  className={`btn btn-secondary mt-2 ${styles.btnDropdown}`}
                >
                  Cancel
                </button>
              )}
              <div className={`form-group ${styles.formGroup}`}>
                <PreferenceWeight
                  onWeightsChange={updateFormDataWithWeights}
                  weights={formData.weights}
                />
              </div>
              {formData.weights.jobOpportunityWeight > 0 && (
                <JobPreferences
                  formData={formData}
                  setFormData={setFormData}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  suggestions={suggestions}
                  onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                  onSuggestionsClearRequested={onSuggestionsClearRequested}
                  suggestionSelected={suggestionSelected}
                />
              )}
              {/* Housing */}
              {formData.weights.costOfLivingWeight > 0 && (
                <HousingPreferences
                  formData={formData}
                  setFormData={setFormData}
                />
              )}

              {(formData.weights.sceneryWeight > 0 ||
                formData.weights.recreationalActivitiesWeight > 0 ||
                formData.weights.publicServicesWeight > 0) && (
                <div className={`form-group ${styles.slider}`}>
                  <label htmlFor="searchRadius">
                    Select Search Radius (miles)
                  </label>
                  <Slider
                    min={10}
                    max={50}
                    step={5}
                    value={formData.searchRadius}
                    onChange={(value) => {
                      setFormData((prevState) => ({
                        ...prevState,
                        searchRadius: value,
                      }));
                    }}
                  />
                  <div className="mt-2">
                    {formData.searchRadius || 10} miles
                  </div>
                </div>
              )}

              {formData.weights.publicServicesWeight > 0 && (
                <PublicServicePreferences
                  formData={formData}
                  handleCheckboxChange={handleCheckboxChange}
                />
              )}
              {formData.weights.sceneryWeight > 0 && (
                <SceneryPreferences
                  formData={formData}
                  handleCheckboxChange={handleCheckboxChange}
                />
              )}

              {/* Weather */}
              {formData.weights.weatherWeight > 0 && (
                <WeatherPreferences
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleTemperatureChange={handleTemperatureChange}
                  hasColdMonth={hasColdMonth}
                />
              )}

              {formData.weights.recreationalActivitiesWeight > 0 && (
                <RecreationalPreferences
                  formData={formData}
                  handleCheckboxChange={handleCheckboxChange}
                />
              )}
              {/* <PopulationPreferences
                formData={formData}
                handleInputChange={handleInputChange}
              /> */}
              {showSubmitButton && (
                <div className="d-flex justify-content-start gap-2">
                  <button
                    type="submit"
                    className={`btn btn-info mt-2 ${styles.btnDropdown}`}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={resetSurvey}
                    className={`btn btn-warning mt-2 ${styles.btnDropdown}`}
                  >
                    Clear Survey
                  </button>
                </div>
              )}
            </form>
            <div ref={resultsRef}>
              {!loading && surveyResults ? (
                <ResultsPage data={surveyResults} />
              ) : loading ? (
                <LoadingScreen />
              ) : null}
            </div>
          </div>
        ) : (
          <div>
            <ResultsPage
              data={surveyResults}
              toggleFormVisibility={toggleFormVisibility}
              showEditButton={!showForm}
            />
          </div>
        )}
      </div>
    </DndProvider>
  );
};

export default LivingPreferenceForm;
