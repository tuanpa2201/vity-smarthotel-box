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
module.exports = class Setting extends Component {
    constructor() {
        super();
        this.state = {
            data: {
                hotelCode: '',
                hubCode: '',
                passcode: '',
            }
        }
        this.loadData();
    }

    loadData() {
        fetch('/api/setting')
            .then(res => res.json())
            .then(data => {
                this.setState({data});
            })
    }

    onChange = (name) => (event) => {
        let data = this.state.data;
        data[name] = event.target.value;
        this.setState({data});
    }

    onSave = () => {
        fetch('/api/setting/update', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state.data)
            })
            .then(res => res.json())
            .then((data) => {
                this.setState({data});
            })
    }
    render() {
        return <div className="animated fadeIn">
            <Row>
                <Col xs="12" sm="12">
                    <Card>
                        <CardHeader>
                            <h3>Setting box</h3>
                        </CardHeader>
                        <CardBody>
                            <FormGroup>
                                <Label>HOTEL CODE</Label>
                                <Input value={this.state.data.hotelCode} onChange={this.onChange("hotelCode")}></Input>
                                <Label>HUB CODE</Label>
                                <Input value={this.state.data.hubCode} onChange={this.onChange("hubCode")}></Input>
                                <Label >PASSCODE</Label>
                                <Input value={this.state.data.passcode} onChange={this.onChange("passcode")}></Input>
                            </FormGroup>
                        </CardBody>
                        <CardFooter>
                            <Button color="primary" onClick={this.onSave.bind(this)}>Save</Button>
                            <Button color="danger" style={{marginLeft: '10px'}}>TEST</Button>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        </div>
    }
}