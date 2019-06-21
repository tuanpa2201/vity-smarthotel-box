import React, { Component } from 'react';
import {
    Badge,
    Button,
    // ButtonDropdown,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    // Collapse,
    // DropdownItem,
    // DropdownMenu,
    // DropdownToggle,
    // Fade,
    Form,
    FormText,
    FormGroup,
    // FormText,
    // FormFeedback,
    Input,
    // InputGroup,
    // InputGroupAddon,
    // InputGroupText,
    Label,
    Row,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    ButtonDropdown,
    DropdownToggle,
    DropdownItem,
    DropdownMenu,
    Table,
    
  } from 'reactstrap';
import MD5 from 'md5'
module.exports = class ChangePassword extends Component {
    constructor() {
        super();
        this.state = {
            currentPass: '',
            newPass: '',
            reNewPass: ''
        }
    }
    onChange = (name) => (event) =>{
        this.setState({[name]: event.target.value});
    }
    onClickSave = () => {
        if (this.state.newPass != this.state.reNewPass) {
            alert("New password not match!");
            return;
        }
        fetch(`/api/changepass/admin/${MD5(this.state.currentPass)}/${MD5(this.state.newPass)}`, {method: 'POST'})
            .then(res => res.text())
            .then(resText => {
                if (resText == 'ok') {
                    alert("Password updated!");
                } else {
                    alert("ERROR");
                }
            })
    }
    render() {
        return <div className="animated fadeIn">
            <Row>
                <Col xs="12" sm="12">
                    <Card>
                        <CardHeader>
                            <h3>Change Password</h3>
                        </CardHeader>
                        <CardBody>
                            <FormGroup>
                                <Label>Current Password</Label>
                                <Input type="password" value={this.state.currentPass} onChange={this.onChange('currentPass')}></Input>
                                <Label>New Password</Label>
                                <Input  type="password" value={this.state.newPass} onChange={this.onChange('newPass')}></Input>
                                <Label>Re-type New Password</Label>
                                <Input  type="password" value={this.state.reNewPass} onChange={this.onChange('reNewPass')}></Input>
                                <FormText color="muted" hidden={this.state.newPass == this.state.reNewPass}>New pass not match!</FormText>
                            </FormGroup>
                        </CardBody>
                        <CardFooter>
                            <Button color="primary" onClick={this.onClickSave.bind(this)}>Save</Button>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        </div>
    }
}