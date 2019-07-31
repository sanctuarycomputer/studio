function main4() {
    function hash(value) {
        return String(value).length;
    }
    class SanctuHash {
        constructor() {
            this.store = [];
        }
        set(key, value) {
            let hashedKey = hash(key);
            this.store[hashedKey] = value;
        }
        get(key) {
            const hashedKey = hash(key);
            return this.store[hashedKey];
        }
    }
    const hashTable = new SanctuHash();
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
}
main4();
