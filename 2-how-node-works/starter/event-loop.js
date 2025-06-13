const fs = require('fs');
const crypto = require('crypto');

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 4;

setTimeout(() => console.log('Timer 1 finished'), 0);
setImmediate(() => console.log('Immediate 1 finished'));

fs.readFile('./test-file.txt', 'utf-8', () => {
	console.log('I/O finished');
	console.log('-------------------');

	setTimeout(() => console.log('Timer 2 finished'), 0);
	setTimeout(() => console.log('Timer 3 finished'), 3000);
	setImmediate(() => console.log('Immediate 2 finished'));

	process.nextTick(() => console.log('Process.nextTick'));

	crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
		console.log(Date.now() - start, 'Password encrypted')
	});
	crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
		console.log(Date.now() - start, 'Password encrypted')
	});
	crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
		console.log(Date.now() - start, 'Password encrypted')
	});
	crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
		console.log(Date.now() - start, 'Password encrypted')
	});
	crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
		console.log(Date.now() - start, 'Password encrypted')
	});
});

console.log('Hello from the top-level code');

// Hello from the top-level code
// Timer 1 finished
// Immediate 1 finished
// I/O finished
// -------------------
// Process.nextTick
// Immediate 2 finished
// Timer 2 finished
// 1652 'Password encrypted'
// 1661 'Password encrypted'
// 1707 'Password encrypted'
// 1715 'Password encrypted'
// 3047 'Password encrypted'
// Timer 3 finished
