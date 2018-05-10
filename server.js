import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from './data/schema';
import compression from 'compression';
import { ApolloEngine } from 'apollo-engine';

const GRAPHQL_PORT = 3000;
const ENGINE_API_KEY = process.env.ENGINE_API_KEY; // TODO

const graphQLServer = express();

const engine = new ApolloEngine({
  apiKey: ENGINE_API_KEY
});

graphQLServer.use(compression());

graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({ schema, 
  tracing: true,
  cacheControl: true }));
graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

engine.listen({
  port: GRAPHQL_PORT,
  expressApp: graphQLServer
}, () =>
  console.log(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
  )
);
