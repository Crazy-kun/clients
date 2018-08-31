import { buildSchema } from "graphql";
import User from "../models/User";

export const schema = buildSchema(`
    type Query {
        user(id: Int!): User
        users(name: String): [User]
    },
    type User {
        id: Int
        name: String
        username: String
        email: String
        phone: String
        city: City
        street: Street
    },
    type City {
        id: Int
        name: String
    },
    type Street {
        id: Int
        name: String
    },
    type Mutation {
        updateUser(id: Int!, name: String, username: String, email: String, phone: String, city: Int, street: Int): Int
    }
`);

export const root = {
    user: User.getUser,
    users: User.getUsers,
    updateUser: User.saveUser
};
