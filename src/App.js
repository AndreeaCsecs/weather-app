import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Search from "./components/Search";
import City from "./pages/City";
import { usePosition } from "./custom-hooks/usePositions";
import { useState } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Nav from "./components/Nav";

function App() {
  const { latitude, longitude, error } = usePosition();
  const [cityName, setCityName] = useState("Bucharest");

  return (
    <div className="container">
      <Nav />
      <div
        className="row m-4"
        id="colored-card"
        style={{ height: "550px", maxWidth: "1100px" }}
      >
        <div className="col-lg-7">
          <City lat={latitude} long={longitude} cityName={cityName} />
        </div>
        <div className="col-lg-5" id="search-col">
          <Search setCityName={setCityName} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
