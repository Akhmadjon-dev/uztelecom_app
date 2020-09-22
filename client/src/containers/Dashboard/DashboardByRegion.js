import React, { Component } from "react";

import Axios from "axios";

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

import { Card, Col, Row, Select } from "antd";
import { SecurityScanFilled } from "@ant-design/icons";
import { Circle, Popup, TileLayer, Marker, Map } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import RedPin from "../../assets/img/pin.svg";
import BluePin from "../../assets/img/pinBlue.svg";
import YellowPin from "../../assets/img/pinYellow.svg";
import { ReactComponent as UmumiyIcon } from "../../assets/img/umumiyIcon.svg";
import { ReactComponent as FinishedIcon } from "../../assets/img/finishedIcon.svg";
import { ReactComponent as UnfinishedIcon } from "../../assets/img/unfinishedIcon.svg";
import { ReactComponent as ProgressIcon } from "../../assets/img/progressIcon.svg";
import "./style.css";
import { Loader } from "../../components/UI";
L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.5.0/dist/images/";

const { Option } = Select;
// let myIconBlue = L.icon({
//   iconUrl: BluePin,
//   iconSize: [38, 85],
//   iconAnchor: [22, 94],
//   popupAnchor: [-3, -76],
//   // shadowUrl: 'my-icon-shadow.png',
//   // shadowSize: [68, 95],
//   // shadowAnchor: [22, 94]
// });
// let myIconRed = L.icon({
//   iconUrl: RedPin,
//   iconSize: [38, 85],
//   iconAnchor: [22, 94],
//   popupAnchor: [-3, -76],
//   // shadowUrl: 'my-icon-shadow.png',
//   // shadowSize: [68, 95],
//   // shadowAnchor: [22, 94]
// });
// let myIconYellow = L.icon({
//   iconUrl: YellowPin,
//   iconSize: [38, 85],
//   iconAnchor: [22, 94],
//   popupAnchor: [-3, -76],
//   // shadowUrl: 'my-icon-shadow.png',
//   // shadowSize: [68, 95],
//   // shadowAnchor: [22, 94]
// });

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      loading: true,
      count: 0,
      region: "",
      period: "",
      type: "soliq",
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
    Axios.get(
      `/dashboard/?region=${this.state.region}&&type=${this.state.type}`
    ).then((res) => {
      const data = res.data;
      this.setState({ data, loading: false });
      this.setState({
        isLoaded: true,
      });
    });
  }

  selectHanlder = async (value, name) => {
    this.setState({
      isLoaded: true,
    });
    if (name == "region") {
      await this.setState({
        region: value,
      });
    }
    if (name == "type") {
      await this.setState({
        type: value,
      });
    }
    Axios.get(
      `/dashboard/?region=${this.state.region}&&type=${this.state.type}`
    ).then((res) => {
      const data = res.data;
      this.setState({ data });
    });
  };

  periodHandler = async (name, e) => {
    await this.setState({
      period: name,
    });
    const { period } = await this.state;
    Axios.get(
      `/dashboard/?region=${this.state.region}&&type=${this.state.type}&&period=${period}`
    ).then((res) => {
      const data = res.data;
      this.setState({ data });
    });
  };
  render() {
    console.log(this.state, "-------------");
    const { result, date, total } = this.state.data.info;
    return (
      <div>
        {this.state.loading ? (
          <Loader />
        ) : (
          <div>
            <div className="select-region">
              <div className="select-group">
                <div className="input-container">
                  <p>Tumanni tanlang:</p>
                  <Select
                    className="select-input"
                    defaultValue={this.state.region}
                    onChange={(val) => this.selectHanlder(val, "region")}
                  >
                    <Option value="">Viloyat bo'yicha</Option>
                    <Option value="baxmal">Baxmal</Option>
                    <Option value="paxtakor">Paxtakor</Option>
                  </Select>
                </div>
                <div className="input-container">
                  <p>Tashkilot turini tanlang:</p>
                  <Select
                    className="select-input"
                    defaultValue={this.state.type}
                    onChange={(val) => this.selectHanlder(val, "type")}
                  >
                    <Option value="">Hammasi</Option>
                    <Option value="soliq">Soliq</Option>
                    <Option value="orta talim">O'rta ta'lim</Option>
                    <Option value="maktabgacha talim">Maktabgacha</Option>
                  </Select>
                </div>
              </div>
            </div>
            {this.state.isLoaded && (
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
                          autoFocus
                          onClick={(e) => this.periodHandler("thisYear", e)}
                          className="btn"
                        >
                          This Year
                        </button>
                      </li>
                    </ul>
                    <h4>
                      <span>{date.start}</span>-<span>{date.end}</span>
                    </h4>
                  </div>

                  <AreaChart
                    width={1100}
                    height={250}
                    data={result}
                    style={{ margin: "auto" }}
                    margin={{ top: 50, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="green" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="green" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="red" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="red" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorTv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="yellow"
                          stopOpacity={0.8}
                        />
                        <stop offset="95%" stopColor="yellow" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="finished"
                      stroke="green"
                      fillOpacity={1}
                      fill="url(#colorUv)"
                    />
                    <Area
                      type="monotone"
                      dataKey="unfinished"
                      stroke="red"
                      fillOpacity={1}
                      fill="url(#colorPv)"
                    />
                    <Area
                      type="monotone"
                      dataKey="progress"
                      stroke="yellow"
                      fillOpacity={1}
                      fill="url(#colorTv)"
                    />
                  </AreaChart>
                  <BarChart
                    width={1100}
                    height={250}
                    style={{ margin: "auto" }}
                    margin={{ top: 50, bottom: 0 }}
                    data={result}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="finished" fill="green" />
                    <Bar dataKey="unfinished" fill="red" />
                    <Bar dataKey="progress" fill="yellow" />
                  </BarChart>
                  <LineChart
                    width={1100}
                    height={250}
                    style={{ margin: "auto" }}
                    margin={{ top: 50, bottom: 0 }}
                    data={result}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="finished" stroke="green" />
                    <Line type="monotone" dataKey="unfinished" stroke="red" />
                    <Line type="monotone" dataKey="progress" stroke="yellow" />
                  </LineChart>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}
