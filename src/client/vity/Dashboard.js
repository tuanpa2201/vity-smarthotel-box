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

module.exports = class Dashboard extends Component {
    constructor() {
        super();
        this.newItem ={
            name: '',
            channel: '',
            command_ga: '',
            feedback_ga: ''
        }
        this.state = {
            isOpenDetail: false,
            editItem: this.newItem,
            items : [],
            itemsStatus: {},
            channels: [],
            channelMap : {}
        }
        this.loadItems();
        this.loadChannels();
    }
    loadChannels() {
        fetch('/api/channels')
            .then(res => res.json())
            .then((data) => {
                
                let channelMap = {};
                if (data.channels) {
                    for (let i = 0; i < data.channels.length; i++)
                        channelMap[data.channels[i].id] = data.channels[i].name;
                }
                this.setState({channels: data.channels, channelMap});
            })
        
    }
    loadItemsStatus() {
        fetch('/api/status')
            .then(res => res.json())
            .then((res) => {
                // console.log(res);
                this.setState({itemsStatus: res});
            })
    }
    loadItems() {
        fetch("/api/getItems")
            .then(res => res.json())
            .then(items => {
                // console.log(items);
                this.setState({items: items});
            })
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.loadItemsStatus();
        }, 1000)
    }

    componentWillUnmount() {
        window.clearInterval(this.timer);
    }

    onEdit = (index) => () => {
        this.setState({editItem: this.state.items[index]});
        this.toggleOpenDetail();
    }

    onDelete = (index) => () => {
        if (confirm("Are you sure?")) {
            fetch('/api/deleteItem', {
                method: 'DELETE',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(this.state.items[index])
                })
                .then(res => res.json())
                .then(items => {
                    this.setState({items, isOpenDetail: false, editItem: this.newItem});
                })
        }
    }

    toggleItemStatus = (index) => () => {
        console.log("Toggle", index);
        fetch('/api/control', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({itemName: this.state.items[index].name, value: this.state.itemsStatus[this.state.items[index].name] == 'ON' ? "OFF" : 'ON'})
        })
        .then((res) => res.text())
        .then((res) => {
            console.log(res);
        })
    }

    render() {
        let tableBody = [];
        for (let i = 0; i < this.state.items.length; i++) {
            let item = this.state.items[i];
            let checkedProp = {};
            if (this.state.itemsStatus[item.name] == 'ON') {
                checkedProp.checked = true;
            }
            let row = <tr key={i}>
                <td>{item.name}</td>
                <td>{this.state.channelMap[item.channel]}</td>
                <td>{item.command_ga}</td>
                <td>{item.feedback_ga}</td>
                <td>
                    <AppSwitch className={'mx-1 switch-lg'} variant={'pill'} color={'success'} outline={'alt'} label onClick={this.toggleItemStatus(i)} {...checkedProp}/>
                </td>
                <td><Button color="primary" onClick={this.onEdit(i)}>Edit</Button> <Button onClick={this.onDelete(i)} color="Danger">Delete</Button></td>
            </tr>
            tableBody.push(row);
        }
        let channelsComponent = [];
        let option = <option value={''} key={-1}>Select Channel</option>
        channelsComponent.push(option);
        for (let i = 0; i < this.state.channels.length; i++) {
            let option = <option value={this.state.channels[i].id} key={i}>{this.state.channels[i].name}</option>
            channelsComponent.push(option);
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
                        <Input value={this.state.editItem.name} onChange={this.onChangeItem("name")}></Input>
                        <Label>Channel</Label>
                        {/* <Input value={this.state.editItem.channel} onChange={this.onChangeItem("channel")}></Input> */}
                        <Input type="select" value={this.state.editItem.channel} onChange={this.onChangeItem("channel")}>
                            {channelsComponent}
                        </Input>
                        <Label>Command Group Address</Label>
                        <Input value={this.state.editItem.command_ga} onChange={this.onChangeItem("command_ga")}></Input>
                        <Label>Feedback Group Address</Label>
                        <Input value={this.state.editItem.feedback_ga} onChange={this.onChangeItem("feedback_ga")}></Input>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={this.onClickSave.bind(this)}>Save</Button>
                    <Button onClick={this.toggleOpenDetail.bind(this)}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    }
    onClickSave = () => {
        fetch('/api/addItem', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(this.state.editItem)
            })
            .then(res => res.json())
            .then(items => {
                this.setState({items, isOpenDetail: false, editItem: this.newItem});
            })
    }
    onChangeItem = (name) => (event) =>{
        let editItem = this.state.editItem;
        editItem[name] = event.target.value;
        this.setState({editItem});
    }
    onClickAddItem = () => {
        this.setState({editItem: Object.assign({}, this.newItem)});
        this.toggleOpenDetail();
    }
    toggleOpenDetail() {
        let newState = {isOpenDetail: !this.state.isOpenDetail}
        this.setState(newState);
    }
}