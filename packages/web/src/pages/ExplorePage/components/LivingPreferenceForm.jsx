import React, { useState, useEffect, useRef, useContext } from "react";
import { toast } from "react-toastify";
import styles from "./LivingPreferenceForm.module.css";
import "./Slider.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import client from "../../../feathersClient.js";
import PreferenceWeightSimple from "./PreferenceWeightSimple.jsx";
import LoadingScreen from "./LoadingScreen.jsx";
import JobPreferences from "./JobPreferences.jsx";
import HousingPreferences from "./HousingPreferences.jsx";
import PublicServicePreferences from "./PublicServicePreferences.jsx";
import SceneryPreferences from "./SceneryPreferences.jsx";
import WeatherPreferences from "./WeatherPreferences.jsx";
import RecreationalPreferences from "./RecreationalPreferences.jsx";
import PopulationPreferences from "./PopulationPreferences";
import StatePreferences from "./StatePreferences";
import ResultsPage from "../../ResultsPage";
import { useCityData } from "../../../utils/CityDataContext";
import { AuthContext } from "../../../AuthContext";

const initialFormData = {
  snowPreference: "none",
  rainPreference: "regular",
  livingPreference: "city",
  recreationalInterests: [],
  publicServices: [],
  scenery: [],
  searchRadius: 50,
  minPopulation: -1,
  maxPopulation: -1,
  includedStates: [],
  minSalary1: null,
  minSalary2: null,
  jobLevel: "",
  selectedJobs: [],
  housingType: "",
  homeMin: 200000,
  homeMax: 300000,
  rentMin: 1000,
  rentMax: 2000,
  humidityPreference: 50,
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
  },
};

const LivingPreferenceForm = () => {
  const [formData, setFormData] = useState(initialFormData);
  const resultsRef = useRef(null);
  const { setUserPreferences } = useCityData();
  const { isLoggedIn, user } = useContext(AuthContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [surveyResults, setSurveyResults] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formAnimation, setFormAnimation] = useState("");
  const [tempWeights, setTempWeights] = useState({
    costOfLivingWeight: 5,
    recreationalActivitiesWeight: 5,
    weatherWeight: 5,
    jobOpportunityWeight: 5,
    publicServicesWeight: 5,
    crimeRateWeight: 5,
    sceneryWeight: 5,
    airQualityWeight: 5,
  });
  const [totalWeights, setTotalWeights] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);

  const validateForm = () => {
    let isValid = true;
    let errorMessage = "";

    if (!formData.minPopulation || !formData.maxPopulation) {
      isValid = false;
      errorMessage = "Please select a valid population range.";
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
      if (
        !formData.snowPreference ||
        !formData.rainPreference ||
        !formData.humidityPreference
      ) {
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
    setTotalWeights(0);
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
      const authToken = localStorage.getItem("authToken");
      let headers;
      if (authToken) {
        headers = {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        };
      }
      const userId = isLoggedIn ? user?.user_id : null;
      const response = await client.service("survey").create(
        {
          data: formData,
          user_id: userId,
        },
        headers
      );
      if (response) {
        setLoading(false);
        setUserPreferences(formData);
        setSurveyResults(response);
        setShowForm(false);
        // Save the results and form state to sessionStorage
        localStorage.removeItem("recreationFilters");
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
    } else {
      setShowForm(true);
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

  const updateFormDataWithWeights = (newWeights, isDeselect) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      weights: newWeights,
    }));
    if (!isDeselect) {
      setTempWeights((prevTempWeights) => ({
        ...prevTempWeights,
        ...Object.keys(newWeights).reduce((acc, key) => {
          if (newWeights[key] !== 0) {
            acc[key] = newWeights[key];
          }
          return acc;
        }, {}),
      }));
    }
  };

  const toggleFormVisibility = () => {
    if (showForm) {
      setShowForm(false);
    } else {
      // When showing the form, just change the state and let CSS handle the slide down
      setShowForm(true);
    }
  };

  const handleWeightChange = (key, value) => {
    setFormData((prevState) => ({
      ...prevState,
      weights: {
        ...prevState.weights,
        [key]: value,
      },
    }));
    setTempWeights((prevTempWeights) => ({
      ...prevTempWeights,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (showForm) {
      setFormAnimation(styles.formSlidingEnter);
    }
  }, [showForm]);

  useEffect(() => {
    const hasNonZeroWeight = totalWeights > 0;

    setShowSubmitButton(hasNonZeroWeight);
  }, [formData]);

  useEffect(() => {
    const categoriesSelected = Object.values(formData.weights).filter(
      (weight) => weight > 0
    ).length;

    setCategoryCount(categoriesSelected);
  }, [formData]);

  return (
    <div className={styles.pageContainer}>
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
          <div className={styles.preferenceFormContainer}>
            <form
              onSubmit={handleSubmit}
              className={`container ${styles.centerContainer} ${styles.formContent} ${formAnimation}`}
            >
              <div className={`form-group ${styles.preferenceFormGroup}`}>
                <PreferenceWeightSimple
                  onWeightsChange={updateFormDataWithWeights}
                  weights={formData.weights}
                  tempWeights={tempWeights}
                  setTotalWeights={setTotalWeights}
                />
              </div>
              {categoryCount > 1 && (
                <div className={`form-group ${styles.preferenceFormGroup}`}>
                  <h4 className="pb-2 mt-3">Category Priority</h4>
                  {Object.keys(formData.weights)
                    .filter((key) => formData.weights[key] > 0)
                    .map((key) => (
                      <div key={key} className={styles.sliderContainer}>
                        <label>{key.replace(/Weight$/, "")}</label>
                        <Slider
                          min={1}
                          max={10}
                          defaultValue={formData.weights[key]}
                          onChange={(value) => handleWeightChange(key, value)}
                        />
                      </div>
                    ))}
                </div>
              )}
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
                  setFormData={setFormData}
                  handleInputChange={handleInputChange}
                  handleTemperatureChange={handleTemperatureChange}
                  hasColdMonth={hasColdMonth}
                />
              )}
              {totalWeights > 0 && (
                <>
                  <PopulationPreferences
                    formData={formData}
                    setFormData={setFormData}
                  />
                  <StatePreferences
                    formData={formData}
                    setFormData={setFormData}
                  />
                </>
              )}
              {showSubmitButton && (
                <div
                  className={`d-flex justify-content-start ${
                    surveyResults ? "" : styles.submitBtnRow
                  }`}
                >
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
