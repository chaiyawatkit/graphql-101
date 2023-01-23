const { ApolloServer, gql } = require("apollo-server");
const { argsToArgsConfig } = require("graphql/type/definition");
const axios = require("axios").default;

var todos = [];
const getdata = () => {
  axios.get("https://jsonplaceholder.typicode.com/todos").then((response) => {
    response.data.map((data) => {
      todos.push({
        userId: data.userId,
        id: data.id,
        title: data.title,
        completed: data.completed,
      });
    });
    const typeDefs = gql`
      type User {
        name: String
        age: Int
        position: String
      }

      type Word {
        userId: Int
        id: Int
        title: String
        completed: Boolean
      }

      type Query {
        users: [User]
        todos: [Word]
      }
      type Mutation {
        createUser(name: String, age: Int, position: String): User
      }
    `;

    let users = [
      {
        name: "kuk",
        age: "22",
        position: "student",
      },
      {
        name: "mama",
        age: "23",
        position: "programer",
      },
      {
        name: "jung",
        age: "24",
        position: "developer",
      },
    ];

    const resolvers = {
      Query: {
        users: () => users,
        todos: () => todos,
      },
      Mutation: {
        createUser(parent, args) {
          const newUser = args;
          users.push(newUser);
          return newUser;
        },
      },
    };

    const server = new ApolloServer({ typeDefs, resolvers });
    server.listen().then(({ url }) => {
      console.log("server ready at port");
    });
  });
};

getdata();
