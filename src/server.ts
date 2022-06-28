import 'reflect-metadata';
import * as tq from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import { GraphQLScalarType } from 'graphql';
import { DateTimeResolver } from 'graphql-scalars';

import { context } from './config/context';
import { UserQuery } from './resolvers/query';
import { UserMutation } from './resolvers/mutation'; 
import { ProfessorMutation } from './resolvers/mutation/professor';
import { ProfessorQuery } from './resolvers/query/professor';
// import { resolvers } from "@generated/type-graphql";

const app = async () => {
    const schema = await tq.buildSchema({
        resolvers: [UserQuery, UserMutation, ProfessorMutation, ProfessorQuery],
        scalarsMap: [{ type: GraphQLScalarType, scalar: DateTimeResolver }]
    })

    new ApolloServer({schema, context}).listen({ port: 4000 }, () => {
        console.log('server ready 🚀');
    })
}

app();