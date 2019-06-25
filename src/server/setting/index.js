const storage = require('node-persist');
module.exports = class Setting {
    constructor() {
        this.initStorage;
    }
    async initStorage() {
        await storage.init();
    }
    async getSetting() {
        let setting = await storage.getItem("setting");
        if (!setting) {
            setting = {
                hotelCode: '',
                hubCode: '',
                passcode: ''
            }
            await storage.setItem("setting", setting);
        }
        return setting;
    }
    async setSetting(setting) {
        await storage.setItem("setting", setting);
        return setting;
    }
}