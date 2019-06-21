const storage = require('node-persist');
var storageSession = storage.create({dir: './sessionDir'});
const md5 = require('md5');
const uuidv4 = require('uuid/v4');

module.exports = class Authen {
    constructor() {
        this.initStorage();
    }
    async initStorage() {
        await storage.init();
        await storageSession.init();
    }
    async login(username, pass) {
        let users = await storage.getItem("users");
        if (!users) {
            users = {
                admin: {
                    pass: md5("Vity@123"),
                    type: "admin"
                }
            };
            await storage.setItem("users", users);
        }
        if (users[username] && users[username].pass == pass) {
            // create session id
            let sessionId = uuidv4();
            await storageSession.setItem(sessionId, users[username].type, {ttl: 7 * 24 * 60 * 60 * 1000});
            return sessionId;
        } else {
            return "error";
        }
    }

    async changePassword(username, currentPass, newPass) {
        let users = await storage.getItem("users");
        if (!users) {
            users = {
                admin: {
                    pass: md5("Vity@123"),
                    type: "admin"
                }
            };
            await storage.setItem("users", users);
        }
        console.log(users[username].pass, currentPass, newPass, users[username].pass == currentPass);
        if (users[username] && (users[username].pass == currentPass)) {
            users[username].pass = newPass;
            await storage.setItem('users', users);
            return 'ok';
        } else {
            return "error";
        }
    }

    async validate(sessionId) {
        let type = storageSession.getItem(sessionId);
        if (!type) {
            return "invalid";
        } else {
            return type;
        }
    }
}