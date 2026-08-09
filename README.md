# Weather App

A responsive, client-side multi-page weather application built with React. The application uses React Router for navigation, the OpenWeatherMap REST API for live weather data, and browser Local Storage to preserve user preferences.

## Live Application

[Weather App](https://weather-app-ten-nu-21.vercel.app/)

## GitHub Repository

[GitHub Repository](https://github.com/navjot07-stack/weather-app)

## Features

* Multi-page navigation using React Router
* Home page with live weather information
* About page describing the application and technologies used
* Contact page with accessible Name, Email, and Message fields
* Live weather data retrieved from the OpenWeatherMap API
* Five selectable cities:

  * Kathmandu
  * London
  * New York
  * Tokyo
  * Sydney
* Displays current:

  * Temperature
  * Humidity
  * Weather conditions
  * Visibility
* Celsius and Fahrenheit temperature selection
* User temperature preference stored using Local Storage
* Animated weather visuals based on current weather conditions
* Responsive dark-themed interface
* Loading and error states for API requests
* Client-side navigation without full-page browser refreshes

## Technologies Used

* React
* Vite
* React Router
* Axios
* JavaScript
* HTML5
* CSS3
* OpenWeatherMap API
* Browser Local Storage
* Vercel

## API Choice

This project uses the OpenWeatherMap Current Weather Data API to retrieve real-time weather information.

The API provides weather information based on a selected city, including temperature, humidity, weather conditions, visibility, and other current weather measurements.

OpenWeatherMap was selected because it provides a publicly documented REST API that can be accessed asynchronously from a client-side React application.

## Project Structure

```text
weather-app/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   └── Navbar.jsx
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   └── Home.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── vite.config.js
```

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/navjot07-stack/weather-app.git
```

### 2. Open the project directory

```bash
cd weather-app
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create the environment file

Create a file named `.env` in the root directory of the project.

Add the following variable:

```env
VITE_WEATHER_API_KEY=your_openweathermap_api_key
```

Replace `your_openweathermap_api_key` with a valid OpenWeatherMap API key.

### 5. Start the development server

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173/
```

## Environment Variables

The application requires the following environment variable:

| Variable               | Description                                                       |
| ---------------------- | ----------------------------------------------------------------- |
| `VITE_WEATHER_API_KEY` | API key used to retrieve current weather data from OpenWeatherMap |

The `.env` file is excluded from version control through `.gitignore` so that the API key is not committed to the public GitHub repository.

## Weather Data Flow

When the Home page loads, React's `useEffect` hook triggers an asynchronous request to the OpenWeatherMap API.

When the user selects another city, the selected city state changes and the effect runs again to retrieve the latest weather information for that city.

The retrieved data is then stored in React state and displayed in the weather dashboard.

## Local Storage

The application provides a temperature unit preference that allows users to switch between Celsius and Fahrenheit.

The selected preference is stored in the browser's Local Storage. This allows the application to restore the user's preferred temperature unit after the browser is refreshed.

## Routing

React Router provides three client-side routes:

| Route      | Page    |
| ---------- | ------- |
| `/`        | Home    |
| `/about`   | About   |
| `/contact` | Contact |

Navigation between these routes occurs without requiring a full browser page refresh.

## Deployment

The application is deployed using Vercel and is connected to the project's GitHub repository.

The production environment uses a Vercel environment variable for the OpenWeatherMap API key.

## Author

Navjot Singh

International American University
