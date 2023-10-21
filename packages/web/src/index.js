import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "./index.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import reportWebVitals from "./reportWebVitals";

import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import ResultsPage from "./pages/ResultsPage";
import NavBar from "./components/NavBar";
import { DndProvider } from "react-dnd";
import { MultiBackend, TouchTransition } from "react-dnd-multi-backend";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

// Create a client

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error or handle it in a way that suits your app
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
      options: { enableMouseEvents: true }, // Note that you can call your backends with options
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
          <Router>
            <NavBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/results" element={<ResultsPage />} />
            </Routes>
          </Router>
        </DndProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>
);

reportWebVitals();
