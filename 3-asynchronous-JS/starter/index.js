const fs = require('fs');
const superagent = require('superagent');

function readFilePro(file) {
	return new Promise((resolve, reject) => {
		fs.readFile(file, (err, data) => {
			if (err) {
				reject('I could not find that file');

				return;
			}

			resolve(data)
		});
	});
}

function writeFilePro(file, data) {
	return new Promise((resolve, reject) => {
		fs.writeFile(file, data, err => {
			if (err) {
				reject('Could not write file');

				return;
			}

			resolve('Success');
		})
	});
}

async function getDogPic() {
	try {
		const data = await readFilePro(`${__dirname}/dog.txt`);
		console.log(`Breed: ${data}`);

		const res1Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
		const res2Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
		const res3Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

		const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
		const images = all.map(res => res.body.message)
		console.log(images);

		await writeFilePro('dog-img.txt', images.join('\n'));
		console.log('Random dog image saved to file');

	} catch (err) {
		console.log(err);

		throw err;
	}

	return '2: READY';
}

(async () => {
	console.log('1: Will get dog pics');

	try {
		const x = await getDogPic();

		console.log(x);
		console.log('3: Done getting dog pics');

	} catch (err) {
		console.log('ERROR');
	}

})();

/*
console.log('1: Will get dog pics');
getDogPic()
	.then(x => {
		console.log(x);
		console.log('3: Done getting dog pics');
	})
	.catch((err) => {
		console.log('ERROR');
	});
*/

/*
readFilePro(`${__dirname}/dog.txt`)
	.then(data => {
		console.log(`Breed: ${data}`);

		return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
	})
	.then(res => {
		console.log(res.body.message);

		return writeFilePro('dog-img.txt', res.body.message);
	})
	.then(() => {
		console.log('Random dog image saved to file');
	})
	.catch(err => {
		console.log(err);
	});
*/
