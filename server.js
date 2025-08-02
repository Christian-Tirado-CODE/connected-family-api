import { buildSchema } from 'graphql';
import { createHandler } from 'graphql-http/lib/use/express';
import express from 'express';
 import { ruruHTML } from 'ruru/server';
import FamilyMember from './FamilyMember.js';

/*  
Product MVP features:
- Show list of family members
- Add family member
- Remove family member
- Modify family member
- Authentication
- Account creation

*/

const schema = buildSchema(`
    type FamilyMember {
    id: ID!
    name: String!
    dob: String!
    relationship: String!
    }

    input NewFamilyMemberInput {
    name: String!
    dob: String!
    relationship: String!
    }

    type Query {
    getFamilyMembers: [FamilyMember]
    getFamilyMember(id: ID): FamilyMember
    }

    type Mutation {
     addNewFamilyMember(input: NewFamilyMemberInput): FamilyMember
    }
    
`);

const familyMembers = [
    new FamilyMember("1", "John Smith", "01/01/2000", "Father"),
     new FamilyMember("2", "Mary Smith", "02/02/1990", "Mother")
    ];

const root = {
    getFamilyMember({id}){
        return familyMembers.find(fm => fm.id === id);
    },
    getFamilyMembers(){
        return familyMembers;
    },
    addNewFamilyMember({input}){
        const id = familyMembers.length;
        const newFamilyMember = new FamilyMember(id, input.name, input.dob, input.relationship);
        familyMembers.push(newFamilyMember);
        return newFamilyMember;
    }
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
 