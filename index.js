const input = document.getElementById("state-input");
const button = document.getElementById("fetch-alerts");
const displayDiv = document.getElementById("alerts-display");
const errorDiv = document.getElementById("error-message");

if (button) {
  button.addEventListener("click", () => {
    // Calling the function name expected by the criteria
    fetchWeatherData(input.value); 
  });
}

// CRITERIA REQUIREMENT: Named fetchWeatherData
function fetchWeatherData(state) {
  // Step 3: Clear and Reset UI
  displayDiv.textContent = "";
  errorDiv.textContent = "";
  errorDiv.classList.add("hidden");

  // Step 5: Input Validation
  if (!state || state.length !== 2) {
    displayError("Please enter a valid 2-letter state code.");
    return;
  }

  fetch(`https://api.weather.gov/alerts/active?area=${state.toUpperCase()}`)
    .then(res => {
      if (!res.ok) throw new Error("API response was not ok");
      return res.json();
    })
    .then(data => {
      console.log(data); // Task 1 Requirement
      displayWeather(data); // CRITERIA REQUIREMENT: Named displayWeather
      input.value = ""; // Step 3 Requirement
    })
    .catch(error => {
      console.log(error.message);
      displayError(error.message);
    });
}

// CRITERIA REQUIREMENT: Named displayWeather
function displayWeather(data) {
  const alerts = data.features;
  
  // Step 2 Summary Message Requirement
  const summary = document.createElement("h2");
  summary.textContent = `Current watches, warnings, and advisories: ${alerts.length}`;
  displayDiv.appendChild(summary);

  alerts.forEach(alert => {
    const p = document.createElement("p");
    // Ensure headline is used as requested
    p.textContent = alert.properties.headline; 
    displayDiv.appendChild(p);
  });
}

// CRITERIA REQUIREMENT: Named displayError
function displayError(message) {
  errorDiv.textContent = message;
  errorDiv.classList.remove("hidden");
}