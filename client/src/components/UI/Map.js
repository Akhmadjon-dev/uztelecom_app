import { Circle, Popup } from "react-leaflet";
import React from "react";
// import numeral from "numeral";

const statusTypeColor = {
  finished: {
    hex: "#057BFF",
    // rgb: "rgb(204, 16, 52",
    // half_op: "rgba(204, 16, 52, 0.5",
    multiplier: 800,
  },
  unfinished: {
    hex: "#ED4949",
    // rgb: "rgb(125,215,29)",
    // half_op: "rgba(125,215,29, 0.5)",
    multiplier: 1200,
  },
  progres: {
    hex: "#FF9600",
    // rgb: "rgb(251,68,67)",
    // half_op: "rgba(251,68,67, 0.5)",
    multiplier: 2000,
  },
};

export const showDataOnMap = (data, statusType = "finished") =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      fillColor={statusTypeColor[statusType].hex}
      color={statusTypeColor[statusType].hex}
      radius={
        Math.sqrt(country[statusType]) * statusTypeColor[statusType].multiplier
      }
    >
      <Popup>
        <div className="info-container">
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className="info-name"> {country.country}</div>
          <div className="info-confirmed">
            {" "}
            Cases: {numeral(country.cases).format("0,0")}{" "}
          </div>
          <div className="info-recovered">
            {" "}
            Recovered: {numeral(country.recovered).format("0,0")}{" "}
          </div>
          <div className="info-deaths">
            {" "}
            Deaths: {numeral(country.deaths).format("0,0")}{" "}
          </div>
        </div>
      </Popup>
    </Circle>
  ));
