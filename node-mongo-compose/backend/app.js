const express    = require('express');
const restful    = require('node-restful');
const server     = express();
const mongoose   = restful.mongoose
const bodyparser = require('body-parser');
const cors       = require('cors');

//database
mongoose.Promise = global.Promise
mongoose.connect('mongodb://db/mydb')

//middlewares
server.use(bodyparser.urlencoded({extended:true}))
server.use(bodyparser.json())
server.use(cors())

//ODM
const client = restful.model('client', {
    name:{type: String, required: true}
})

// Rest Api
client.methods(['get', 'post', 'put', 'delete'])
client.updateOptions({new: true, runValidators: true})

client.register(server, '/clientes')
//routes
server.get('/', (req, res, next) => res.send('backend'))

server.listen(3000)