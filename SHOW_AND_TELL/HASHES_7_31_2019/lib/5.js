"use strict";
/* Bad */
Object.defineProperty(exports, "__esModule", { value: true });
function hash(value) {
    return String(value).length;
}
/* Good */
// function hash(value: number | string): number {
//   const stringified = String(value);
//
//   let hash = 5381;
//   let i = stringified.length;
//
//   while (i) {
//     hash = (hash * 33) ^ stringified.charCodeAt(--i);
//   }
//
//   return hash >>> 0;
// }
class SanctuHashu {
    constructor() {
        this.store = [];
    }
    set(key, value) {
        let hashedKey = hash(key);
        this._setKey(hashedKey, key, value);
    }
    get(key) {
        const hashedKey = hash(key);
        return this._getKey(hashedKey, key);
    }
    _setKey(hash, key, value) {
        const existingKeyValue = this.store[hash];
        if (existingKeyValue === undefined) {
            this.store[hash] = [key, value];
            return;
        }
        if (existingKeyValue !== undefined && existingKeyValue[0] === key) {
            this.store[hash] = [key, value];
            return;
        }
        return this._setKey(hash + 1, key, value);
    }
    _getKey(hash, key) {
        const keyValue = this.store[hash];
        if (keyValue === undefined)
            return undefined;
        if (keyValue !== undefined && keyValue[0] === key)
            return keyValue[1];
        return this._getKey(hash + 1, key);
    }
}
exports.SanctuHashu = SanctuHashu;
const hashTable = new SanctuHashu();
hashTable.set("firstkey", "one");
hashTable.set("secondkey", "two");
hashTable.set("key3", "three");
hashTable.set("fourthkey", "four");
hashTable.set("key5", "five");
console.log("missingkey", hashTable.get("missingkey"));
console.log("firstkey", hashTable.get("firstkey"));
console.log("secondkey", hashTable.get("secondkey"));
console.log("key3", hashTable.get("key3"));
console.log("fourthkey", hashTable.get("fourthkey"));
console.log("key5", hashTable.get("five"));
console.log(hashTable.store);
