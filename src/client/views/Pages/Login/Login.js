import React, { Component } from 'react';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import md5 from 'md5';
import Cookies from 'js-cookie';
class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    }
  }
  onChange = (name) => (event) => {
    this.setState({[name] : event.target.value});
  }
  onClickLogin = () => {
    fetch(`/api/login/${this.state.username}/${md5(this.state.password)}`)
      .then(res => res.text())
      .then(res => {
        if (res == 'error') {
          alert("Wrong username/password");
        } else {
          Cookies.set("sessionId", res, { expires: 7 });
          this.props.history.push('/');
        }
      })
  }
  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" autoComplete="username" value={this.state.username} onChange={this.onChange("username")} />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password"  value={this.state.password} onChange={this.onChange("password")} />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4" onClick={this.onClickLogin.bind(this)}>Login</Button>
                        </Col>
                        {/* <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col> */}
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                {/* <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Button color="primary" className="mt-3" active>Register Now!</Button>
                    </div>
                  </CardBody>
                </Card> */}
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
