import React, { Component } from "react";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import signInAction from "../../store/actions/auth/signInActions";
import {
  Button,
  Row,
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Alert,
} from "reactstrap";

import { FlexWrapper, Section } from "../../styles";
import { Message, Loader } from "../../components/UI";

import Img from "../../assets/img/sign-in.jpg";
import "./style.css";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      msg: null,
      success: true,
    };
  }

  inputHandler = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  formHandler = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (email && password) {
      await this.props.signInAction(this.state);
      const { error, msg } = this.props.auth;
      if (error) {
        this.setState({ msg });
      } else {
        this.props.history.push("/dashboard");
      }
    } else {
      this.setState({ msg: "Fill required fileds*" });
    }
  };

  render() {
    const { msg } = this.state;
    const { pending } = this.props.auth;
    console.log(this.state);

    return (
      <div
        id="sign-in"
        style={{ background: "#E5E5E5", backgroundRepeat: "no-repeat" }}
      >
        {/* {pending && <Loader />} */}
        <Container
          fluid={true}
          style={{ width: "100%", margin: "0", padding: "0" }}
        >
          <Alert color="danger">{msg}</Alert>
          <Row
            style={{
              minHeight: "100vh",
            }}
          >
            <Col className="d-none d-md-block d-lg-block" md="5" lg="4">
              <Section
                style={{
                  background: `url(${Img})`,
                }}
              ></Section>
            </Col>
            <Col className="d-block" sm="12" md="7" lg="8">
              <FlexWrapper style={{ minHeight: "100vh" }}>
                <div style={{ minWidth: "400px" }}>
                  <h2 id="h2">Тизимга кириш</h2>
                  <form action="" onSubmit={this.formHandler}>
                    <InputGroup className="inputGroup">
                      <Input
                        type="email"
                        name="email"
                        placeholder="Электрон почтани киритинг"
                        onChange={this.inputHandler}
                      />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>
                          <AiOutlineMail className="icon" />
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    <InputGroup className="inputGroup">
                      <Input
                        name="password"
                        type="password"
                        placeholder="Паролни киритинг"
                        onChange={this.inputHandler}
                      />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>
                          <AiOutlineLock className="icon" />
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                    <div
                      id="link"
                      className="inputGroup"
                      style={{
                        width: "100%",
                        letterSpacing: "1px",
                        fontSize: "14px",
                      }}
                    >
                      <div>
                        <input
                          onChange={this.inputHandler}
                          type="checkbox"
                          name="checkbox"
                          id="checkbox"
                        />
                        Эслаб қолиш
                      </div>
                      <div>
                        <Link to="/forgot">Паролингизни унутдингизми?</Link>
                      </div>
                    </div>
                    <div className="inputGroup">
                      <Button
                        color="primary"
                        style={{
                          width: "100%",
                          letterSpacing: "1px",
                          fontSize: "15px",
                        }}
                      >
                        Тизимга кириш
                      </Button>
                    </div>
                  </form>
                </div>
              </FlexWrapper>
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
  return bindActionCreators({ signInAction }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
