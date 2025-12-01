import React from 'react';

const Forecast = ({ data, unit, type }) => {
    if (!data) return null;

    const convertTemp = (temp) => {
        if (unit === 'imperial') {
            return Math.round((temp * 9) / 5 + 32);
        }
        return Math.round(temp);
    };

    if (type === 'hourly') {
        // Hourly Forecast (First 12 items ~ 36 hours)
        const hourlyForecast = data.list.slice(0, 12);

        return (
            <div className="hourly-strip">
                <h3 className="section-title">Hourly Forecast</h3>
                <div className="hourly-scroll">
                    {hourlyForecast.map((hour) => {
                        const time = new Date(hour.dt * 1000).toLocaleTimeString([], { hour: 'numeric' });
                        const iconUrl = `http://openweathermap.org/img/wn/${hour.weather[0].icon}.png`;

                        return (
                            <div key={hour.dt} className="hourly-card">
                                <span className="hourly-time">{time}</span>
                                <img src={iconUrl} alt={hour.weather[0].description} className="hourly-icon" />
                                <span className="hourly-temp">{convertTemp(hour.main.temp)}°</span>
                                <span className="precip-chance">{Math.round(hour.pop * 100)}% Rain</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    if (type === 'daily') {
        // Daily Forecast (Filter for 12:00 PM)
        const dailyForecast = data.list.filter((reading) =>
            reading.dt_txt.includes('12:00:00')
        );

        return (
            <div className="daily-list">
                <h3 className="section-title">10-Day Forecast</h3>
                {dailyForecast.map((day) => {
                    const date = new Date(day.dt * 1000);
                    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
                    const dayNum = date.getDate();
                    const iconUrl = `http://openweathermap.org/img/wn/${day.weather[0].icon}.png`;

                    return (
                        <div key={day.dt} className="daily-row">
                            <div className="daily-day">
                                {dayName} {dayNum}
                            </div>
                            <div className="daily-condition">
                                <img src={iconUrl} alt={day.weather[0].description} className="daily-icon" />
                                <span className="daily-desc">{day.weather[0].description}</span>
                            </div>
                            <div className="daily-temps">
                                <span className="temp-high">{convertTemp(day.main.temp_max)}°</span>
                                <span className="temp-low">{convertTemp(day.main.temp_min)}°</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

    return null;
};

export default Forecast;
