import { buildSchema } from "graphql";
import User from "../models/User";
import CityModel from "../models/CityModel";
import StreetModel from "../models/StreetModel";

export const schema = buildSchema(`
    type Query {
        user(id: Int!): User
        users(name: String): [User]
        city(id: Int!): City
        cities(name: String): [City]
        street(id: Int!): Street
        streets(name: String): [Street]
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
        updateCity(id: Int!, name: String!): Int
        updateStreet(id: Int!, name: String!): Int
    }
`);

export const root = {
    user: User.getUser,
    users: User.getUsers,
    city: CityModel.getCity,
    cities: CityModel.getCities,
    street: StreetModel.getStreet,
    streets: StreetModel.getStreets,
    updateUser: User.saveUser,
    updateCity: CityModel.saveCity,
    updateStreet: StreetModel.saveStreet
};
