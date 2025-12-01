import React from 'react';

const CurrentWeather = ({ data, unit }) => {
  if (!data) return null;

  const { name, main, weather, wind, sys, visibility } = data;
  const iconUrl = `http://openweathermap.org/img/wn/${weather[0].icon}@4x.png`;

  const convertTemp = (temp) => {
    if (unit === 'imperial') {
      return Math.round((temp * 9) / 5 + 32);
    }
    return Math.round(temp);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="current-weather-card">
      <div className="current-header">
        <div className="current-location">
          <h2>{name}, {sys.country}</h2>
          <div className="current-time">{currentDate}</div>
        </div>
      </div>

      <div className="current-main">
        <div className="current-temp">{convertTemp(main.temp)}°</div>
        <img src={iconUrl} alt={weather[0].description} className="current-icon" />
        <div className="current-condition">
          <span className="condition-text">{weather[0].description}</span>
          <span className="feels-like">Feels Like {convertTemp(main.feels_like)}°</span>
        </div>
      </div>

      <div className="details-panel">
        <div className="detail-item">
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{main.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Wind</span>
          <span className="detail-value">{wind.speed} m/s</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Pressure</span>
          <span className="detail-value">{main.pressure} hPa</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Visibility</span>
          <span className="detail-value">{(visibility / 1000).toFixed(1)} km</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Sunrise</span>
          <span className="detail-value">{formatTime(sys.sunrise)}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Sunset</span>
          <span className="detail-value">{formatTime(sys.sunset)}</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
