const express = require('express');
const bodyParser = require("body-parser");
const os = require('os');

const app = express();
const Authen = require('./authen');

const authen = new Authen();

const Item = require('./item');
const ItemManager = new Item();

const KNXConnectorClass = require('./knxconnector');
const KNXConnector = new KNXConnectorClass(ItemManager);

app.use(express.static('dist'));
app.use(bodyParser.json({ limit: "50mb" }));
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
    ItemManager.getItems()
        .then(items => {
            res.send(items);
        })
})
app.put('/api/addItem', (req, res) => {
    let item = req.body;
    console.log(req.body);
    ItemManager.addOrUpdateItem(item)
        .then(items => res.send(items));
})

app.delete('/api/deleteItem', (req, res) => {
    let item = req.body;
    ItemManager.deleteItem(item)
        .then(items => res.send(items));
})

app.post('/api/control', (req, res) => {
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
})

app.get('/api/status/:itemName', (req, res) => {
    let item = req.params.itemName;
    if (item) {
        res.send(ItemManager.getItemStatusByName(item))
    }
});

app.get('/api/status', (req, res) => {
    res.send(ItemManager.statusByName);
})
