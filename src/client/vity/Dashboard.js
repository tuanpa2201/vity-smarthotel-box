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
  import { AppSwitch } from '@coreui/react'

module.exports = class DefaultLayout extends Component {
    constructor() {
        super();
        this.state = {
            isOpenDetail: false,
            selectedItemIndex: -1,
            items : [
                {
                    name: "Switch 01",
                    channel: "Switch 01",
                    command_ga: '0/0/1',
                    feedback_ga: '0/1/1',
                },
                {
                    name: "Switch 02",
                    channel: "Switch 02",
                    command_ga: '0/0/2',
                    feedback_ga: '0/1/2',
                },
                {
                    name: "Switch 03",
                    channel: "Switch 03",
                    command_ga: '0/0/3',
                    feedback_ga: '0/1/3',
                },
                {
                    name: "Switch 04",
                    channel: "Switch 04",
                    command_ga: '0/0/4',
                    feedback_ga: '0/1/4',
                }
            ]
        }
    }
    onEdit = (index) => () => {
        this.setState({selectedItemIndex: index});
        this.toggleOpenDetail();
    }

    onDelete = (index) => () => {
        if (confirm("Are you sure?")) {

        }
    }

    render() {
        let tableBody = [];
        for (let i = 0; i < this.state.items.length; i++) {
            let item = this.state.items[i];
            let row = <tr key={i}>
                <td>{item.name}</td>
                <td>{item.channel}</td>
                <td>{item.command_ga}</td>
                <td>{item.feedback_ga}</td>
                <td><AppSwitch className={'mx-1 switch-lg'} variant={'pill'} color={'success'} outline={'alt'} label checked /></td>
                <td><Button color="primary" onClick={this.onEdit(i)}>Edit</Button> <Button onClick={this.onDelete(i)} color="Danger">Delete</Button></td>
            </tr>
            tableBody.push(row);
        }

        return <div className="animated fadeIn">
            <Row>
                <Col xs="12" sm="12">
                    <Card>
                        <CardHeader>
                            <h2>All Items</h2>
                        </CardHeader>
                        <CardBody>
                            <Table bordered>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Channel</th>
                                        <th>Command GA</th>
                                        <th>Feedback GA</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableBody}
                                </tbody>
                            </Table>
                        </CardBody>
                        <CardFooter>
                            <Button color="primary" onClick={this.onClickAddItem.bind(this)}>Add Item</Button>
                        </CardFooter>
                    </Card>
                </Col>
            </Row>
            <Modal isOpen={this.state.isOpenDetail} centered={true}>
                <ModalHeader toggle={this.toggleOpenDetail.bind(this)}>Item</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label>Item Name</Label>
                        <Input value={this.state.selectedItemIndex > -1 ? this.state.items[this.state.selectedItemIndex].name: ''}></Input>
                        <Label>Channel</Label>
                        <Input value={this.state.selectedItemIndex > -1 ? this.state.items[this.state.selectedItemIndex].channel: ''}></Input>
                        <Label>Command Group Address</Label>
                        <Input value={this.state.selectedItemIndex > -1 ? this.state.items[this.state.selectedItemIndex].command_ga: ''}></Input>
                        <Label>Feedback Group Address</Label>
                        <Input value={this.state.selectedItemIndex > -1 ? this.state.items[this.state.selectedItemIndex].feedback_ga: ''}></Input>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="success">Save</Button>
                    <Button onClick={this.toggleOpenDetail.bind(this)}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    }
    onClickAddItem = () => {
        this.setState({selectedItemIndex: -1});
        this.toggleOpenDetail();
    }
    toggleOpenDetail() {
        let newState = {isOpenDetail: !this.state.isOpenDetail}
        this.setState(newState);
    }
}