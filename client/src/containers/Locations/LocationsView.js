import React, { Component } from "react";
import Axios from "../../utils/axios";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Descriptions } from "antd";
import { Tag, Typography } from "antd";
import { Table, th, thead, tr, td, tbody } from "reactstrap";
import { Loader } from "../../components/UI";
import moment from "moment";
import { ReactComponent as AddressIcon } from "../../assets/img/addressIcon.svg";
import { ReactComponent as TypeTashkilot } from "../../assets/img/typeTashkilot.svg";
import { ReactComponent as AirIcon } from "../../assets/img/airIcon.svg";
import { ReactComponent as CabelIcon } from "../../assets/img/cabel-icon-view.svg";
import { ReactComponent as DeviceIcon } from "../../assets/img/device-icon-type.svg";
import { ReactComponent as DeadlineIcon } from "../../assets/img/deadlineIcon.svg";
import { Popup, TileLayer, Marker, Map } from "react-leaflet";
import { GlobalOutlined } from "@ant-design/icons";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./style.css";
L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.5.0/dist/images/";
const { Title } = Typography;
class DetailLocations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      air: null,
      isFinished: "",
      ground: null,
      chanel: null,
      device: { isInstalled: "", deadline: "", deviceType: "" },
      opticCabel: {
        total: "",
        unitType: "",
        isFinishedCabel: "",
        typeCabel: {
          air: {
            totalCabel: "",
            typeCabelDeadline: "",
            isCompleted: "",
            actualWork: "",
          },
          chanel: {
            totalCabel: "",
            typeCabelDeadline: "",
            isCompleted: "",
            actualWork: "",
          },
          ground: {
            totalCabel: "",
            typeCabelDeadline: "",
            isCompleted: "",
            actualWork: "",
          },
        },
      },
      cordinate: {
        lat: 40.135282,
        lng: 67.822287,
      },
      zoom: 14,
    };
    this.refmarker = React.createRef(<Marker></Marker>);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    Axios.get(`/locations/${id}`)
      .then((res) => {
        const data = res.data;
        this.setState({ ...data });
        this.setState({ loading: false });
        console.log(this.state, "--------------------");
      })
      .catch((err) => {
        console.log(err, "++++++++++++++++++++++++++++++");
      });
  }

  changeTabPosition = (tabPosition) => {
    this.setState({ tabPosition });
  };

  render() {
    const {
      region,
      name,
      type,
      address,
      isFinished,
      deadline,
      opticCabel,
      device,
      cordinate,
      zoom,
      air,
      ground,
      chanel,
    } = this.state;

    return (
      <div>
        {this.state.loading ? (
          <Loader />
        ) : (
          <div className="viewPage">
            <div className="left">
              <h3>Location Details</h3>
              <div className="mainInfo">
                <div className="mainInfoBox">
                  <div className="textInfo">
                    <span>Tuman</span>
                    <h4>{region}</h4>
                  </div>
                  <div className="iconInfo">{/* <AddressIcon /> */}</div>
                </div>
                <div className="mainInfoBox">
                  <div className="textInfo">
                    <span>Tashkilot nomi</span>
                    <h4>{name}</h4>
                  </div>
                  <div className="iconInfo">{<TypeTashkilot />}</div>
                </div>
                <div className="mainInfoBox">
                  <div className="textInfo">
                    <span>Tashkilot turi</span>
                    <h4>{type}</h4>
                  </div>
                  <div className="iconInfo">{/* <AddressIcon /> */}</div>
                </div>
                <div className="mainInfoBox">
                  <div className="textInfo">
                    <span>Address</span>
                    <h4>{address}</h4>
                  </div>
                  <div className="iconInfo">
                    <AddressIcon />
                  </div>
                </div>
                <div className="mainInfoBox">
                  <div className="textInfo">
                    <span>Deadline</span>
                    <h4>{moment(deadline).format("DD-MM-YYYY")}</h4>
                  </div>
                  <div className="iconInfo">
                    <DeadlineIcon />
                  </div>
                </div>
              </div>
              <div className="cabelhead">
                <h3>Cabel Details</h3>
                <div>
                  Umumiy:{" "}
                  <span>
                    {opticCabel.total} {opticCabel.unitType}
                  </span>
                </div>
              </div>
              <div className="cabelInfo">
                {air && (
                  <div className="cabelInfoBox">
                    <span>Havo</span>
                    <div className="workNumberCabel">
                      {opticCabel.typeCabel.air.actualWork} /
                      {opticCabel.typeCabel.air.totalCabel}
                    </div>
                    <div className="iconCabel">
                      <AirIcon />
                    </div>
                  </div>
                )}
                {chanel && (
                  <div className="cabelInfoBox">
                    <span>Kanal</span>
                    <div className="workNumberCabel chanel">
                      {opticCabel.typeCabel.chanel.actualWork} /
                      {opticCabel.typeCabel.chanel.totalCabel}
                    </div>
                    <div className="iconCabel">
                      <CabelIcon />
                    </div>
                  </div>
                )}
                {ground && (
                  <div className="cabelInfoBox">
                    <span>Yer</span>
                    <div className="workNumberCabel ground">
                      {opticCabel.typeCabel.ground.actualWork} /
                      {opticCabel.typeCabel.ground.totalCabel}
                    </div>
                    <div className="iconCabel">
                      <GlobalOutlined style={{ color: "#2746C5" }} />
                    </div>
                  </div>
                )}
              </div>
              <div className="deviceInfo">
                <h3>Device Details</h3>
                <div className="mainInfo">
                  <div className="mainInfoBox">
                    <div className="textInfo">
                      <span>Turi</span>
                      <h4 className="devicetype">{device.deviceType}</h4>
                    </div>
                    <div className="iconInfo">{<DeviceIcon />}</div>
                  </div>
                  <div className="mainInfoBox">
                    <div className="textInfo">
                      <span>Deadline</span>
                      <h4 className="devicetype">
                        {moment(device.deadline).format("DD-MM-YYYY")}
                      </h4>
                    </div>
                    <div className="iconInfo">{<DeadlineIcon />}</div>
                  </div>
                  {isFinished == "true" ? (
                    <div
                      style={{ background: "#DCFAF8" }}
                      className="mainInfoBox"
                    >
                      <div className="textInfo">
                        <span style={{ color: "#333" }}>Status</span>
                        <h4 style={{ color: "#33B964" }}>Tugallangan</h4>
                      </div>
                    </div>
                  ) : isFinished == "false" ? (
                    <div
                      style={{ background: "#FBDBDB" }}
                      className="mainInfoBox"
                    >
                      <div className="textInfo">
                        <span style={{ color: "#333" }}>Status</span>
                        <h4 style={{ color: "#EC4343" }}>Boshlanmagan</h4>
                      </div>
                    </div>
                  ) : isFinished == "progress" ? (
                    <div
                      style={{ background: "rgba(255, 189, 91, 0.37)" }}
                      className="mainInfoBox"
                    >
                      <div className="textInfo">
                        <span style={{ color: "#333" }}>Status</span>
                        <h4 style={{ color: "#FFAE35" }}>Jarayonda</h4>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="viewMap">
              <Map
                center={cordinate}
                zoom={zoom}
                attributionControl={true}
                zoomControl={true}
                doubleClickZoom={true}
                scrollWheelZoom={true}
                dragging={true}
                animate={true}
                easeLinearity={0.35}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker
                  width={200}
                  position={[cordinate.lat, cordinate.lng]}
                  ref={this.refmarker}
                >
                  <Popup width={90}>
                    <span onClick={this.toggleDraggable}>
                      <h2>{name}</h2>
                    </span>
                  </Popup>
                </Marker>
              </Map>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default DetailLocations;
