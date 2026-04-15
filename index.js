const input = document.getElementById("state-input");
const button = document.getElementById("fetch-alerts");
const displayDiv = document.getElementById("alerts-display");
const errorDiv = document.getElementById("error-message");

if (button) {
  button.addEventListener("click", () => {
    fetchWeatherAlerts(input.value);
  });
}

function fetchWeatherAlerts(state) {
  displayDiv.textContent = "";
  errorDiv.textContent = "";
  errorDiv.classList.add("hidden");

  if (!state) {
    showError("Please enter a state");
    return;
  }

  fetch(`https://api.weather.gov/alerts/active?area=${state}`)
    .then(res => {
      if (!res.ok) {
        throw new Error("Network failure");
      }
      return res.json();
    })
    .then(data => {
      console.log(data);

      displayAlerts(data);

      input.value = "";
    })
    .catch(error => {
      console.log(error.message);
      showError(error.message);
    });
}

function displayAlerts(data) {
  const alerts = data.features;

  displayDiv.textContent = `Weather Alerts: ${alerts.length}`;

  alerts.forEach(alert => {
    const p = document.createElement("p");
    p.textContent = alert.properties.headline;
    displayDiv.appendChild(p);
  });
}

function showError(message) {
  errorDiv.textContent = message;

  errorDiv.classList.remove("hidden");
}