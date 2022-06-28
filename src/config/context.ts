import { PrismaClient, Student } from "@prisma/client";
import { mockDeep, DeepMockProxy } from "jest-mock-extended"
import { User } from "../db/entities/User";
import  prisma  from "../client"

export interface Context {
    prisma: PrismaClient;
    jwt?: string;
    user?: User;
    student?: Student
}

export type MockContext = {
    prisma: DeepMockProxy<PrismaClient>;
}

export const createMockContext = (): MockContext => {
    return {
        prisma: mockDeep<PrismaClient>()
    }
}

export const context: Context = {
    prisma
}