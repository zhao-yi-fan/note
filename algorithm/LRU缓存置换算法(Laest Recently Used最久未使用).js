class LRUCache {
  #length = 0;
  #map;
  constructor(len) {
    this.#map = new Map();
    this.#length = len;
  }
  has(key) {
    return this.#map.has(key);
  }
  get(key) {
    if (!this.has(key)) return null;
    const value = this.#map.get(key);
    this.#map.delete(key);
    this.#map.set(key, value);
    return value;
  }
  set(key, value) {
    if (this.has(key)) {
      this.#map.delete(key);
    }
    this.#map.set(key, value);
    if (this.#map.size > this.#length) {
      const firstKey = this.#map.keys().next().value;
      this.#map.delete(firstKey);
    }
    return this.#map;
  }
}

const lru = new LRUCache(2);
console.log(lru.set("aa", 111));
console.log(lru.set("aa", 222));
console.log(lru.set("bb", 222));
console.log(lru.get("aa"));
console.log(lru.set("cc", 333));
