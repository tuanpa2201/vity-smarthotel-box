var Stomp = require('@stomp/stompjs');
const Setting = require('../setting');
const setting = new Setting();

module.exports = class StompClient {
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
            // debug: function (str) {
            //     console.log(str);
            // },
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
                    console.log("Control", res.body);
                });
                // this.client.publish({destination: `/horeca/device/${res.body}/reload`, body: JSON.stringify({ "username": `AKGR/H001`, "passcode": "123456" })})
            })
            this.client.publish({destination: '/horeca/device/authenticate', body: JSON.stringify({ "username": `${settingData.hotelCode}/${settingData.hubCode}`, "passcode": "123456" })})
        }

        this.client.onStompError =  (frame) => {
            // Will be invoked in case of error encountered at Broker
            // Bad login/passcode typically will cause an error
            // Complaint brokers will set `message` header with a brief message. Body may contain details.
            // Compliant brokers will terminate the connection after any error
            console.log('Broker reported error: ' + frame.headers['message']);
            console.log('Additional details: ' + frame.body);
        };
    }
}