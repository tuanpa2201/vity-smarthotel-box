const express = require('express');
const bodyParser = require("body-parser");
const os = require('os');

const app = express();
const Authen = require('./authen');

const authen = new Authen();

const Item = require('./item');
const ItemManager = new Item();

app.use(express.static('dist'));
app.use(bodyParser.json({ limit: "50mb" }));
app.listen(8080, () => console.log('Listening on port 8080!'));

app.get('/api/login/:username/:pass', (req, res) => {
    authen.login(req.params.username, req.params.pass)
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
    console.log(req.body);
    ItemManager.deleteItem(item)
        .then(items => res.send(items));
})
