function badHashFunction(value: number | string) {
  return String(value).length;
}

const a = "testvalue";
const b = "testvalue";

const aHash = badHashFunction(a);
const bHash = badHashFunction(b);

console.log("a", a, "aHash", aHash); // 9
console.log("b", b, "bHash", bHash); // 9
console.log("aHash === bHash ?", aHash === bHash); // true

/*
Is there any way we can go from '9' back to 'testvalue'? No way! We've designed a one directional hash function.

BUT, what it doesn't do well is avoid collisions..
*/
console.log("----------------");

const c = "testvalue";
const d = "2419sbnde";

const cHash = badHashFunction(c);
const dHash = badHashFunction(d);

console.log("c", c, "cHash", cHash); // 9
console.log("d", d, "dHash", dHash); // 9
console.log("cHash === dHash ?", cHash === dHash); // true
