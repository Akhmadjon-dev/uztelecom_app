import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { UploadOutlined } from "@ant-design/icons";
import Axios from "axios";

import defaultImg from "../../assets/img/profile.jpg";
import "./style.css";

import {
  Tabs,
  Avatar,
  Select,
  Upload,
  message,
  Button,
  Card,
  Col,
  Row,
  Form,
  Input,
} from "antd";
import { bindActionCreators } from "redux";
import { UPDATE_AUTH } from "../../store/actionTypes";

const { TabPane } = Tabs;
const { Option } = Select;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tabPosition: "top" };
  }

  componentDidMount() {
    this.setState({ ...this.props.user });
  }

  formHandler = async (e) => {
    // e.preventDefault()
    const id = this.props.user._id;
    const data = this.state;
    Axios.post(`/users/${id}/edit`, data)
      .then((res) => {
        this.props.updateAuth(data);
      })
      .catch((err) => console.log(err));
  };

  render() {
    const {
      address,
      name,
      lastName,
      email,
      phone,
      company,
      locationType,
    } = this.state;
    const inputHandler = (e) => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
      console.log(this.state);
    };
    const selectHandler = (value, name) => {
      this.setState({ [name]: value });
    };

    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    const { type } = this.props.user;
    return (
      <div style={{ margin: "50px" }} className="site-card-wrapper">
        {/* {console.log(this.state)} */}
        <Row style={{ width: "100%", height: "100%" }} gutter={16}>
          <Col
            xs={24}
            sm={24}
            md={24}
            lg={6}
            style={{
              width: "20%",
              height: "100%",
              textAlign: "center",
            }}
          >
            <Card
              style={{
                borderRadius: "11px",
                minHeight: "382px",
                marginBottom: "10px",
              }}
            >
              <div style={{ width: "100%" }}>
                <Avatar
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    padding: "2px",
                  }}
                  src={defaultImg}
                />
              </div>
              <hr />
              <div>
                <h5>{name}</h5>
                <span>{company}</span>
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={18}>
            <Card style={{ width: "", borderRadius: "11px" }}>
              <Tabs defaultActiveKey="0" tabPosition={this.state.tabPosition}>
                <TabPane tab="Hisob" key="2">
                  <Form
                    {...layout}
                    layout="horizontal"
                    name="edit"
                    onFinish={this.formHandler}
                    onFinishFailed={onFinishFailed}
                  >
                    <Row gutter={16}>
                      <Col xs={24} sm={24} md={12} lg={12}>
                        <Form.Item
                          label="Name"
                          name="name"
                          initialValue={name}
                          rules={[
                            {
                              required: true,
                              message: "Please input your name!",
                              whitespace: true,
                            },
                          ]}
                        >
                          <Input name="name" onChange={inputHandler} />
                        </Form.Item>
                        <Form.Item
                          name="phone"
                          label="Phone"
                          initialValue={phone}
                          rules={[
                            {
                              required: true,
                              message: "Please input your name!",
                              whitespace: true,
                            },
                          ]}
                        >
                          <Input name="phone" onChange={inputHandler} />
                        </Form.Item>
                        <Form.Item
                          name="company"
                          initialValue={company}
                          label="Company"
                          rules={[
                            {
                              required: true,
                              message: "Please input your name!",
                              whitespace: true,
                            },
                          ]}
                        >
                          <Input name="company" onChange={inputHandler} />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={12} lg={12}>
                        <Form.Item
                          initialValue={lastName}
                          name="lastName"
                          label="Last name"
                          rules={[
                            {
                              required: true,
                              message: "Please input your last name!",
                              whitespace: true,
                            },
                          ]}
                        >
                          <Input name="lastName" onChange={inputHandler} />
                        </Form.Item>
                        <Form.Item
                          name="address"
                          label="Address"
                          initialValue={address}
                          rules={[
                            {
                              required: true,
                              message: "Please input your last name!",
                              whitespace: true,
                            },
                          ]}
                        >
                          <Input name="address" onChange={inputHandler} />
                        </Form.Item>
                        <Form.Item
                          initialValue={locationType}
                          label="Tuman"
                          rules={[
                            {
                              required: true,
                              message: "Please input your last name!",
                              whitespace: true,
                            },
                          ]}
                        >
                          <Select
                            name="locationType"
                            onChange={(e) => {
                              selectHandler(e, "locationType");
                            }}
                            disabled={type !== "admin" && true}
                            value={this.state.locationType}
                          >
                            <Option value="baxmal">Baxmal</Option>
                            <Option value="paxtakor">Paxtakor</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row style={{ justifyContent: "space-between" }}>
                      <Form.Item>
                        <Button type="primary" htmlType="submit">
                          Submit
                        </Button>
                      </Form.Item>
                      {type == "admin" && (
                        <Form.Item>
                          <Button
                            type="primary"
                            onClick={() =>
                              this.props.history.push("/users/add-user")
                            }
                          >
                            Add User
                          </Button>
                        </Form.Item>
                      )}
                    </Row>
                  </Form>
                </TabPane>
                <TabPane tab="Xavfsizlik" key="3">
                  <Form
                    {...layout}
                    layout="horizontal"
                    name="edit"
                    onFinish={this.formHandler}
                    onFinishFailed={onFinishFailed}
                  >
                    <Form.Item
                      label="Email"
                      name="email"
                      initialValue={email}
                      rules={[
                        {
                          message: "Please input your email!",
                        },
                      ]}
                    >
                      <Input name="email" onChange={inputHandler} />
                    </Form.Item>

                    <Form.Item
                      label="Password"
                      name="password"
                      rules={[
                        {
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input.Password name="password" onChange={inputHandler} />
                      <Button
                        style={{ marginTop: "30px" }}
                        type="primary"
                        htmlType="submit"
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ user: state.auth.user });
const mapDispatchToProps = (dispatch) => {
  return {
    updateAuth: (data) => dispatch({ type: UPDATE_AUTH, data }),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Profile));
