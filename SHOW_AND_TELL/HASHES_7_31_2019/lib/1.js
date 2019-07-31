/*
Benchmarking Array vs. Object
*/
function main1() {
    const AMOUNT_OF_ITEMS = 100000;
    const BENCHMARK_ROUNDS = 10;
    const array = [];
    const object = {};
    for (let i = 0; i < AMOUNT_OF_ITEMS; i++) {
        const value = `value for ${i}`;
        array[i] = { id: i, value: value };
        object[i] = { id: i, value: value };
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
        const arrayBenchmarkDuration = (arrayBenchmarkEnd - arrayBenchmarkStart) / 1000;
        arrayLookups[i + 1] = `${arrayBenchmarkDuration.toFixed(2)} (${randomKey})`;
        arrayTotal = arrayTotal + arrayBenchmarkDuration;
    }
    arrayLookups["avg"] = `${(arrayTotal / BENCHMARK_ROUNDS).toFixed(2)}ms`;
    /*
    Lookup in Object
    */
    const objectLookups = {};
    let objectTotal = 0;
    for (let i = 0; i < BENCHMARK_ROUNDS; i++) {
        const objectBenchmarkStart = process.hrtime()[1];
        const randomKey = Math.floor(Math.random() * AMOUNT_OF_ITEMS);
        const foundValue = object[randomKey];
        const objectBenchmarkEnd = process.hrtime()[1];
        const objectBenchmarkDuration = (objectBenchmarkEnd - objectBenchmarkStart) / 1000;
        objectLookups[i + 1] = `${objectBenchmarkDuration.toFixed(2)} (${randomKey})`;
        objectTotal = objectTotal + objectBenchmarkDuration;
    }
    objectLookups["avg"] = `${(objectTotal / BENCHMARK_ROUNDS).toFixed(2)}ms`;
    const benchmarkTable = {
        array: arrayLookups,
        object: objectLookups
    };
    console.table(benchmarkTable);
}
main1();
