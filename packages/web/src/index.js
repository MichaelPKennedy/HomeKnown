import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "./index.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { CityDataProvider } from "./utils/CityDataContext";
import HomePage from "./pages/HomePage";
import ExplorePage from "./pages/ExplorePage";
import SearchPage from "./pages/SearchPage";
import ResultsPage from "./pages/ResultsPage";
import City from "./pages/City";
import MyLocations from "./pages/MyLocations";
import NavBar from "./components/NavBar";
import ErrorPage from "./components/ErrorPage";
import { DndProvider } from "react-dnd";
import { MultiBackend, TouchTransition } from "react-dnd-multi-backend";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Login/RegisterPage";
import LoggedOut from "./pages/Login/LoggedOut";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import DataSources from "./pages/DataSources";
import { AuthProvider } from "./AuthContext";
import Recreation from "./pages/City/pages/Recreation";
import Weather from "./pages/City/pages/Weather";
import Housing from "./pages/City/pages/Housing";
import Overview from "./pages/City/pages/Overview";
import Industry from "./pages/City/pages/Industry";
import AirQuality from "./pages/City/pages/AirQuality";
import Demographics from "./pages/City/pages/Demographics";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://41c875fe4dae8546ea00662c958ff71b@o4506176576225280.ingest.us.sentry.io/4506176585269248",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Which URLs distributed tracing should be enabled
  tracePropagationTargets: [
    "localhost",
    /^https:\/\/homeknown-api-4fe050b813af\.herokuapp\.com/,
  ],
  // Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage />;
    }

    return this.props.children;
  }
}
const HTML5toTouch = {
  backends: [
    {
      backend: HTML5Backend,
    },
    {
      backend: TouchBackend,
      options: { enableMouseEvents: true },
      preview: false,
      transition: TouchTransition,
    },
  ],
};

const queryClient = new QueryClient();

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <DndProvider backend={MultiBackend} options={HTML5toTouch}>
          <AuthProvider>
            <CityDataProvider>
              <Router>
                <NavBar />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/explore" element={<ExplorePage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/results" element={<ResultsPage />} />
                  <Route path="/results/:cityId" element={<City />}>
                    <Route index element={<Overview />} />
                    <Route path="recreation" element={<Recreation />} />
                    <Route path="weather" element={<Weather />} />
                    <Route path="housing" element={<Housing />} />
                    <Route path="job-industry" element={<Industry />} />
                    <Route path="air-quality" element={<AirQuality />} />
                    <Route path="demographics" element={<Demographics />} />
                  </Route>
                  <Route path="/city/:cityId" element={<City />}>
                    <Route path="recreation" element={<Recreation />} />
                    <Route path="weather" element={<Weather />} />
                    <Route path="housing" element={<Housing />} />
                    <Route path="job-industry" element={<Industry />} />
                    <Route path="air-quality" element={<AirQuality />} />
                    <Route path="demographics" element={<Demographics />} />
                  </Route>
                  <Route path="/my-locations" element={<MyLocations />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/signed-out" element={<LoggedOut />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route
                    path="/terms-of-service"
                    element={<TermsOfService />}
                  />
                  <Route path="/data-sources" element={<DataSources />} />
                </Routes>
                <ToastContainer />
              </Router>
            </CityDataProvider>
          </AuthProvider>
        </DndProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

reportWebVitals();
