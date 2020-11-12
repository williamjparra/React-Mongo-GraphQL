const { ApolloServer } = require('Apollo-Server')
const mongoose = require('mongoose')

const resolvers = require('./graphql/resolvers')
const { MONGODB } = require('./config.js')
const typeDefs = require('./graphql/typeDef')


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
});

mongoose.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        return server.listen({ port: 5500 })
        console.log('MongoDB Connected')
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`)
    })

server.listen({ port: 5000 })
    .then(res => {
        console.log(`Server running at ${res.url}`)
    })