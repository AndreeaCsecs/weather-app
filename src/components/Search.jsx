import { ReactSearchAutocomplete } from "react-search-autocomplete";
import React, { useState } from "react";
import locationIcon from "./Images/yourlocation.png";
import { clientKey } from "../utils";
import clock from "./Images/clock_springs.png";

const nth = function (d) {
  if (d > 3 && d < 21) return "th";
  switch (d % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

const now = new Date();
const date = now.getDate();
const month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
][now.getMonth()];

const Search = ({ setCityName }) => {
  const [place, setPlace] = useState("");

  const [items, setItems] = useState([]);
  const handleSelect = (item) => {
    setCityName(item.name);
    setPlace(item.name + "," + " " + item.country);
  };

  const handleOnSearch = async (search) => {
    let url = `http://api.weatherapi.com/v1/search.json?key=${clientKey}&q=${search}`;

    const response = await fetch(url);
    let data = await response.json();
    setItems(data);
  };

  return (
    <div className="Search m-4">
      <div style={{ maxWidth: "400px" }}>
        <ReactSearchAutocomplete
          onSearch={handleOnSearch}
          items={items}
          onSelect={handleSelect}
        />
      </div>

      <div className="your-location my-3 d-flex justify-content-start">
        <img
          src={locationIcon}
          alt=""
          style={{ width: "25px", height: "25px" }}
          className="m-2 "
        />
        <div className="place m-2">{place}</div>
      </div>

      <div className="d-flex flex-column p-2">
        <div className="oval align-self-center p-3 ">
          <img
            src={clock}
            alt=""
            style={{ width: "75.19px", height: "38.04px" }}
            className="my-4 mx-1"
          />
          <div className="time my-4">
            {now.toLocaleString("en-GB", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </div>
        </div>

        <div className="date align-self-center p-3 m-2">
          <div className="today-date mb-3">
            {date}
            <sup>{nth(date)}</sup> {month} '
            {now.toLocaleDateString("en", { year: "2-digit" })}
          </div>

          <div className="weekday-hour">
            {now.toLocaleString("en-us", { weekday: "long" })} |{" "}
            {now.toLocaleString("en-GB", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
