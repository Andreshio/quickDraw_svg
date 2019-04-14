var fs = require('fs');
var data = JSON.parse(fs.readFileSync('./data/eye.json', 'utf8'));

const out = [];

for(let i = 0; i<5000; i++){
	const randomNumber = Math.floor(Math.random()*data.length)
	out.push(data[randomNumber]);
}

fs.writeFile('data/10000eyes.json', JSON.stringify(out), 'utf8', ()=>console.log("ended"));
console.log('lol terminou')