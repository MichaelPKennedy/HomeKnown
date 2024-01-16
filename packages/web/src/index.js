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
import SearchPage from "./pages/SearchPage";
import ResultsPage from "./pages/ResultsPage";
import City from "./pages/City";
import NavBar from "./components/NavBar";
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
      return <div>Something went wrong.</div>;
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
          <CityDataProvider>
            <Router>
              <NavBar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/results" element={<ResultsPage />} />
                <Route path="/results/:cityId" element={<City />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/signed-out" element={<LoggedOut />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/data-sources" element={<DataSources />} />
              </Routes>
              <ToastContainer />
            </Router>
          </CityDataProvider>
        </DndProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

reportWebVitals();
