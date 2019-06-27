const storage = require('node-persist');
class ItemManager {
    constructor() {
        this.initStorage;
        this.statusByName = {};
    }
    async initStorage() {
        await storage.init();
    }
    async getItems() {
        let items = await storage.getItem("Items");
        if (!items) {
            items = [];
            await storage.setItem("Items", items);
        }
        return items;
    }
    async getItemByName(name) {
        let items = await this.getItems();
        for (let i = 0; i < items.length; i++) {
            if (items[i].name == name) {
                return items[i];
            }
        }
        return undefined;
    }
    async getItemByChannel(channel) {
        let items = await this.getItems();
        for (let i = 0; i < items.length; i++) {
            if (items[i].channel == channel) {
                return items[i];
            }
        }
        return undefined;
    }

    async getItemByFeedbackGA(ga) {
        let items = await this.getItems();
        for (let i = 0; i < items.length; i++) {
            if (items[i].feedback_ga == ga) {
                return items[i];
            }
        }
        return undefined;
    }
    getItemStatusByName(name) {
        return this.statusByName[name];
    }
    async addOrUpdateItem(item) {
        let items = await this.getItems();
        let newItems = [];
        let isUpdate = false;
        for (let i = 0; i < items.length; i++) {
            if (items[i].name == item.name) {
                isUpdate = true;
                newItems.push(item);
            } else {
                newItems.push(items[i]);
            }
        }
        if (!isUpdate) {
            newItems.push(item);
        }
        items = newItems;
        await storage.setItem("Items", items);
        return items;
    }
    async deleteItem(item) {
        let items = await this.getItems();
        let newItems = [];
        for (let i = 0; i < items.length; i++) {
            if (items[i].name == item.name) {

            } else {
                newItems.push(items[i]);
            }
        }
        items = newItems;
        await storage.setItem("Items", items);
        return items;
    }
}

module.exports = new ItemManager();