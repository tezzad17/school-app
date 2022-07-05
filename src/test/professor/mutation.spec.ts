import { faker } from "@faker-js/faker";
import { Professor } from "@prisma/client";
import { Context, createMockContext, MockContext } from "../../config/context";

import { ProfessorCreateInput, ProfessorCreateInputAssignment, ProfessorMutation } from "../../resolvers/mutation/professor_mutation";



const professorClass = new ProfessorMutation();
const spyProfessorClass = jest.spyOn(professorClass, 'createProfessor');

describe('Professor Mutation Class', () => {
    let mockCtx: MockContext;
    let ctx: Context;

    beforeEach(() => {
        mockCtx = createMockContext();
        ctx = mockCtx as unknown as Context;
    });

    test('Create a Professor', async () => {
        const expectedObject: Professor = {
            id: faker.database.mongodbObjectId(),
            email: faker.internet.email(),
            name: faker.name.findName(),
            createdAt: new Date(),
            updatedAt: new Date(),

        };

        const request: ProfessorCreateInput = {
            email: faker.internet.email(),
            name: faker.name.findName(),
        }

        mockCtx.prisma.professor.create.mockResolvedValue(expectedObject);
        const response = await professorClass.createProfessor(request, mockCtx);
        // console.log(response);
        // console.log(expectedObject);
        expect(response).toMatchObject(expectedObject)
    });

    test('Upsert a Professor', async () => {
        const expectedObject: Professor = {
            id: faker.database.mongodbObjectId(),
            email: faker.internet.email(),
            name: faker.name.findName(),
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const request: ProfessorCreateInputAssignment = {
            email: faker.internet.email(),
            name: faker.name.findName(),
            assignmentName: faker.name.jobTitle(),
        }

        mockCtx.prisma.professor.upsert.mockResolvedValue(expectedObject);
        const response = await professorClass.upsertProfessorWithAssignment(request, mockCtx);
        // console.log(response);
        // console.log(expectedObject);
        expect(response).toMatchObject(expectedObject)
    });

})


