import React, { Component, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Axios from "axios";
import { Alert, Container } from "reactstrap";
import moment from "moment";

import { FlexWrapper } from "../../styles";
import { Message, Loader } from "../../components/UI";
import {
  Steps,
  Button,
  message,
  Input,
  Form,
  Select,
  Result,
  Checkbox,
  Row,
  Col,
  InputNumber,
} from "antd";
import { signUp } from "../../store/actions/auth";
import NameIcon from "../../assets/img/name-icon.png";
import {
  DesktopOutlined,
  PartitionOutlined,
  EnvironmentOutlined,
  CheckOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { Popup, TileLayer, Marker, Map } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./style.css";
L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.5.0/dist/images/";

const { Option } = Select;
const { Step } = Steps;

class LocationStep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      msg: null,
      region: "",
      name: "",
      address: "",
      loading: true,
      type: "",
      deadline: "",
      file: "",
      oldImg: "",
      air: "",
      ground: "",
      chanel: "",
      opticCabel: {
        total: "",
        unitType: "",
        isFinishedCabel: false,
        typeCabel: {
          air: {
            totalCabel: "",
            typeCabelDeadline: "",
            isCompleted: null,
            actualWork: "",
            numberTola: "",
          },
          chanel: {
            totalCabel: "",
            typeCabelDeadline: "",
            isCompleted: null,
            actualWork: "",
            numberTola: "",
          },
          ground: {
            totalCabel: "",
            typeCabelDeadline: "",
            isCompleted: null,
            actualWork: "",
            numberTola: "",
          },
        },
      },
      edit: true,
      device: {
        deviceType: "",
        isInstalled: "",
        deadline: "",
      },
      cordinate: {
        lat: 39.13533,
        lng: 67.822114,
      },
      isFinished: "",
      status: "",
      success: "",
      zoom: 10,
      draggable: true,
    };
    this.refmarker = React.createRef(<Marker></Marker>);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    Axios.get(`/locations/${id}`)
      .then((res) => {
        const data = res.data;
        const old = res.data.file;
        console.log(data, old);
        this.setState(data);
        this.setState({ oldImg: old });
        // this.setState({ opticCabel: data.opticCabel });
        console.log("update ----------------", this.state);
        this.setState({ loading: false });
      })
      .catch((err) => {
        console.log(err, "++++++++++++++++++++++++++++++");
      });
  }

  inputHandler = (e) => {
    const { value, name } = e.target;
    if (name === "deadline") {
      const val = new Date(value).getTime();
      console.log(val, "yeah----------- top");
      return this.setState({ [name]: val });
    }
    this.setState({ [name]: value });
    console.log(name, value);
  };
  selectHandler = (value, name) => {
    this.setState({ [name]: value });
  };

  nestedSelectValueHandler = (value, parentName, name) => {
    {
      value === "false" && (value = false);
    }
    {
      value === "true" && (value = true);
    }
    this.setState((prevState) => ({
      [parentName]: { ...prevState[parentName], [name]: value },
    }));
  };
  nestedValueHandler = (e, parentName, name) => {
    const { value } = e.target;
    if (name.includes("deadline")) {
      const val = new Date(value).getTime();
      console.log(val, "yeah----------- deep");
      return this.setState((prevState) => ({
        [parentName]: { ...prevState[parentName], [name]: val },
      }));
    }
    this.setState((prevState) => ({
      [parentName]: { ...prevState[parentName], [name]: value },
    }));
  };
  nestedValueHandlerNumber = (value, parentName, name) => {
    this.setState((prevState) => ({
      [parentName]: { ...prevState[parentName], [name]: value },
    }));
  };

  deepNestedSelectValueHandler = (value, parentName, name) => {
    {
      value === "false" && (value = false);
    }
    {
      value === "true" && (value = true);
    }
    this.setState((prevState) => ({
      opticCabel: {
        ...prevState.opticCabel,
        typeCabel: {
          ...prevState.opticCabel.typeCabel,
          [parentName]: {
            ...prevState.opticCabel.typeCabel[parentName],
            [name]: value,
          },
        },
      },
    }));
  };
  deepNestedValueHandler = (e, parentName) => {
    const { name, value } = e.target;
    if (name.includes("Deadline")) {
      const val = new Date(value).getTime();
      console.log(val, "yeah----------- top");
      return this.setState((prevState) => ({
        opticCabel: {
          ...prevState.opticCabel,
          typeCabel: {
            ...prevState.opticCabel.typeCabel,
            [parentName]: {
              ...prevState.opticCabel.typeCabel[parentName],
              [name]: val,
            },
          },
        },
      }));
    }
    this.setState((prevState) => ({
      opticCabel: {
        ...prevState.opticCabel,
        typeCabel: {
          ...prevState.opticCabel.typeCabel,
          [parentName]: {
            ...prevState.opticCabel.typeCabel[parentName],
            [name]: value,
          },
        },
      },
    }));
  };
  deepNestedValueHandlerNumber = (value, parentName, name) => {
    this.setState((prevState) => ({
      opticCabel: {
        ...prevState.opticCabel,
        typeCabel: {
          ...prevState.opticCabel.typeCabel,
          [parentName]: {
            ...prevState.opticCabel.typeCabel[parentName],
            [name]: value,
          },
        },
      },
    }));
  };

  checkboxHandler = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      console.log(checked, name);
      this.setState({ [name]: checked });
    } else {
      this.setState({ [name]: false });
      console.log(checked, name);
    }
  };

  onChangeFile = (e) => {
    this.setState({ file: e.target.files[0] });
  };

  formHandler = async (e) => {
    const {
      name,
      region,
      address,
      air,
      ground,
      chanel,
      type,
      deadline,
      opticCabel,
      device,
      cordinate,
      isFinished,
      edit,
      status,
      oldImg,
    } = this.state;

    // const { total, unitType, isFinishedCabel } = JSON.parse(req.body.opticCabel);
    // const { air, ground, chanel } = JSON.parse(req.body.opticCabel.typeCabel);
    const data = this.state;
    const { id } = this.props.match.params;
    let formData = new FormData();
    formData.append("name", name);
    formData.append("region", region);
    formData.append("address", address);
    formData.append("type", type);
    formData.append("air", air);
    formData.append("ground", ground);
    formData.append("chanel", chanel);
    formData.append("deadline", deadline);
    formData.append("opticCabel", JSON.stringify(opticCabel));
    formData.append("device", JSON.stringify(device));
    formData.append("cordinate", JSON.stringify(cordinate));
    formData.append("isFinished", isFinished);
    formData.append("edit", edit);
    formData.append("oldImg", oldImg);
    formData.append("file", this.state.file);
    console.log("...", ...formData);
    Axios.post(`/locations/${id}/edit`, formData)
      .then((res) => {
        console.log(res.data, "0------------0000");

        this.props.history.push(`/locations`);
      })
      .catch((err) => console.log(err));
  };

  next() {
    const current = this.state.current + 1;
    if (current == 1) {
      console.log(this.stepOneRef.click("clicked"));
      this.stepOneRef.click();
      this.setState({ current });
    } else if (current == 2) {
      this.setState({ current });
    } else if (current == 3) {
      this.setState({ current });
    } else {
      this.setState({ current });
    }
  }

  toggleDraggable = () => {
    this.setState({ draggable: !this.state.draggable });
  };
  updatePosition = () => {
    const marker = this.refmarker.current;
    if (marker != null) {
      this.setState({
        cordinate: marker.leafletElement.getLatLng(),
      });
      console.log(marker, this.cordinate, "0000000000000000");
    }
  };
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  LocationContent = () => {
    const { deadline, name, type, address, region } = this.state;
    return (
      <div>
        <h3 className="form-content-title">
          Tashkilot ma'lumotlarini kiriting
        </h3>
        <Form
          scrollToFirstError="true"
          name="fill-location"
          onFinish={this.formHandler}
          // onFinishFailed={onFinishFailed}
        >
          <Form.Item
            rules={[
              {
                message: "Please input your email!",
                required: true,
              },
            ]}
          >
            <p>Tumanni tanlang</p>
            <Select
              value={region}
              onChange={(value) => this.selectHandler(value, "region")}
            >
              <Option value="baxmal">Baxmal</Option>
              <Option value="paxtakor">Paxtakor</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <p>Tashkilot nomini kiriting</p>
            <Input
              value={name}
              name="name"
              onChange={this.inputHandler}
              suffix={<img src={NameIcon} alt="icon" />}
            />
          </Form.Item>
          <Form.Item>
            <p>Manzilni kiriting</p>
            <Input
              value={address}
              name="address"
              onChange={this.inputHandler}
              placeholder="Manzilni kiriting"
              suffix={<EnvironmentOutlined />}
            />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <p>Tashkilot turini tanlang</p>
            <Select
              value={type}
              onChange={(value) => this.selectHandler(value, "type")}
            >
              <Option value="maktabgacha talim">Maktabgacha ta'lim</Option>
              <Option value="orta talim">O'rta ta'lim</Option>
              <Option value="soliq">Soliq</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <p>Yakunlanish vaqtini kiriting</p>
            <Input
              name="deadline"
              value={moment(deadline).format("YYYY-MM-DD")}
              type="date"
              onChange={this.inputHandler}
            />
          </Form.Item>
          <Form.Item>
            <p>File tanlang</p>
            <span
              onClick={() => this.fileInput.click()}
              style={{
                width: "100%",
                height: "30px",
                cursor: "pointer",
                backgroundColor: "#fff",
                padding: "5px",
                borderRadius: "3px",
              }}
            >
              <input
                ref={(fileInput) => (this.fileInput = fileInput)}
                type="file"
                style={{ display: "none" }}
                onChange={this.onChangeFile}
              />
              <span
                style={{
                  borderRadius: "10px",
                  padding: "5px",
                }}
              >
                {this.state.oldImg == this.state.file
                  ? this.state.oldImg
                  : this.state.file.name}
              </span>
            </span>
          </Form.Item>

          <Button
            ref={(el) => (this.stepOneRef = el)}
            type="primary"
            style={{ display: "none" }}
            htmlType="submit"
          >
            Submit
          </Button>
        </Form>
      </div>
    );
  };
  DeviceContent = () => {
    const { device } = this.state;
    return (
      <div>
        <h3 className="form-content-title">Qurilma ma'lumotlarini kiriting</h3>
        <Form name="fill-device">
          <Form.Item>
            <p>Texnalogiyani kiriting</p>
            <Select
              value={device.deviceType}
              onChange={(value) =>
                this.nestedSelectValueHandler(value, "device", "deviceType")
              }
            >
              <Option value="gpon">GPON</Option>
              <Option value="fttb">FTTB</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <p>Qurilma o'rnatildimi</p>
            <Select
              value={device.isInstalled}
              onChange={(value) =>
                this.nestedSelectValueHandler(value, "device", "isInstalled")
              }
            >
              <Option value="true">Ha</Option>
              <Option value="false">Yo'q</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <p>Tugallanish muddati</p>
            <Input
              value={moment(device.deadline).format("YYYY-MM-DD")}
              type="date"
              onChange={(e) => this.nestedValueHandler(e, "device", "deadline")}
            />
          </Form.Item>
        </Form>
      </div>
    );
  };

  CabelContent = () => {
    const { air, ground, chanel, opticCabel } = this.state;
    return (
      <div>
        <h3 className="form-content-title">Kabel ma'lumotlarini kiriting</h3>
        <Form name="fill-cabel" layout="inline">
          <Row style={{ width: "100%" }}>
            <Col xs={24} sm={12} md={12} lg={5}>
              <Form.Item className="input-cabel">
                <p>Umumiy miqdor</p>
                <InputNumber
                  className="inputNumber"
                  value={opticCabel.total}
                  onChange={(e) =>
                    this.nestedValueHandlerNumber(e, "opticCabel", "total")
                  }
                  suffix={<img src={NameIcon} alt="icon" />}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={12} lg={5}>
              <Form.Item>
                <p>O'lchovni tanlang</p>
                <Select
                  value={opticCabel.unitType}
                  onChange={(value) =>
                    this.nestedSelectValueHandler(
                      value,
                      "opticCabel",
                      "unitType"
                    )
                  }
                >
                  <Option value="km">Km</Option>
                  <Option value="m">Metr</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={6} md={12} lg={3}>
              <p style={{ margin: "0px auto", marginTop: "20px" }}>
                Kabel turi:
              </p>
            </Col>
            <Col xs={24} sm={18} md={12} lg={11}>
              <Form.Item>
                <Checkbox
                  name="ground"
                  defaultChecked={ground}
                  onChange={this.checkboxHandler}
                >
                  Ground
                </Checkbox>
                <Checkbox
                  name="air"
                  defaultChecked={air}
                  onChange={this.checkboxHandler}
                >
                  Air
                </Checkbox>

                <Checkbox
                  name="chanel"
                  defaultChecked={chanel}
                  onChange={this.checkboxHandler}
                >
                  Chanel
                </Checkbox>
              </Form.Item>
            </Col>
          </Row>
          <Row style={{ width: "100%" }}>
            <Col className="column-type" sm={24} md={12} lg={8}>
              {ground && (
                <div className="cabel dataCabel" style={{ textAlign: "left " }}>
                  <p className="custom-label-input label-three">
                    Yer osti турли кабель маълумотлари
                  </p>
                  <Form.Item>
                    <p>Umumiy</p>
                    <InputNumber
                      className="inputNumber"
                      value={opticCabel.typeCabel.ground.totalCabel}
                      min={0}
                      max={opticCabel.total}
                      onChange={(e) =>
                        this.deepNestedValueHandlerNumber(
                          e,
                          "ground",
                          "totalCabel"
                        )
                      }
                    />
                  </Form.Item>
                  <Form.Item>
                    <p>Tola soni</p>
                    <Input
                      type="number"
                      name="numberTola"
                      value={opticCabel.typeCabel.ground.numberTola}
                      onChange={(e) =>
                        this.deepNestedValueHandler(e, "ground", "numberTola")
                      }
                    />
                  </Form.Item>
                  <Form.Item>
                    <p>Tugallandimi?</p>
                    <Select
                      disabled={
                        opticCabel.typeCabel.ground.totalCabel > 0
                          ? false
                          : true
                      }
                      defaultValue={opticCabel.typeCabel.ground.isCompleted}
                      onChange={(e) =>
                        this.deepNestedSelectValueHandler(
                          e,
                          "ground",
                          "isCompleted"
                        )
                      }
                    >
                      <option value="false">Йўқ</option>
                      <option value="true">Ҳа</option>/.
                    </Select>
                  </Form.Item>

                  <Form.Item>
                    <p>Qanchalik bajarilgan</p>
                    <InputNumber
                      className="inputNumber"
                      value={opticCabel.typeCabel.ground.actualWork}
                      min={0}
                      max={opticCabel.typeCabel.ground.totalCabel}
                      onChange={(e) =>
                        this.deepNestedValueHandlerNumber(
                          e,
                          "ground",
                          "actualWork"
                        )
                      }
                    />
                  </Form.Item>
                  <Form.Item>
                    <p>Tugash muddati</p>
                    <Input
                      name="typeCabelDeadline"
                      value={moment(
                        opticCabel.typeCabel.ground.typeCabelDeadline
                      ).format("YYYY-MM-DD")}
                      type="date"
                      onChange={(e) =>
                        this.deepNestedValueHandler(
                          e,
                          "ground",
                          "typeCabelDeadline"
                        )
                      }
                    />
                  </Form.Item>
                </div>
              )}
            </Col>
            <Col className="column-type" sm={24} md={12} lg={8}>
              {air && (
                <div className="cabel dataCabel">
                  <p className="custom-label-input  label-three">
                    Havo турли кабель маълумотлари
                  </p>
                  <Form.Item>
                    <p>Umumiy</p>
                    <InputNumber
                      className="inputNumber"
                      value={opticCabel.typeCabel.air.totalCabel}
                      max={opticCabel.total}
                      onChange={(e) =>
                        this.deepNestedValueHandlerNumber(
                          e,
                          "air",
                          "totalCabel"
                        )
                      }
                    />
                  </Form.Item>
                  <Form.Item>
                    <p>Tola soni</p>
                    <Input
                      type="number"
                      name="numberTola"
                      value={opticCabel.typeCabel.air.numberTola}
                      onChange={(e) =>
                        this.deepNestedValueHandler(e, "air", "numberTola")
                      }
                    />
                  </Form.Item>
                  <Form.Item>
                    <p>Tugallandimi?</p>
                    <Select
                      disabled={
                        opticCabel.typeCabel.air.totalCabel > 0 ? false : true
                      }
                      defaultValue={opticCabel.typeCabel.air.isCompleted}
                      onChange={(e) =>
                        this.deepNestedSelectValueHandler(
                          e,
                          "air",
                          "isCompleted"
                        )
                      }
                    >
                      <option value="false">Йўқ</option>
                      <option value="true">Ҳа</option>/.
                    </Select>
                  </Form.Item>
                  <Form.Item>
                    <p>Qanchalik bajarilgan</p>
                    <InputNumber
                      className="inputNumber"
                      value={opticCabel.typeCabel.air.actualWork}
                      max={opticCabel.typeCabel.air.totalCabel}
                      onChange={(e) =>
                        this.deepNestedValueHandlerNumber(
                          e,
                          "air",
                          "actualWork"
                        )
                      }
                    />
                  </Form.Item>
                  <Form.Item>
                    <p>Tugallanish muddati</p>
                    <Input
                      value={moment(
                        opticCabel.typeCabel.air.typeCabelDeadline
                      ).format("YYYY-MM-DD")}
                      type="date"
                      onChange={(e) =>
                        this.deepNestedValueHandler(
                          e,
                          "air",
                          "typeCabelDeadline"
                        )
                      }
                    />
                  </Form.Item>
                </div>
              )}
            </Col>

            <Col className="column-type" sm={24} md={24} lg={8}>
              {chanel && (
                <div className="cabel dataCabel">
                  <p className="custom-label-input  label-three">
                    Chanel турли кабель маълумотлари
                  </p>
                  <Form.Item>
                    <p>Umumiy</p>
                    <InputNumber
                      value={opticCabel.typeCabel.chanel.totalCabel}
                      max={opticCabel.total}
                      onChange={(e) =>
                        this.deepNestedValueHandlerNumber(
                          e,
                          "chanel",
                          "totalCabel"
                        )
                      }
                    />
                  </Form.Item>
                  <Form.Item>
                    <p>Tola soni</p>
                    <Input
                      type="number"
                      value={opticCabel.typeCabel.chanel.numberTola}
                      onChange={(e) =>
                        this.deepNestedValueHandler(e, "chanel", "numberTola")
                      }
                    />
                  </Form.Item>
                  <Form.Item>
                    <p>Tugallandimi?</p>
                    <Select
                      disabled={
                        opticCabel.typeCabel.chanel.totalCabel > 0
                          ? false
                          : true
                      }
                      name="isCompleted"
                      defaultValue={opticCabel.typeCabel.chanel.isCompleted}
                      onChange={(e) =>
                        this.deepNestedSelectValueHandler(
                          e,
                          "chanel",
                          "isCompleted"
                        )
                      }
                    >
                      <option value="false">Йўқ</option>
                      <option value="true">Ҳа</option>/.
                    </Select>
                  </Form.Item>
                  <Form.Item>
                    <p>Qanchalik bajarilgan</p>
                    <InputNumber
                      value={opticCabel.typeCabel.chanel.actualWork}
                      max={opticCabel.typeCabel.chanel.totalCabel}
                      onChange={(e) =>
                        this.deepNestedValueHandlerNumber(
                          e,
                          "chanel",
                          "actualWork"
                        )
                      }
                    />
                  </Form.Item>
                  <Form.Item>
                    <p>Tugallanish muddati</p>
                    <Input
                      value={moment(
                        opticCabel.typeCabel.chanel.typeCabelDeadline
                      ).format("YYYY-MM-DD")}
                      type="date"
                      onChange={(e) =>
                        this.deepNestedValueHandler(
                          e,
                          "chanel",
                          "typeCabelDeadline"
                        )
                      }
                    />
                  </Form.Item>
                </div>
              )}
            </Col>
          </Row>
        </Form>
      </div>
    );
  };
  SubmitFormContent = () => {
    const { cordinate, zoom } = this.state;
    return (
      <>
        <Result
          className="result-content"
          status="success"
          title="Ma'lumotlar muvaffaqiyatli to'ldirildi!"
          subTitle="Xarita ma'lumotlarini to'ldiring"
          extra={[
            <Form name="submit-all" layout="horizontal">
              <Form.Item>
                <p>Longitude</p>
                <Input
                  type="number"
                  name="lng"
                  step={0.1}
                  value={cordinate.lng}
                  onChange={(e) =>
                    this.nestedValueHandler(e, "cordinate", "lng")
                  }
                  suffix={<img src={NameIcon} alt="icon" />}
                />
              </Form.Item>
              <Form.Item>
                <p>Latititude</p>
                <Input
                  type="number"
                  step={0.1}
                  name="lat"
                  value={cordinate.lat}
                  onChange={(e) =>
                    this.nestedValueHandler(e, "cordinate", "lat")
                  }
                  suffix={<img src={NameIcon} alt="icon" />}
                />
              </Form.Item>
            </Form>,
          ]}
        />

        <div className="map" style={{ height: "50vh", width: "100%" }}>
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
              draggable={this.state.draggable}
              ondragend={this.updatePosition}
              width={200}
              position={[cordinate.lat, cordinate.lng]}
              ref={this.refmarker}
            >
              <Popup width={90}>
                <span onClick={this.toggleDraggable}>
                  {this.state.draggable ? (
                    <h2>Bu yerda tashkilot nomi chiqadi</h2>
                  ) : (
                    <h2>...</h2>
                  )}
                </span>
              </Popup>
            </Marker>
          </Map>
        </div>
      </>
    );
  };

  render() {
    const { pending } = this.props.auth;
    const {
      msg,
      air,
      ground,
      chanel,
      opticCabel,
      device,
      cordinate,
      current,
      region,
      type,
      address,
      name,
      deadline,
    } = this.state;
    console.log(this.state);
    const steps = [
      {
        id: 1,
        content: this.LocationContent(),
        icon: <EnvironmentOutlined />,
      },
      {
        id: 2,
        content: this.CabelContent(),
        icon: <PartitionOutlined />,
      },
      {
        id: 3,
        content: this.DeviceContent(),
        icon: <DesktopOutlined />,
      },
      {
        id: 4,
        content: this.SubmitFormContent(),
        icon: <CheckOutlined />,
      },
    ];

    return (
      <div id="location">
        {this.state.loading ? (
          <Loader />
        ) : (
          <Container
            fluid={true}
            style={{
              width: "100%",
              margin: "0",
              padding: "0",
              marginTop: "10px",
              backgroundColor: "#fff",
            }}
          >
            <Alert color="danger">{msg}</Alert>
            <FlexWrapper>
              <div
                style={{
                  width: "85%",
                }}
              >
                <h2 style={{ textAlign: "left", fontSize: "25px" }}>
                  Tashkilotni ro'yxatdan o'tkazish
                </h2>
                <Steps current={current}>
                  {steps.map((item) => (
                    <Step key={item.id} title="" icon={item.icon} />
                  ))}
                </Steps>
                <div className="steps-content">{steps[current].content}</div>
                <div className="steps-action">
                  {current > 0 && (
                    <Button
                      style={{ margin: "0 8px" }}
                      onClick={() => this.prev()}
                    >
                      Previous
                    </Button>
                  )}
                  {current === steps.length - 1 &&
                  (cordinate.lat, cordinate.lng) ? (
                    <Button
                      type="primary"
                      onClick={() => {
                        message.success("Processing complete!");
                        this.formHandler();
                      }}
                    >
                      Done
                    </Button>
                  ) : null}

                  {current === 0 && (name, region, address, type, deadline) ? (
                    <Button type="primary" onClick={() => this.next()}>
                      Next
                    </Button>
                  ) : (
                    <Button
                      style={{ display: "none" }}
                      type="primary"
                      onClick={() => this.next()}
                    >
                      Next
                    </Button>
                  )}

                  {current === 1 &&
                  (opticCabel.total,
                  opticCabel.unitType,
                  typeof opticCabel.typeCabel.ground.isCompleted ===
                    "boolean" ||
                    typeof opticCabel.typeCabel.air.isCompleted === "boolean" ||
                    typeof opticCabel.typeCabel.chanel.isCompleted ===
                      "boolean") ? (
                    <Button type="primary" onClick={() => this.next()}>
                      Next
                    </Button>
                  ) : (
                    <Button
                      style={{ display: "none" }}
                      type="primary"
                      onClick={() => this.next()}
                    >
                      Next
                    </Button>
                  )}
                  {current === 2 &&
                  (device.deviceType, device.isInstalled, device.deadline) ? (
                    <Button type="primary" onClick={() => this.next()}>
                      Next
                    </Button>
                  ) : (
                    <Button
                      style={{ display: "none" }}
                      type="primary"
                      onClick={() => this.next()}
                    >
                      Next
                    </Button>
                  )}
                </div>
              </div>
            </FlexWrapper>
          </Container>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.auth };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ signUp }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationStep);
