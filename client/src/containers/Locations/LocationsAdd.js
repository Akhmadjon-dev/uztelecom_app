import React, { Component, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Axios from "axios";
import { Alert, Container } from "reactstrap";

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
  Upload,
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
  FileAddOutlined,
  UploadOutlined,
  UserOutlined,
  PaperClipOutlined,
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
      type: "",
      deadline: 0,
      air: false,
      ground: true,
      chanel: false,
      file: null,
      opticCabel: {
        total: "",
        unitType: "",
        isFinishedCabel: false,
        typeCabel: {
          air: {
            totalCabel: "",
            typeCabelDeadline: 0,
            isCompleted: null,
            actualWork: 0,
            numberTola: 0,
          },
          chanel: {
            totalCabel: "",
            typeCabelDeadline: 0,
            isCompleted: null,
            actualWork: 0,
            numberTola: 0,
          },
          ground: {
            totalCabel: "",
            typeCabelDeadline: 0,
            isCompleted: null,
            actualWork: 0,
            numberTola: 0,
          },
        },
      },
      loading: true,
      device: {
        deviceType: "",
        isInstalled: false,
        deadline: 0,
      },
      edit: false,
      cordinate: {
        lat: 39.13533,
        lng: 67.822114,
      },
      isFinished: false,
      status: "",
      success: true,
      zoom: 10,
      draggable: true,
    };
    this.refmarker = React.createRef(<Marker></Marker>);
  }
  componentDidMount() {
    this.setState({ loading: false });
  }
  inputHandler = (e) => {
    const { value, name } = e.target;
    if (name === "deadline") {
      const val = new Date(value).getTime();
      return this.setState({ [name]: val });
    }
    this.setState({ [name]: value });
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
    console.log(value, parentName, name);
    this.setState((prevState) => ({
      [parentName]: { ...prevState[parentName], [name]: value },
    }));
  };

  nestedValueHandler = (e, parentName, name) => {
    const { value } = e.target;
    if (name.includes("deadline")) {
      const val = new Date(value).getTime();
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
    let { name, value } = e.target;

    if (name.includes("Deadline")) {
      const val = new Date(value).getTime();
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
      this.setState({ [name]: checked });
    } else {
      this.setState({ [name]: false });
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
      file,
    } = this.state;

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
    formData.append("file", this.state.file);
    const data = this.state;
    console.log(formData, data, "{{{{{{{{{{{{{{");
    Axios.post(`/locations`, formData)
      .then((res) => {
        this.props.history.push(`/locations`);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
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
      console.log(marker, this.position, "0000000000000000");
    }
  };

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }
  LocationContent = () => {
    const { name, region, address, type, deadline, file } = this.state;
    return (
      <div>
        <h3 className="form-content-title">
          Joylashuv ma'lumotlarini kiriting
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
              defaultValue={region}
              onChange={(value) => this.selectHandler(value, "region")}
            >
              <Option value="baxmal">Baxmal</Option>
              <Option value="paxtakor">Paxtakor</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <p>Tashkilot nomini kiriting</p>
            <Input
              name="name"
              defaultValue={name}
              onChange={this.inputHandler}
              suffix={<img src={NameIcon} alt="icon" />}
            />
          </Form.Item>
          <Form.Item
            name="address"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <p>Manzilni kiriting</p>
            <Input
              name="address"
              defaultValue={address}
              onChange={this.inputHandler}
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
              defaultValue={type}
              onChange={(value) => this.selectHandler(value, "type")}
            >
              <Option value="maktabgacha talim">Maktabgacha ta'lim</Option>
              <Option value="orta talim">O'rta ta'lim</Option>
              <Option value="soliq">Soliq</Option>
            </Select>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Please input your deadline!",
              },
            ]}
          >
            <p>Yakunlanish vaqtini kiriting</p>
            <Input
              name="deadline"
              defaultValue={deadline}
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
                height: "40px",
                cursor: "pointer",
                backgroundColor: "#fff",
                padding: "5px",
                borderRadius: "3px",
                minWidth: "120px",
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
                  minWidth: "120px",
                }}
              >
                {this.state.file ? this.state.file.name : <PaperClipOutlined />}
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
            <p>Texnalogiyani tanlang</p>
            <Select
              defaultValue={device.deviceType}
              onChange={(value) =>
                this.nestedSelectValueHandler(value, "device", "deviceType")
              }
            >
              <Option value="gpon">GPON</Option>
              <Option value="fttb">FTTB</Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <p>Qurilma o'rnatildimi?</p>
            <Select
              defaultValue={device.isInstalled}
              onChange={(value) =>
                this.nestedSelectValueHandler(value, "device", "isInstalled")
              }
            >
              <Option value="true">Ha</Option>
              <Option value="false">Yo'q</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <p>Yakunlanish vaqtini kiriting</p>
            <Input
              name="deadline"
              defaultValue={device.deadline}
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
              <Form.Item className="input-cabel" name="total">
                <p>Umumiy miqdor</p>
                <InputNumber
                  defaultValue={opticCabel.total}
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
                  defaultValue={opticCabel.unitType}
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
              <p style={{ margin: "0px auto", marginTop: "5px" }}>
                Kabel turi:
              </p>
            </Col>
            <Col xs={24} sm={18} md={12} lg={11}>
              <Form.Item>
                <Checkbox
                  name="ground"
                  defaultChecked="true"
                  onChange={this.checkboxHandler}
                >
                  Ground
                </Checkbox>
                <Checkbox
                  name="air"
                  defaultChecked=""
                  onChange={this.checkboxHandler}
                >
                  Air
                </Checkbox>

                <Checkbox
                  name="chanel"
                  defaultChecked=""
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
                <div className="cabel dataCabel">
                  <p className="custom-label-input label-three">
                    Yer osti турли кабель маълумотлари
                  </p>
                  <Form.Item>
                    <p>Umumiy</p>
                    <InputNumber
                      defaultValue={opticCabel.typeCabel.ground.totalCabel}
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
                    <InputNumber
                      defaultValue={opticCabel.typeCabel.ground.numberTola}
                      onChange={(e) =>
                        this.deepNestedValueHandlerNumber(
                          e,
                          "ground",
                          "numberTola"
                        )
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
                      defaultValue={opticCabel.typeCabel.ground.actualWork}
                      name="actualWork"
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
                  <Form.Item name="typeCabelDeadline">
                    <p>Tugallanish muddati</p>
                    <Input
                      defaultValue={
                        opticCabel.typeCabel.ground.typeCabelDeadline
                      }
                      name="typeCabelDeadline"
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
                      defaultValue={opticCabel.typeCabel.air.totalCabel}
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
                    <InputNumber
                      defaultValue={opticCabel.typeCabel.air.numberTola}
                      onChange={(e) =>
                        this.deepNestedValueHandlerNumber(
                          e,
                          "air",
                          "numberTola"
                        )
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
                      max={opticCabel.typeCabel.air.totalCabel}
                      defaultValue={opticCabel.typeCabel.air.actualWork}
                      onChange={(e) =>
                        this.deepNestedValueHandlerNumber(
                          e,
                          "air",
                          "actualWork"
                        )
                      }
                    />
                  </Form.Item>
                  <Form.Item name="typeCabelDeadline">
                    <p>Tugallanish muddati</p>
                    <Input
                      defaultValue={opticCabel.typeCabel.air.typeCabelDeadline}
                      type="date"
                      name="typeCabelDeadline"
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
                      defaultValue={opticCabel.typeCabel.chanel.totalCabel}
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
                    <InputNumber
                      defaultValue={opticCabel.typeCabel.chanel.numberTola}
                      onChange={(e) =>
                        this.deepNestedValueHandlerNumber(
                          e,
                          "chanel",
                          "numberTola"
                        )
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
                      defaultValue={opticCabel.typeCabel.chanel.actualWork}
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
                  <Form.Item name="typeCabelDeadline">
                    <p>Tugallanish muddati</p>
                    <Input
                      defaultValue={
                        opticCabel.typeCabel.chanel.typeCabelDeadline
                      }
                      type="date"
                      name="typeCabelDeadline"
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
              <Form.Item name="long">
                <p>Longititude</p>
                <Input
                  type="number"
                  name="lng"
                  value={cordinate.lng}
                  onChange={(e) =>
                    this.nestedValueHandler(e, "cordinate", "lng")
                  }
                  suffix={<img src={NameIcon} alt="icon" />}
                />
              </Form.Item>
              <Form.Item name="lat">
                <p>Latititude</p>
                <Input
                  type="number"
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
            {/* <Alert color="danger">{msg}</Alert> */}
            <FlexWrapper>
              <div
                style={{
                  width: "85%",
                }}
              >
                <h2
                  style={{
                    textAlign: "left",
                    fontSize: "25px",
                    marginTop: "20px",
                  }}
                >
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
                  ((opticCabel.total &&
                    opticCabel.unitType &&
                    typeof opticCabel.typeCabel.ground.isCompleted ===
                      "boolean") ||
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
