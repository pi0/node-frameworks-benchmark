const apiBenchmark = require('api-benchmark');
const fs = require('fs');
const spawn = require('child_process').spawn
const fork = require('child_process').fork
const open = require('open');

fork('frameworks/express');
fork('frameworks/hapi');

const services = [
	{name: 'hapi',url: "http://localhost:3502"},
	{name: 'express',url: "http://localhost:3501"},
];

const routes = { 
	helloWorld: '/',
	notFound: '/err',
};

const options = {
	runMode: "parallel",
	minSamples: 500,	
};

function bench(service){
	return new Promise((resolve,reject)=> {
	
		console.log("Benchmarking " + service.name);
		let s={};
		s[service.name]=service.url;
		
		apiBenchmark.measure(s, routes, options, (err, results)=> {
			apiBenchmark.getHtml(results, (err2, html)=> {
				let file='report/' + service.name + '.html';
				fs.writeFileSync(file,html);
				open(file);
				resolve();
			});
		});	
	});
}

function next(){
	if(services.length===0) {
		console.log("Benchmarks done!");
		setTimeout(()=>{process.exit(0)},3000);
		return;
	}
	bench(services.pop()).then(next);
}

setTimeout(next,1000);