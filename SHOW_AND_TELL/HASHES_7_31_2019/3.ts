function goodHashFunction(str) {
  var hash = 5381,
    i = str.length;

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }

  return hash >>> 0;
}

const e = "testvalue";
const f = "testvalue";

const eHash = goodHashFunction(e);
const fHash = goodHashFunction(f);

console.log("e", e, "eHash", eHash);
console.log("f", f, "fHash", fHash);
console.log("eHash === fHash ?", eHash === fHash); // true

console.log("----------------");

const g = "testvalue";
const h = "testvaluf";

const gHash = goodHashFunction(g);
const hHash = goodHashFunction(h);

console.log("g", g, "gHash", gHash);
console.log("h", h, "hHash", hHash);
console.log("gHash === hHash ?", gHash === hHash); // false
