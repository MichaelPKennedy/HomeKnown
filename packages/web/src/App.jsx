import logo from "./assets/light-logo.png";
import "./App.css";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const usePageTracking = () => {
  const history = useHistory();

  useEffect(() => {
    const trackPageView = (location) => {
      if (window.gtag) {
        window.gtag("config", "G-84F4HQ4TGB", {
          page_title: document.title,
          page_path: location.pathname + location.search,
        });
      }
    };

    // Track the initial pageview
    trackPageView(history.location);

    // Track pageviews when the route changes
    const unlisten = history.listen(trackPageView);

    return unlisten;
  }, [history]);
};

function App() {
  usePageTracking();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
