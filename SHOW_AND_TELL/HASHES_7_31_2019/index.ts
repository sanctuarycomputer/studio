// const hash = (value: number | string): number => {
//   const asString = String(value);
//   let hash = 5381;
//   let i = asString.length;
//   while (i) hash = (hash * 33) ^ asString.charCodeAt(--i);
//   return hash >>> 0;
// };

const getHash = (value: number | string): number => {
  const asString = String(value);
  return asString.length;
};

class HashTable {
  store = [];

  set(key: string | number, value: any) {
    let hashedKey = getHash(key);
    this._setKey(hashedKey, key, value);
  }

  get(key: string) {
    const hashedKey = getHash(key);
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

    if (keyValue === undefined) return undefined;

    if (keyValue !== undefined && keyValue[0] === key) return keyValue[1];

    return this._getKey(hash + 1, key);
  }
}

// const d = new HashTable();
// d.set("firstkey", "one");
// d.set("ohgoshhh", "two");
// d.set("anotherone", "three");
// d.set("dearloar", "four");
// d.set("anothertwo", "five");
// console.log(d.get("firstkey"));
// console.log(d.get("ohgoshhh"));
// console.log(d.get("anotherone"));
// console.log(d.get("dearloar"));
// console.log(d.get("anothertwo"));
//
// console.log(d.store);
