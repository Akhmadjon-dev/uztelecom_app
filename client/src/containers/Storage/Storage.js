import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Axios from "axios";
import { Button, Modal, Form, Input, InputNumber } from "antd";
import "./style.css";
import { ReactComponent as CabelIcon } from "../../assets/img/cabel-icon.svg";
import { ReactComponent as CabelNeed } from "../../assets/img/cabel-need-icon.svg";
import { ReactComponent as DeviceNeed } from "../../assets/img/device-need-icon.svg";
import { ReactComponent as DeviceIcon } from "../../assets/img/device-icon.svg";
import { ReactComponent as EditBtn } from "../../assets/img/editbtn.svg";
import Loader from "../../components/UI/Loader";
class Storage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loading: true,
      data: [
        {
          cabel: 0,
          device: 0,
          person: {
            name: "",
            phone: "",
          },
          needCabel: 0,
          needDevice: 0,
        },
      ],
    };
  }

  componentDidMount() {
    Axios.get("/storage").then((res) => {
      const data = res.data;
      this.setState({ data, loading: false });
      console.log(this.state, "-------++++++++++++-----");
    });
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
    console.log(this.state.data[0]);
  };

  handleOk = (e, id) => {
    const { data } = this.state;
    console.log(data);
    Axios.post(`/storage/${id}/edit`, data[0])
      .then((res) => {
        this.setState({
          visible: false,
        });
      })
      .catch((err) => console.log(err));
  };

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  };
  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  inputHandler = (e, name) => {
    if (name === "name" || name === "phone") {
      const { value } = e.target;
      this.setState((prevState) => ({
        data: [
          {
            ...prevState.data[0],
            person: {
              ...prevState.data[0].person,
              [name]: value,
            },
          },
        ],
      }));
      console.log(value);
    } else {
      this.setState((prevState) => ({
        data: [{ ...prevState.data[0], [name]: e }],
      }));
    }

    console.log(this.state.data[0], e, name);
  };
  render() {
    const { cabel, needCabel, device, person, needDevice } = this.state.data[0];
    const { type } = this.props.user;
    return (
      <>
        {this.state.loading ? (
          <Loader />
        ) : (
          <div className="storage">
            {type == "admin" && (
              <div style={{ textAlign: "right" }}>
                <Button
                  className="edit-btn "
                  type="primary"
                  onClick={this.showModal}
                >
                  <EditBtn /> Edit
                </Button>
              </div>
            )}
            <div className="storage-container">
              <div className="person">
                <h4>Ma'sul shaxs</h4>
                <img
                  src="https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425__340.png"
                  alt="storage-person"
                />
                <h4> {person.name} </h4>
                <p> {person.phone} </p>
              </div>
              <div className="left-container">
                <div className="card-container">
                  <div className="storage-card">
                    <div className="svg-container cabelctr">
                      <CabelIcon className="svg-storage" />
                    </div>
                    <h3>
                      {" "}
                      {cabel} <span>km</span>
                    </h3>
                    <p>Mavjud kabel</p>
                  </div>
                  <div className="storage-card">
                    <div className="svg-container cabelNeed">
                      <CabelNeed className="svg-storage" />
                    </div>
                    <h3>
                      {" "}
                      {needCabel} <span>km</span>
                    </h3>
                    <p>Kerak kabel</p>
                  </div>
                  <div className="storage-card">
                    <div className="svg-container device ">
                      <DeviceIcon className="svg-storage" />
                    </div>
                    <h3>
                      {" "}
                      {device} <span>ta</span>
                    </h3>
                    <p>Mavjud kabel</p>
                  </div>
                  <div className="storage-card">
                    <div className="svg-container deviceNeed">
                      <DeviceNeed className="svg-storage" />
                    </div>
                    <h3>
                      {" "}
                      {needDevice} <span>ta</span>
                    </h3>
                    <p>Mavjud kabel</p>
                  </div>
                </div>
              </div>
              <>
                <Modal
                  title="Ma'lumotlarni tahrirlash"
                  visible={this.state.visible}
                  onOk={(e) => this.handleOk(e, this.state.data[0]._id)}
                  onCancel={this.handleCancel}
                >
                  <Form
                    name="basic"
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={this.handleOk}
                    onFinishFailed={this.onFinishFailed}
                  >
                    <Form.Item
                      label="Kabel"
                      name="cabel"
                      initialValue={cabel}
                      rules={[
                        {
                          required: true,
                          message: "Please input cabel!",
                        },
                      ]}
                    >
                      <InputNumber
                        onChange={(e) => this.inputHandler(e, "cabel")}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Qurilmalar"
                      name="device"
                      initialValue={device}
                      rules={[
                        {
                          required: true,
                          message: "Please input your device!",
                        },
                      ]}
                    >
                      <InputNumber
                        onChange={(e) => this.inputHandler(e, "device")}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Kerakli qurilma"
                      name="needDevice"
                      initialValue={needDevice}
                      rules={[
                        {
                          required: true,
                          message: "Please input your needDevice!",
                        },
                      ]}
                    >
                      <InputNumber
                        onChange={(e) => this.inputHandler(e, "needDevice")}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Kerakli kabel"
                      name="needCabel"
                      initialValue={needCabel}
                      rules={[
                        {
                          required: true,
                          message: "Please input your needCabel!",
                        },
                      ]}
                    >
                      <InputNumber
                        onChange={(e) => this.inputHandler(e, "needCabel")}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Ma'sul shaxs ismi"
                      name="name"
                      initialValue={person.name}
                      rules={[
                        {
                          required: true,
                          message: "Please input your name!",
                        },
                      ]}
                    >
                      <Input onChange={(e) => this.inputHandler(e, "name")} />
                    </Form.Item>
                    <Form.Item
                      label="Ma'sul shaxs telefoni"
                      name="phone"
                      initialValue={person.phone}
                      rules={[
                        {
                          required: true,
                          message: "Please input your phone!",
                        },
                      ]}
                    >
                      <InputNumber
                        onChange={(e) => this.inputHandler(e, "phone")}
                      />
                    </Form.Item>
                  </Form>
                </Modal>
              </>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({ user: state.auth.user });
export default connect(mapStateToProps)(Storage);
