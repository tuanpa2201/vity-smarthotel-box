const storage = require('node-persist');
var storageSession = storage.create({dir: './sessionDir'});
module.exports = class ItemManager {
    constructor() {
        this.initStorage
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