import { orderBy } from 'lodash';

class LocalStorageStore {

    constructor(key) {
        this.ls = window.localStorage;
        this.key = key;
        this.items = this._getItems();
    }

    get(id) {
        if (this.items[id]) {
            return this.items[id];
        }
        return null;
    }

    save(item) {
        this.items[item.id] = item;
        this._saveToStore();
    }

    selectList(label) {
        let itemList = [];
        let itemId;

        for (itemId in this.items) {
            itemList.push({ value: itemId, label: this.items[itemId][label] });
        }

        return orderBy(itemList, ['label'], ['asc']);
    }

    clear() {
        return this.ls.clear();
    }

    _getItems() {
        let items = this.ls.getItem(this.key);

        if (items) {
            return JSON.parse(items);
        }
        return {};
    }

    _saveToStore() {
        this.ls.setItem(this.key, JSON.stringify(this.items));
    }

}

export default LocalStorageStore;