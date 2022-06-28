import 'reflect-metadata';
import * as tq from 'type-graphql';
import { ApolloServer } from 'apollo-server';
import { GraphQLScalarType } from 'graphql';
import { DateTimeResolver } from 'graphql-scalars';

import { mutations } from './resolvers/mutation';
import { queries } from './resolvers/query';

import { context } from './config/context';

// import { resolvers } from "@generated/type-graphql";

const app = async () => {
    const schema = await tq.buildSchema({
        resolvers: [...mutations, ...queries],
        scalarsMap: [{ type: GraphQLScalarType, scalar: DateTimeResolver }]
    })

    new ApolloServer({schema, context}).listen({ port: 4000 }, () => {
        console.log('server ready 🚀');
    })
}

app();