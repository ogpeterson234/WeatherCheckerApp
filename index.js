
  const apiKey = "3e8a5ba464b34b599ac111353252710";

  function getWeather() {
    const city = document.getElementById('cityInput').value;

    if (!city) {
      alert("Please enter a city name!");
      return;
    }

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error("City not found or API error");
        }
        return response.json();
      })
      .then(data => {
        const localTime = data.location.localtime;
        const greeting = getGreeting(localTime);
        const icon = data.current.condition.icon;

        const weatherInfo = `
${greeting} 👋
<img src="${icon}" alt="Weather Icon" class="icon"/>
🌍 Location: ${data.location.name}, ${data.location.country}
🕒 Local Time: ${localTime}
🌡️ Temperature: ${data.current.temp_c}°C
☁️ Condition: ${data.current.condition.text}
💧 Humidity: ${data.current.humidity}%
💨 Wind: ${data.current.wind_kph} kph
        `;

        const resultDiv = document.getElementById('weatherResult');
        resultDiv.innerHTML = weatherInfo;
        resultDiv.style.display = "block";
      })
      .catch(error => {
        alert(error.message);
      });
  }

  function getGreeting(localTime) {
    const hour = new Date(localTime).getHours();

    if (hour >= 5 && hour < 12) {
      return "🌅 Good Morning";
    } else if (hour >= 12 && hour < 17) {
      return "🌞 Good Afternoon";
    } else if (hour >= 17 && hour < 21) {
      return "🌆 Good Evening";
    } else {
      return "🌙 Good Night";
    }
  }
