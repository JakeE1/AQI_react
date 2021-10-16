"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var schema_1 = require("@graphql-tools/schema");
var merge_1 = require("@graphql-tools/merge");
var loadFiles = require('@graphql-toolkit/file-loading').loadFiles;
var path_1 = __importDefault(require("path"));
var allTypes = loadFiles(path_1.default.join(__dirname, "./api/**/*.graphql"));
var allResolvers = loadFiles(path_1.default.join(__dirname, "./api/**/*.resolvers.*"));
var mergedTypes = (0, merge_1.mergeTypeDefs)(allTypes);
var mergedREsolvers = (0, merge_1.mergeResolvers)(allResolvers);
var schema = (0, schema_1.makeExecutableSchema)({
    typeDefs: mergedTypes,
    resolvers: mergedREsolvers
});
exports.default = schema;
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
//# sourceMappingURL=schema.js.map