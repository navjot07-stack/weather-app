function About() {
  return (
    <div className="page-card">
      <p className="eyebrow">ABOUT THE PROJECT</p>

      <h1>About Weather App</h1>

      <p>
        Weather App is a responsive client-side web application
        developed with React. It allows users to view current
        weather information for multiple cities around the world.
      </p>

      <h2>Technology Stack</h2>

      <ul>
        <li><strong>React:</strong> Used to build the user interface.</li>
        <li><strong>Vite:</strong> Used as the development and build tool.</li>
        <li><strong>React Router:</strong> Provides client-side navigation between pages.</li>
        <li><strong>Axios:</strong> Handles asynchronous HTTP requests.</li>
        <li><strong>OpenWeather API:</strong> Provides live weather information.</li>
        <li><strong>Local Storage:</strong> Stores the user's temperature preference.</li>
        <li><strong>CSS:</strong> Provides the responsive dark-themed interface.</li>
      </ul>

      <h2>Application Features</h2>

      <ul>
        <li>Live weather information</li>
        <li>Multiple global city selection</li>
        <li>Celsius and Fahrenheit conversion</li>
        <li>Persistent temperature preference</li>
        <li>Client-side page navigation</li>
        <li>Responsive desktop and mobile layout</li>
        <li>Weather details including humidity, wind, pressure, cloudiness, and visibility</li>
      </ul>

      <h2>Purpose</h2>

      <p>
        The project demonstrates how modern React applications can
        combine routing, asynchronous API requests, component
        state, effects, and browser storage to create an interactive
        web application.
      </p>
    </div>
  );
}

export default About;