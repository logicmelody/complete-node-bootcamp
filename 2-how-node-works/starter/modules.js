// console.log(arguments);
// console.log(require('module').wrapper);

// module.exports
const C = require('./test-module-1');

const calc1 = new C();
console.log(calc1.add(2, 5));

// exports
// const calc2 = require('./test-module-2');
const { multiply } = require('./test-module-2');

console.log(multiply(2, 5));

// module.exports
const { divide } = require('./test-module-3');

console.log(divide(10, 2));

// Caching
require('./test-module-4')();
require('./test-module-4')();
require('./test-module-4')();
