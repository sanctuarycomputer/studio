/*
Benchmarking Array vs. Object
*/

import { SanctuHashu } from "./SanctuHash";

function main6() {
  const AMOUNT_OF_ITEMS = 10000000;
  const BENCHMARK_ROUNDS = 10;

  const array = [];
  const sanctuHash = new SanctuHashu();
  for (let i = 0; i < AMOUNT_OF_ITEMS; i++) {
    const value = `value for ${i}`;
    array[i] = { id: i, value: value };
    sanctuHash.set(i, { id: i, value: value });
  }

  /*
    Lookup in Array
    */
  const arrayLookups = {};
  let arrayTotal = 0;
  for (let i = 0; i < BENCHMARK_ROUNDS; i++) {
    const arrayBenchmarkStart = process.hrtime()[1];

    const randomKey = Math.floor(Math.random() * AMOUNT_OF_ITEMS);
    const foundValue = array.find(item => item.id === randomKey);

    const arrayBenchmarkEnd = process.hrtime()[1];
    const arrayBenchmarkDuration =
      (arrayBenchmarkEnd - arrayBenchmarkStart) / 1000;
    arrayLookups[i + 1] = `${arrayBenchmarkDuration.toFixed(2)} (${randomKey})`;
    arrayTotal = arrayTotal + arrayBenchmarkDuration;
  }
  arrayLookups["avg"] = `${(arrayTotal / BENCHMARK_ROUNDS).toFixed(2)}ms`;

  /*
    Lookup in SanctuHashu
    */
  const sanctuHashLookups = {};
  let sanctuHashTotal = 0;
  for (let i = 0; i < BENCHMARK_ROUNDS; i++) {
    const sanctuHashBenchmarkStart = process.hrtime()[1];

    const randomKey = Math.floor(Math.random() * AMOUNT_OF_ITEMS);
    const foundValue = sanctuHash.get(randomKey);

    const sanctuHashBenchmarkEnd = process.hrtime()[1];
    const sanctuHashBenchmarkDuration =
      (sanctuHashBenchmarkEnd - sanctuHashBenchmarkStart) / 1000;
    sanctuHashLookups[i + 1] = `${sanctuHashBenchmarkDuration.toFixed(
      2
    )} (${randomKey})`;
    sanctuHashTotal = sanctuHashTotal + sanctuHashBenchmarkDuration;
  }
  sanctuHashLookups["avg"] = `${(sanctuHashTotal / BENCHMARK_ROUNDS).toFixed(
    2
  )}ms`;

  const benchmarkTable = {
    array: arrayLookups,
    sanctuHash: sanctuHashLookups
  };

  console.table(benchmarkTable);
}

main6();
