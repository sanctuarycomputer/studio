function hash(value: number | string): number {
  const stringified = String(value);

  let hash = 5381;
  let i = stringified.length;

  while (i) {
    hash = (hash * 33) ^ stringified.charCodeAt(--i);
  }

  return hash >>> 0;
}

export class SanctuHashu {
  store = [];

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

    if (keyValue === undefined) return undefined;

    if (keyValue !== undefined && keyValue[0] === key) return keyValue[1];

    return this._getKey(hash + 1, key);
  }
}
