import { authChecker } from "./../auth/auth-checker";
import { PrismaClient } from "@prisma/client";
import { buildSchema } from "type-graphql";
import { authResolvers } from "../auth/resolvers";
import { classroomsResolvers } from "../classrooms/resolvers";
import { passesResolvers } from "../passes/resolvers";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core/dist/plugin/landingPage/graphqlPlayground";
import { Express } from "express";
import prismaLogger from "./prisma-logger";
import { generateData } from "./createTestData";

export default async (app: Express) => {
  //   await generateData();
  const prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });
  await prisma.$connect();

  prisma.$use(prismaLogger);

  const schema = await buildSchema({
    resolvers: [, ...authResolvers, ...classroomsResolvers, ...passesResolvers],
    validate: true,
    authChecker,
  });
  const apolloServer = new ApolloServer({
    schema,
    introspection: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    context: ({ req }: { req: any }) => {
      const user = req.auth || null;
      return { prisma, user };
    },
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });
};
