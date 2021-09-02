import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
const { loadFiles } = require('@graphql-toolkit/file-loading');
import path from "path";

const allTypes: GraphQLSchema[] = loadFiles(
    path.join(__dirname, "./api/**/*.graphql")
);

const allResolvers = loadFiles(
    path.join(__dirname, "./api/**/*.resolvers.*")
);


const mergedTypes = mergeTypeDefs(allTypes);
const mergedREsolvers = mergeResolvers(allResolvers);

const schema = makeExecutableSchema({
    typeDefs: mergedTypes,
    resolvers: mergedREsolvers
})

export default schema

/* Deprecated syntax
import { GraphQLSchema } from "graphql";
import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas"; // deprecated lib need to migrate to graphql-tools
import path from "path";
 
const allTypes: GraphQLSchema[] = fileLoader(
   
);

const allResolvers = fileLoader(
    
);

const mergedTypes = mergeTypes(allTypes);
const mergedREsolvers = mergeResolvers(allResolvers);

const schema = makeExecutableSchema({
    typeDefs: mergedTypes,
    resolvers: mergedREsolvers
})

export default schema
*/