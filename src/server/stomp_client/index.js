var Stomp = require('@stomp/stompjs');
const Setting = require('../setting');
const setting = new Setting();
const knxconnector = require('../knxconnector');
const ItemManager = require('../item');

class StompClient {
    connect() {
        Object.assign(global, { WebSocket: require('ws') });
        if (typeof TextEncoder !== 'function') {
            const TextEncodingPolyfill = require('text-encoding');
            let TextEncoder = TextEncodingPolyfill.TextEncoder;
            let TextDecoder = TextEncodingPolyfill.TextDecoder;
            Object.assign(global, { TextEncoder,  TextDecoder});
        }
        this.client = new Stomp.Client({
            brokerURL : "ws://vsolution.vn:8080/horeca-api/websocket",
            connectHeaders: {
                login: "guest",
                passcode: "passcode"
            },
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });
        this.client.activate();
        this.client.onConnect = async (frame) => {
            let settingData = await setting.getSetting();
            this.client.subscribe(`/device/${settingData.hotelCode}/${settingData.hubCode}/token`, (res) => {
                this.client.subscribe(`/device/${res.body}/reload`, (res) => {
                    
                    console.log("Reload config", res.body);
                });
                this.client.subscribe(`/device/${res.body}/control`, (res) => {
                    let data = JSON.parse(res.body);
                    ItemManager.getItemByChannel(data.id)
                    .then(item => {
                        if (!item) {
                            // res.send("Item not found")
                        } else {
                            startSceen(item, data);
                            // flutter(item.command_ga, 3000);
                        }
                    })
                });
                // this.client.publish({destination: `/horeca/device/${res.body}/reload`, body: JSON.stringify({ "username": `AKGR/H001`, "passcode": "123456" })})
            })
            this.client.publish({destination: '/horeca/device/authenticate', body: JSON.stringify({ "username": `${settingData.hotelCode}/${settingData.hubCode}`, "passcode": "123456" })})
        }

        // this.client.onWebSocketError = () => {
        //     console.log("Websocket error");
        //     this.client.deactivate();
        //     this.client.activate();
        // }

        // this.client.onStompError =  (frame) => {
        //     // Will be invoked in case of error encountered at Broker
        //     // Bad login/passcode typically will cause an error
        //     // Complaint brokers will set `message` header with a brief message. Body may contain details.
        //     // Compliant brokers will terminate the connection after any error
        //     console.log('Broker reported error: ' + frame.headers['message']);
        //     console.log('Additional details: ' + frame.body);
        //     this.client.deactivate();
        //     this.client.activate();
        // };
    }
}

const alertTimerMap = {};
const finishTimerMap = {};

function startSceen(item, data) {
    // if (data.alert < 0)
    //     return;
    console.log(data);
    knxconnector.setValue(item.command_ga, 1);

    if (data.alert > 0) {
        let timer = alertTimerMap[item.channel];
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            flutter(item.command_ga, 3000);
            // knxconnector.setValue(item.command_ga, 0);
            delete alertTimerMap[item.channel];
        }, data.alert);
        alertTimerMap[item.channel] = timer;
    }
    if (data.finish > 0) {
        let timer = finishTimerMap[item.channel];
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            knxconnector.setValue(item.command_ga, 0);
            delete finishTimerMap[item.channel];
        }, data.alert);
        finishTimerMap[item.channel] = timer;
    }
}

function flutter(ga, time) {
    let startTime = (new Date()).getMilliseconds();
    let value = 0;
    let timer = setInterval(() => {
        knxconnector.setValue(ga, value);
        if (value == 0) {
            value = 1;
        } else value = 0;
        let currentTime = (new Date()).getMilliseconds();
        if (currentTime - startTime > time) {
            clearInterval(timer);
            knxconnector.setValue(ga, 1);
        }
    }, 500);
    
}

module.exports = new StompClient();