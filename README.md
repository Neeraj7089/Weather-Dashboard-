# Weather Dashboard

A modern, responsive weather dashboard application built with React, aiming for a clean, production-grade UI inspired by Google Weather. This project features real-time weather data, a 5-day forecast, location search, and a favorites system, all styled with Tailwind CSS and animated with Framer Motion.

## 🚀 Features

-   **Real-time Weather:** Accurate current weather conditions including temperature, humidity, wind speed, and more.
-   **5-Day Forecast:** Detailed forecast for upcoming days.
-   **Location Search:** Search for any city to look up its weather.
-   **Favorites System:** Save your favorite locations for quick access (FavoritesPanel).
-   **Responsive Design:** Mobile-first approach ensuring a great experience on all devices.
-   **Modern UI/UX:**
    -   Sleek animations using `framer-motion`.
    -   Clean iconography with `lucide-react`.
    -   Glassmorphism and dynamic styling using `tailwind-css` and `clsx`.
-   **Global State Management:** Powered by React Context API (`WeatherContext`).

## 🛠️ Tech Stack

-   **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Animations:** [Framer Motion](https://www.framer.com/motion/)
-   **Icons:** [Lucide React](https://lucide.dev/)
-   **HTTP Client:** [Axios](https://axios-http.com/)
-   **Testing:** [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/)
-   **Linting:** ESLint

## 📦 Prerequisites

Ensure you have the following installed:
-   [Node.js](https://nodejs.org/) (Latest LTS recommended)
-   npm (comes with Node.js)

## 🏃‍♂️ Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/weather-react-app.git
    cd weather-react-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The app will run at `http://localhost:5173`.

## 🧪 Running Tests

To run the test suite:

```bash
npm run test
# or for UI mode
npm run test:ui
```

## 🏗️ Building for Production

To create a production-ready build:

```bash
npm run build
```

## 📂 Project Structure

```
src/
├── components/     # UI Components (Forecast, SearchBar, etc.)
├── context/        # React Context (WeatherContext)
├── hooks/          # Custom Hooks (useWeather)
├── App.jsx         # Main Application Component
└── main.jsx        # Entry Point
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).