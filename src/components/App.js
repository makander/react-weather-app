import React from "react";
import DailyCard from "./DailyCard";
import WeeklyForecast from "./WeeklyForecast";
import DailyOverviewContent from "./DailyOverviewContent";
import Header from "./Header";

class App extends React.Component {
  state = {
    lat: null,
    long: null,
    weather: null,
    forecast: null
  };

  componentDidMount() {
    this.getPosition();
  }

  getPosition = () => {
    navigator.geolocation.getCurrentPosition(position =>
      this.setState(
        {
          lat: position.coords.latitude,
          long: position.coords.longitude
        },
        () => this.getWeather()
      )
    );
  };

  getWeather = async (units = "metric") => {
    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${
        this.state.lat
      }&lon=${
        this.state.long
      }&appid=3b7e14abfb7372f6c8870898d5c70aa5&units=${units}`
    );
    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${
        this.state.lat
      }&lon=${
        this.state.long
      }&appid=3b7e14abfb7372f6c8870898d5c70aa5&units=${units}`
    );
    const dailyWeather = await weatherResponse.json();
    const forecastData = await forecastResponse.json();

    this.setState({ weather: dailyWeather, forecast: forecastData });
  };

  render() {
    if (this.state.weather !== null) {
      return (
        <div className="container ">
          <Header
            forecast={this.state.forecast}
            weather={this.state.weather}
            getWeather={this.getWeather}
            test={"test"}
          />
          <div className="row">
            <DailyCard weather={this.state.weather} />
            <DailyOverviewContent
              forecast={this.state.forecast}
              weather={this.state.weather}
            />
          </div>
          <WeeklyForecast forecast={this.state.forecast} />
          {console.log(this.state)}
        </div>
      );
    } else {
      return <div>Loading data</div>;
    }
  }
}

export default App;
