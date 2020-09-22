import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Axios from "axios";
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlinePhone,
  AiOutlineEnvironment,
  AiOutlineBuild,
} from "react-icons/ai";
import {
  Alert,
  Button,
  Row,
  Col,
  Container,
  Input,
  Form,
  FormGroup,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "reactstrap";

import { FlexWrapper, Section } from "../../styles";
import { Loader } from "../../components/UI";

import Img from "../../assets/img/sign-in.jpg";
import "./style.css";

import { signUp } from "../../store/actions/auth";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      email: "",
      msg: null,
      name: "",
      password: "",
      phone: "",
      company: "",
      locationType: "",
      success: true,
      type: "",
    };
  }

  inputHandler = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  formHandler = async (e) => {
    e.preventDefault();
    const { name, email, password, phone, type } = this.state;
    if (name && email && password && phone && type) {
      const data = this.state;
      Axios.post(`/users/add-user`, data)
        .then((res) => {
          if (res.data.success) {
            this.props.history.push("/profile");
            console.log(res.data.admin, "done");
          } else {
            console.log(res.data.msg, "error");
            this.setState({ msg: res.data.msg });
          }
        })
        .catch((err) => console.log(err));
    } else {
      this.setState({ msg: "Ma'lumotlarni to'ldiring" });
    }
  };

  render() {
    const { pending } = this.props.auth;
    const { msg } = this.state;
    console.log(this.state);

    return (
      <div id="sign-up">
        {/* {pending && <Loader />} */}

        <Container
          fluid={true}
          style={{ width: "100%", margin: "0", padding: "0" }}
        >
          <Row
            style={{
              minHeight: "100vh",
            }}
          >
            <Col className="d-block leftSide" sm="12" md="7" lg="8">
              <FlexWrapper>
                <div>
                  <h2>Янги фойдаланувчи қўшиш</h2>
                  <Form action="" onSubmit={this.formHandler}>
                    <Row>
                      <Col xs={12} sm={6} md={6} lg={6}>
                        <FormGroup>
                          <InputGroup className="inputGroup">
                            <Input
                              type="name"
                              name="name"
                              id="name"
                              placeholder="Исмни киритинг"
                              onChange={this.inputHandler}
                            />
                            <InputGroupAddon addonType="append">
                              <InputGroupText>
                                <AiOutlineUser className="icon" />
                              </InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col xs={12} sm={6} md={6} lg={6}>
                        <FormGroup>
                          <InputGroup className="inputGroup">
                            <Input
                              type="name"
                              name="lastName"
                              id="lastName"
                              placeholder="Фамилияни киритинг"
                              onChange={this.inputHandler}
                            />
                            <InputGroupAddon addonType="append">
                              <InputGroupText>
                                <AiOutlineUser className="icon" />
                              </InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup>
                      <InputGroup className="inputGroup">
                        <Input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Электрон почта киритинг"
                          onChange={this.inputHandler}
                        />
                        <InputGroupAddon addonType="append">
                          <InputGroupText>
                            <AiOutlineMail className="icon" />
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="inputGroup">
                        <Input
                          type="password"
                          name="password"
                          id="password"
                          placeholder="Паролни киритинг"
                          onChange={this.inputHandler}
                        />
                        <InputGroupAddon addonType="append">
                          <InputGroupText>
                            <AiOutlineLock className="icon" />
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </FormGroup>
                    <Row>
                      <Col xs={12} sm={6} md={6} lg={6}>
                        <FormGroup>
                          <InputGroup className="inputGroup">
                            <Input
                              type="text"
                              name="company"
                              id="company"
                              placeholder="Ташкилот номи"
                              onChange={this.inputHandler}
                            />
                            <InputGroupAddon addonType="append">
                              <InputGroupText>
                                <AiOutlineBuild className="icon" />
                              </InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormGroup>
                      </Col>
                      <Col xs={12} sm={6} md={6} lg={6}>
                        <FormGroup>
                          <InputGroup className="inputGroup">
                            <Input
                              type="tel"
                              name="phone"
                              id="phone"
                              placeholder="Телефон номер"
                              onChange={this.inputHandler}
                            />
                            <InputGroupAddon addonType="append">
                              <InputGroupText>
                                <AiOutlinePhone className="icon" />
                              </InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
                        </FormGroup>
                      </Col>
                    </Row>
                    <FormGroup>
                      <Input
                        onChange={this.inputHandler}
                        value={this.state.locationType}
                        type="select"
                        name="locationType"
                      >
                        <option selected="selected" value="">
                          Туманни танланг
                        </option>
                        <option value="jizzax">Жиззах</option>
                        <option value="baxmal">Бахмал</option>
                        <option value="gallaorol">Ғаллаорол</option>
                        <option value="paxtakor">Пахтакор</option>
                        <option value="zafarobod">Зафаробод</option>
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Input
                        onChange={this.inputHandler}
                        value={this.state.type}
                        type="select"
                        name="type"
                      >
                        <option selected="selected" value="">
                          Фойдаланувчи турини танланг
                        </option>
                        <option value="user">User</option>
                        <option value="leader">Leader</option>
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <InputGroup className="inputGroup">
                        <Input
                          type="text"
                          name="address"
                          id="address"
                          placeholder="Манзил киритинг"
                          onChange={this.inputHandler}
                        />
                        <InputGroupAddon addonType="append">
                          <InputGroupText>
                            <AiOutlineEnvironment className="icon" />
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                    </FormGroup>
                    <div>
                      <Button
                        style={{
                          width: "100%",
                          fontSize: "15px",
                          marginBottom: "10px",
                          letterSpacing: "1px",
                        }}
                        color="primary"
                      >
                        Рўйхатдан ўтказиш
                      </Button>
                    </div>
                  </Form>
                </div>
              </FlexWrapper>
              {this.state.msg && <Alert color="danger">{msg}</Alert>}
            </Col>

            <Col className="d-none d-md-block d-lg-block" md="5" lg="4">
              <Section
                style={{
                  background: `url(${Img})`,
                }}
              ></Section>
            </Col>
          </Row>
        </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
