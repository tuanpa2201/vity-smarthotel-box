const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const os = require('os');

const app = express();
const Authen = require('./authen');

const authen = new Authen();

const ItemManager = require('./item');
// const ItemManager = new Item();

const KNXConnector = require('./knxconnector');
// const KNXConnector = new KNXConnectorClass(ItemManager);

const stompClient = require('./stomp_client');
// const stompClient = new StompClient();
stompClient.connect();

const Setting = require('./setting');
const setting = new Setting();
const request = require('request');

app.use(express.static('dist'));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());

app.listen(8080, () => console.log('Listening on port 8080!'));

app.get('/api/login/:username/:pass', (req, res) => {
    authen.login(req.params.username, req.params.pass)
        .then((value) => {
            res.send(value);
        })
});

app.post('/api/changepass/:username/:currentpass/:newpass', (req, res) => {
    authen.changePassword(req.params.username, req.params.currentpass, req.params.newpass)
        .then((value) => {
            res.send(value);
        })
});

app.get('/api/validate/:sessionId', (req, res) => {
    authen.validate(req.params.sessionId)
        .then((value) => {
            res.send(value);
        })
})

app.get('/api/getItems', (req, res) => {
    authen.validate(req.cookies.sessionId)
        .then((type) => {
            if (type == 'invalid') {
                res.send("session_invalide");
            } else {
                ItemManager.getItems()
                .then(items => {
                    res.send(items);
                })
            }
        })
})
app.put('/api/addItem', (req, res) => {
    authen.validate(req.cookies.sessionId)
        .then((type) => {
            if (type == 'invalid') {
                res.send("session_invalide");
            } else {
                let item = req.body;
                ItemManager.addOrUpdateItem(item)
                    .then(items => res.send(items));
            }
        });
    
})

app.delete('/api/deleteItem', (req, res) => {
    authen.validate(req.cookies.sessionId)
        .then((type) => {
            if (type == 'invalid') {
                res.send("session_invalide");
            } else {
                let item = req.body;
                ItemManager.deleteItem(item)
                    .then(items => res.send(items));
            }
        });
})

app.post('/api/control', (req, res) => {
    authen.validate(req.cookies.sessionId)
        .then((type) => {
            if (type == 'invalid') {
                res.send("session_invalide");
            } else {
                let data = req.body;
                ItemManager.getItemByName(data.itemName)
                    .then(item => {
                        if (!item) {
                            res.send("Item not found")
                        } else {
                            KNXConnector.setValue(item.command_ga, data.value == 'ON' ? 1 : 0);
                            res.send("OK");
                        }
                    })
            }
        });
    
})

app.get('/api/status/:itemName', (req, res) => {
    authen.validate(req.cookies.sessionId)
        .then((type) => {
            if (type == 'invalid') {
                res.send("session_invalide");
            } else {
                let item = req.params.itemName;
                if (item) {
                    res.send(ItemManager.getItemStatusByName(item))
                }
            }
        });
});

app.get('/api/status', (req, res) => {
    authen.validate(req.cookies.sessionId)
    .then((type) => {
        if (type == 'invalid') {
            res.send("session_invalide");
        } else {
            res.send(ItemManager.statusByName);
        }
    });
    
})
app.get('/api/setting', (req, res) => {
    authen.validate(req.cookies.sessionId)
    .then((type) => {
        if (type == 'invalid') {
            res.send("session_invalide");
        } else {
            setting.getSetting()
            .then((value) => {
                res.send(value);
            })
        }
    });
    
})
app.post('/api/setting/update', (req, res) => {
    authen.validate(req.cookies.sessionId)
    .then((type) => {
        if (type == 'invalid') {
            res.send("session_invalide");
        } else {
            let data = req.body;
            setting.setSetting(data)
                .then((value) => {
                    res.send(value);
                })
        }
    });
})

app.get('/api/channels', (req, res) => {
    authen.validate(req.cookies.sessionId)
    .then((type) => {
        if (type == 'invalid') {
            res.send("session_invalide");
        } else {
            setting.getSetting()
            .then((value) => {
                var options = { method: 'POST',
                url: 'http://vsolution.vn:8080/horeca-api/api/device/notoken/reload',
                headers: 
                {
                    Host: 'vsolution.vn:8080',
                    Accept: '*/*',
                    'Content-Type': 'application/json' },
                body: { username: `${value.hotelCode}/${value.hubCode}`, passcode: value.passcode },
                json: true };

                request(options, function (error, response, body) {
                if (error) throw new Error(error);
                    res.send(body);
                });
            })
        }
    });
})