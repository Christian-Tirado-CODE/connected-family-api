import { buildSchema } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/express';
import express from 'express';
 import { ruruHTML } from 'ruru/server';
import FamilyMember from './FamilyMember.js';
// Construct a schema
const schema = buildSchema(`
    type FamilyMember {
    id: ID!
    name: String!
    dob: String!
    relationship: String!
    }

    type Query {
    getFamilyMember(id: ID): FamilyMember
    }
    
`);

const id = 1;
const root = {
    getFamilyMember(id){
        return new FamilyMember("1", "John Smith", "01/01/2000", "Father");
    },
}
const app = express();
 
// Create and use the GraphQL handler.
app.all(
  '/graphql',
  createHandler({
    schema: schema,
    rootValue: root
  }),
);

// Serve the GraphiQL IDE.
app.get('/', (_req, res) => {
  res.type('html');
  res.end(ruruHTML({ endpoint: '/graphql' }));
});
 
// Start the server at port
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/graphql');
 