const Hapi = require('hapi')
const inert = require('inert')
const fs = require('fs')
const mime = require('mime')

const server = new Hapi.Server()

server.connection({
	host: 'localhost',
	port: 8000
})

server.route([
	{
		// List files in a given directory
		path: '/files',
		method: 'get',
		config: {
			handler: (request, reply) => {
				fs.readdir('./files', (err, files) => {
					reply(files.filter(file => file.endsWith('.html'))) // Only show HTML files
				})
			}
		}
	},
	{
		// Get a file
		path: '/files/{file}',
		method: 'get',
		config: {
			handler: (request, reply) => {
				const file = request.params.file
				reply
					.file(`files/${file}`)
					.header('Content-disposition', `attachment; filename=${file}`)
					.header('Content-type', mime.lookup(file))
			}
		}
	}
])

server.register(
	[
		{
			register: require('inert')
		}
	]
)

server.start(err => {
	if (err) {
		console.log('Failed to start the server')
		throw err
}
	console.log('Server running at:', server.info.uri)
})
