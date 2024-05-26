const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql');

const host = 'http://localhost:';
const prot = 3001;

const schema = buildSchema(`
  type Account {
    id: ID
    name: String
    age: Int
    sex: Boolean
  }

  type Query {
    getClassmates(classNo: Int!): [String]
    account(username: String): Account
  }
`);

const root = {
  getClassmates({ classNo }) {
    const obj = {
      1: ['a', 'b', 'c'],
      2: ['d', 'e', 'f'],
    };
    return obj[classNo];
  },
  account({ username }) {
    const name = username;
    const age = 18;
    const sex = true;

    return {
      name,
      age,
      sex,
    };
  },
};

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  }),
);

app.get(
  '/',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: false,
  }),
);

app.listen(prot, () => {
  console.log(`Now browse to ${host}${prot}/graphql`);
});
