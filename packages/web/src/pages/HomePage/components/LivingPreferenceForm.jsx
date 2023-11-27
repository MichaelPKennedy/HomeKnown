import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import styles from "./LivingPreferenceForm.module.css";
import "./Slider.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import client from "../../../feathersClient.js";
import { useNavigate } from "react-router-dom";
import PreferenceWeightMobile from "./PreferenceWeightMobile.jsx";
import PreferenceWeight from "./PreferenceWeight.jsx";
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
  searchRadius: 50,
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
    totalAvailablePoints: 8,
  },
};

const LivingPreferenceForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const resultsRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [surveyResults, setSurveyResults] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [formAnimation, setFormAnimation] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const instructions1 = isMobile
    ? "Touch inside a category to add a token. Swipe left on a category to remove."
    : "Drag and drop or click inside a category to add a token. Drag to and drop to remove or swap tokens.";
  const instructions2 =
    "Put more tokens into the categories you care about the most.";

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const validateForm = () => {
    let isValid = true;
    let errorMessage = "";

    if (formData.weights.totalAvailablePoints > 0) {
      isValid = false;
      errorMessage = "Please allocate all available points for preferences.";
    }

    if (
      formData.weights.jobOpportunityWeight > 0 &&
      formData.selectedJobs.length === 0
    ) {
      isValid = false;
      errorMessage = "Please select at least one job.";
    }

    if (formData.weights.costOfLivingWeight > 0 && !formData.housingType) {
      isValid = false;
      errorMessage = "Please select a housing type.";
    }

    if (
      formData.weights.publicServicesWeight > 0 &&
      formData.publicServices.length === 0
    ) {
      isValid = false;
      errorMessage = "Please select at least one public service.";
    }

    if (formData.weights.sceneryWeight > 0 && formData.scenery.length === 0) {
      isValid = false;
      errorMessage = "Please select at least one scenery preference.";
    }

    if (formData.weights.weatherWeight > 0) {
      if (!formData.snowPreference || !formData.rainPreference) {
        isValid = false;
        errorMessage = "Please specify your weather preferences.";
      }

      if (formData.temperatureData.some((month) => month.temp === null)) {
        isValid = false;
        errorMessage = "Please complete the temperature data for each month.";
      }
    }

    if (
      formData.weights.recreationalActivitiesWeight > 0 &&
      formData.recreationalInterests.length === 0
    ) {
      isValid = false;
      errorMessage = "Please select at least one recreational interest.";
    }

    return { isValid, errorMessage };
  };

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
    const { isValid, errorMessage } = validateForm();

    if (!isValid) {
      toast.error(errorMessage);
      return;
    }
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
    if (showForm) {
      // When hiding the form, start the slide-up animation
      setFormAnimation(styles.formSlidingExit);
      // Use a timeout to change the state after the animation completes
      setTimeout(() => setShowForm(false), 160); // Adjust the timeout to match your animation duration
    } else {
      // When showing the form, just change the state and let CSS handle the slide down
      setShowForm(true);
    }
  };

  useEffect(() => {
    if (showForm) {
      setFormAnimation(styles.formSlidingEnter);
    }
  }, [showForm]);

  useEffect(() => {
    const { totalAvailablePoints, ...weightsWithoutTotal } = formData.weights;
    const hasNonZeroWeight = Object.values(weightsWithoutTotal).some(
      (weight) => weight > 0
    );

    setShowSubmitButton(hasNonZeroWeight);
  }, [formData]);

  useEffect(() => {
    if (localStorage.getItem("showLoginSuccessToast") === "true") {
      toast.success("Login Successful");
      localStorage.removeItem("showLoginSuccessToast");
    }
  }, []);

  return (
    <div className={styles.centerContainer}>
      {surveyResults && showForm && (
        <div className={styles.btnContainer}>
          <button
            onClick={toggleFormVisibility}
            className={`${styles.btnCancel}`}
          >
            Hide Preferences
          </button>
        </div>
      )}
      <div>
        {showForm ? (
          <div>
            <form
              onSubmit={handleSubmit}
              className={`container ${styles.centerContainer} ${styles.formContent} ${formAnimation}`}
            >
              <div className={`form-group ${styles.formGroup}`}>
                {!showSubmitButton && (
                  <div className={`${styles.parHeaderContainer}`}>
                    <p
                      className={`${styles.parHeader} ${styles.parHeaderFirst}`}
                    >
                      {instructions1}
                    </p>
                    <p
                      className={`${styles.parHeader} ${styles.parHeaderSecond}`}
                    >
                      {instructions2}
                    </p>
                    <p
                      className={`${styles.parHeader} ${styles.parHeaderThird}`}
                    >
                      {instructions1}
                    </p>
                  </div>
                )}
                {isMobile ? (
                  <PreferenceWeightMobile
                    onWeightsChange={updateFormDataWithWeights}
                    weights={formData.weights}
                  />
                ) : (
                  <PreferenceWeight
                    onWeightsChange={updateFormDataWithWeights}
                    weights={formData.weights}
                  />
                )}
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
                <div
                  className={`form-group ${styles.slider} ${styles.formGroup}`}
                >
                  <label htmlFor="searchRadius">
                    <h4>Select Search Radius (miles)</h4>
                    <p className={`mb-2 ${styles.par}`}>
                      This will apply for recreation, public services, and
                      scenery preferences.
                    </p>
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
              {formData.weights.recreationalActivitiesWeight > 0 && (
                <RecreationalPreferences
                  formData={formData}
                  handleCheckboxChange={handleCheckboxChange}
                />
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
              {/* <PopulationPreferences
                formData={formData}
                handleInputChange={handleInputChange}
              /> */}
              {showSubmitButton && (
                <div className="d-flex justify-content-start">
                  <button
                    type="submit"
                    className={`mt-2 ${styles.btnDropdown}`}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    onClick={resetSurvey}
                    className={`mt-2 ${styles.btnDropdown}`}
                  >
                    Clear Survey
                  </button>
                </div>
              )}
            </form>
            <div ref={resultsRef}>
              {!loading && surveyResults ? (
                <div className={styles.formContent}>
                  <ResultsPage data={surveyResults} />
                </div>
              ) : loading ? (
                <LoadingScreen />
              ) : null}
            </div>
          </div>
        ) : (
          <div className={styles.formContent}>
            <ResultsPage
              data={surveyResults}
              toggleFormVisibility={toggleFormVisibility}
              showEditButton={!showForm}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LivingPreferenceForm;
