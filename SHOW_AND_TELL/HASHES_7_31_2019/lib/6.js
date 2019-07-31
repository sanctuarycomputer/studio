"use strict";
/*
Benchmarking Array vs. Object
*/
Object.defineProperty(exports, "__esModule", { value: true });
const SanctuHash_1 = require("./SanctuHash");
function main6() {
    const AMOUNT_OF_ITEMS = 100000;
    const BENCHMARK_ROUNDS = 10;
    const array = [];
    const sanctuHash = new SanctuHash_1.SanctuHashu();
    function setter(i, callback) {
        const value = `value for ${i}`;
        array[i] = { id: i, value: value };
        sanctuHash.set(i, { id: i, value: value });
        if (i >= AMOUNT_OF_ITEMS)
            return callback();
        if (i % 1000 === 0) {
            process.nextTick(setter, i + 1, work);
        }
        else {
            setter(i + 1, work);
        }
    }
    setter(0, work);
    function work() {
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
            const arrayBenchmarkDuration = (arrayBenchmarkEnd - arrayBenchmarkStart) / 1000;
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
            const sanctuHashBenchmarkDuration = (sanctuHashBenchmarkEnd - sanctuHashBenchmarkStart) / 1000;
            sanctuHashLookups[i + 1] = `${sanctuHashBenchmarkDuration.toFixed(2)} (${randomKey})`;
            sanctuHashTotal = sanctuHashTotal + sanctuHashBenchmarkDuration;
        }
        sanctuHashLookups["avg"] = `${(sanctuHashTotal / BENCHMARK_ROUNDS).toFixed(2)}ms`;
        const benchmarkTable = {
            array: arrayLookups,
            sanctuHash: sanctuHashLookups
        };
        console.table(benchmarkTable);
    }
}
main6();
