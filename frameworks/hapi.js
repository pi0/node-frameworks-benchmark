const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 3502, host: 'localhost' });

server.start((err) => {
	if (err) throw err;
	
	server.route({
		method: 'GET',
		path: '/',
		handler: function (request, reply) {
			reply('Hello World!');
		}
	});
	
    console.log(`Hapi Server running at: ${server.info.uri}`);
});
