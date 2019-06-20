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
                                <Input></Input>
                                <Label>BOX CODE</Label>
                                <Input></Input>
                                <Label>PASSCOED</Label>
                                <Input></Input>
                            </FormGroup>
                        </CardBody>
                        <CardFooter>
                            <Button color="primary">Save</Button>
                            <Button color="danger" style={{marginLeft: '10px'}}>TEST</Button>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
        </div>
    }
}