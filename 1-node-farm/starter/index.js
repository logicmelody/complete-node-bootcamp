const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');

const replaceTemplate = require('./modules/replaceTemplate');

///////////////////////////////////////////////////
// FILES
///////////////////////////////////////////////////
// Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf-8');

// console.log(textIn);

// const textOut = `This is what we know about the avocado: ${textIn}.\nCreated on ${Date.now()}`;

// fs.writeFileSync('./txt/output.txt', textOut);

// console.log('File written');

// Non-blocking, asynchronous way
// fs.readFile('./txt/start.txt', 'utf-8', (error, data1) => {
// 	if (error) {
// 		console.log(error);

// 		return;
// 	}

// 	fs.readFile(`./txt/${data1}.txt`, 'utf-8', (error, data2) => {
// 		console.log(data2);

// 		fs.readFile('./txt/append.txt', 'utf-8', (error, data3) => {
// 			console.log(data3);

// 			fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', error => {
// 				console.log('Your file has been written');
// 			});
// 		});
// 	});
// });

// console.log('Will read file');

///////////////////////////////////////////////////
// SERVER
///////////////////////////////////////////////////
const templateOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const templateCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const templateProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObject = JSON.parse(data);

const slugs = dataObject.map(item => slugify(item.productName, { lower: true }));

console.log(slugs);

const server = http.createServer((req, res) => {
	const {
		query,
		pathname,
	} = url.parse(req.url, true);

	// Overview page
	if (pathname === '/' || pathname === '/overview') {
		res.writeHead(200, { 'Content-type': 'text/html' });

		const cardsHtml = dataObject.map(item => replaceTemplate(templateCard, item)).join('');
		const output = templateOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);

		res.end(output);

	// Product page
	} else if (pathname === '/product') {
		const product = dataObject[query.id];
		const output = replaceTemplate(templateProduct, product);

		res.writeHead(200, { 'Content-type': 'text/html' });
		res.end(output);

	// API
	} else if (pathname === '/api') {
		res.writeHead(200, { 'Content-type': 'application/json' });
		res.end(data);

	// Not found
	} else {
		res.writeHead(404, {
			'Content-type': 'text/html',
			'my-own-header': 'hello-world',
		});
		res.end('<h1>Page not found</h1>');
	}
});

server.listen(8000, '127.0.0.1', () => {
	console.log('Listening to requests on port 8000');
});
