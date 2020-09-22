import React, { Component } from "react";

import Axios from "axios";
import Loader from "../../components/UI/Loader";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  Bar,
  BarChart,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { Circle, Popup, TileLayer, Marker, Map } from "react-leaflet";
import L from "leaflet";
import { SecurityScanFilled } from "@ant-design/icons";

import "leaflet/dist/leaflet.css";
import RedPin from "../../assets/img/pin.svg";
import BluePin from "../../assets/img/pinBlue.svg";
import YellowPin from "../../assets/img/pinYellow.svg";

import { ReactComponent as UmumiyIcon } from "../../assets/img/umumiyIcon.svg";
import { ReactComponent as FinishedIcon } from "../../assets/img/finishedIcon.svg";
import { ReactComponent as UnfinishedIcon } from "../../assets/img/unfinishedIcon.svg";
import { ReactComponent as ProgressIcon } from "../../assets/img/progressIcon.svg";
import "./style.css";
L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.5.0/dist/images/";

let myIconBlue = L.icon({
  iconUrl: BluePin,
  iconSize: [38, 85],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  // shadowUrl: 'my-icon-shadow.png',
  // shadowSize: [68, 95],
  // shadowAnchor: [22, 94]
});
let myIconRed = L.icon({
  iconUrl: RedPin,
  iconSize: [38, 85],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  // shadowUrl: 'my-icon-shadow.png',
  // shadowSize: [68, 95],
  // shadowAnchor: [22, 94]
});
let myIconYellow = L.icon({
  iconUrl: YellowPin,
  iconSize: [38, 85],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
  // shadowUrl: 'my-icon-shadow.png',
  // shadowSize: [68, 95],
  // shadowAnchor: [22, 94]
});

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      lat: 51.505,
      lng: -0.09,
      zoom: 9,
      center: { lat: 40.13533, lng: 67.822114 },
      count: 0,
      status: false,
      map: [],
      data: {
        info: {
          result: {},
          total: {},
          date: {},
        },
      },
    };
  }

  componentDidMount() {
    Axios.post("/dashboard").then((res) => {
      const data = res.data;
      this.setState({ data, loading: false });
    });
    const getCountriesData = async () => {
      await fetch("/dashboard/map")
        .then((res) => res.json())
        .then((data) => {
          const positions = data.map((country) => ({
            name: country.name, // Uzbekistan,
            center: country.cordinate, // UK, USA,UZ
            status: country.isFinished, // true false progress
          }));
          this.setState({
            map: positions,
          });
        });
    };
    getCountriesData();
  }

  periodHandler = (period, e) => {
    Axios.post("/dashboard", { period }).then((res) => {
      const data = res.data;
      this.setState({ data });
    });
  };
  render() {
    const { data, center, zoom, map, country, status } = this.state;
    const { result, date, total } = this.state.data.info;

    return (
      <div>
        {this.state.loading ? (
          <Loader />
        ) : (
          <div>
            <div className="site-card-wrapper">
              <div className="card">
                <div className="card-text">
                  <h3>
                    {parseInt(total.totalFinished) +
                      parseInt(total.totalUnFinished) +
                      parseInt(total.totalProgres)}
                  </h3>
                  <p>Umumiy</p>
                </div>
                <div className="card-icon">
                  <UmumiyIcon className="card-icon-item" />
                </div>
              </div>
              <div className="card">
                <div className="card-text">
                  <h3>{total.totalFinished}</h3>
                  <p>Tugallangan</p>
                </div>
                <div className="card-icon">
                  <FinishedIcon className="card-icon-item" />
                </div>
              </div>
              <div className="card">
                <div className="card-text">
                  <h3>{total.totalProgres}</h3>
                  <p>Jarayonda</p>
                </div>
                <div className="card-icon">
                  <ProgressIcon className="card-icon-item" />
                </div>
              </div>
              <div className="card">
                <div className="card-text">
                  <h3>{total.totalUnFinished}</h3>
                  <p>Boshlanmagan</p>
                </div>
                <div className="card-icon">
                  <UnfinishedIcon className="card-icon-item" />
                </div>
              </div>
            </div>
            <div className="dashboard-container">
              <div className="dashboard-group">
                <ul className="period-btn-group">
                  <li className="period-btn">
                    <button
                      onClick={(e) => this.periodHandler("week", e)}
                      className="btn"
                    >
                      This Week
                    </button>
                  </li>
                  <li className="period-btn ">
                    <button
                      onClick={(e) => this.periodHandler("month", e)}
                      className="btn "
                    >
                      This Month
                    </button>
                  </li>
                  <li className="period-btn">
                    <button
                      onClick={(e) => this.periodHandler("lastMonth", e)}
                      className="btn"
                    >
                      Last Month
                    </button>
                  </li>
                  <li className="period-btn">
                    <button
                      onClick={(e) => this.periodHandler("quater", e)}
                      className="btn"
                    >
                      Quaterly
                    </button>
                  </li>
                  <li className="period-btn">
                    <button
                      onClick={(e) => this.periodHandler("thisYear", e)}
                      className="btn"
                      autoFocus
                    >
                      This Year
                    </button>
                  </li>
                </ul>
                <h4>
                  <span>{date.start}</span> - <span>{date.end}</span>
                </h4>
              </div>
              <AreaChart
                width={1100}
                height={250}
                data={result}
                margin={{ top: 50, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#28AC47" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#28AC47" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ED4949" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#ED4949" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorTv" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF9600" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#FF9600" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="finished"
                  stroke="#28AC47"
                  fillOpacity={1}
                  fill="url(#colorUv)"
                />
                <Area
                  type="monotone"
                  dataKey="unfinished"
                  stroke="#ED4949"
                  fillOpacity={1}
                  fill="url(#colorPv)"
                />
                <Area
                  type="monotone"
                  dataKey="progress"
                  stroke="#FF9600"
                  fillOpacity={1}
                  fill="url(#colorTv)"
                />
              </AreaChart>
              <BarChart
                width={1100}
                height={250}
                margin={{ top: 50, bottom: 0 }}
                data={result}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="finished" fill="#28AC47" />
                <Bar dataKey="unfinished" fill="#ED4949" />
                <Bar dataKey="progress" fill="#FF9600" />
              </BarChart>
              <LineChart
                width={1100}
                height={250}
                margin={{ top: 50, bottom: 0 }}
                data={result}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="finished" stroke="#28AC47" />
                <Line type="monotone" dataKey="unfinished" stroke="#ED4949" />
                <Line type="monotone" dataKey="progress" stroke="#FF9600" />
              </LineChart>
              <div className="map">
                <Map center={center} zoom={zoom}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    setParams={true}
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {map.map((item) => {
                    const { status } = item;
                    return status == "true" ? (
                      <Marker
                        width={200}
                        position={[item.center.lat, item.center.lng]}
                        draggable="true"
                        icon={myIconBlue}
                        key={item.name}
                      >
                        {item.name && (
                          <Popup width={90}>
                            <h2>{item.name}</h2> <br /> You can write smth here
                          </Popup>
                        )}
                      </Marker>
                    ) : status == "false" ? (
                      <Marker
                        width={200}
                        position={[item.center.lat, item.center.lng]}
                        draggable="true"
                        icon={myIconRed}
                        key={item.name}
                      >
                        {item.name && (
                          <Popup width={90}>
                            <h2>{item.name}</h2> <br /> You can write smth here
                          </Popup>
                        )}
                      </Marker>
                    ) : status == "progress" ? (
                      <Marker
                        width={200}
                        position={[item.center.lat, item.center.lng]}
                        draggable="true"
                        icon={myIconYellow}
                        key={item.name}
                      >
                        {item.name && (
                          <Popup width={90}>
                            <h2>{item.name}</h2> <br /> You can write smth here
                          </Popup>
                        )}
                      </Marker>
                    ) : null;
                  })}
                </Map>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
