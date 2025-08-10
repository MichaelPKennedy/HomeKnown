// Utility to test tracking pixel functionality
export function testTrackingPixel() {
  console.log("Testing tracking pixel...");

  // Check if tracking variables are available
  console.log("Tracking URL:", window.__TRACKING_URL__);
  console.log("Site ID:", window.__SITE_ID__);

  // Check if visitor ID cookie exists
  const visitorId = document.cookie
    .split("; ")
    .find((row) => row.startsWith("_site_visitor_id="))
    ?.split("=")[1];

  console.log("Visitor ID:", visitorId);

  // Check if session data exists in localStorage
  try {
    const session = localStorage.getItem("_site_session");
    console.log(
      "Session data:",
      session ? JSON.parse(session) : "No session data"
    );
  } catch (e) {
    console.log("Session data: Error reading from localStorage");
  }

  // Test network request
  const testData = {
    type: "test",
    timestamp: new Date().toISOString(),
    url: window.location.href,
    userAgent: navigator.userAgent,
  };

  console.log("Sending test tracking data:", testData);

  if (navigator.sendBeacon) {
    const blob = new Blob([JSON.stringify(testData)], {
      type: "application/json",
    });
    const success = navigator.sendBeacon(window.__TRACKING_URL__, blob);
    console.log("SendBeacon result:", success);
  } else {
    fetch(window.__TRACKING_URL__, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testData),
    })
      .then((response) => {
        console.log("Fetch test result:", response.status, response.statusText);
      })
      .catch((error) => {
        console.error("Fetch test error:", error);
      });
  }
}

// Call this function in browser console to test: testTrackingPixel()
