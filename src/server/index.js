const express = require('express');
const os = require('os');

const app = express();
const Authen = require('./authen');

const authen = new Authen();

const md5 = require('md5')
// authen.login("admin", md5("Vity@123"))
//     .then(value => {
//         console.log(value);
//     })
app.use(express.static('dist'));

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
