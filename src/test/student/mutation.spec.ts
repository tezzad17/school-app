import { faker } from "@faker-js/faker";
import { Student } from "@prisma/client";
import { Context, createMockContext, MockContext } from "../../config/context";

import { StudentCreateInput, StudentCreateInputAssignment, StudentMutation } from "../../resolvers/mutation/student_mutation";



const studentClass = new StudentMutation();
const spyStudentClass = jest.spyOn(studentClass, 'createStudent');

describe('Student Mutation Class', () => {
    let mockCtx: MockContext;
    let ctx: Context;

    beforeEach(() => {
        mockCtx = createMockContext();
        ctx = mockCtx as unknown as Context;
    });

    test('Create a Student', async () => {
        const expectStudent: Student = {
            id: faker.database.mongodbObjectId(),
            email: faker.internet.email(),
            name: faker.name.findName(),
            createdAt: new Date(),
            updatedAt: new Date(),
            assignmentsIds: []

        };

        const request: StudentCreateInput = {
            email: faker.internet.email(),
            name: faker.name.findName(),
        }

        mockCtx.prisma.student.create.mockResolvedValue(expectStudent);
        const response = await studentClass.createStudent(request, mockCtx);
        // console.log(response);
        // console.log(expectStudent);
        expect(response).toMatchObject(expectStudent)
    });

    test('Upsert a Student', async () => {
        const expectStudent: Student = {
            id: faker.database.mongodbObjectId(),
            email: faker.internet.email(),
            name: faker.name.findName(),
            createdAt: new Date(),
            updatedAt: new Date(),
            assignmentsIds: []

        };

        const request: StudentCreateInputAssignment = {
            email: faker.internet.email(),
            name: faker.name.findName(),
            assignmentName: faker.name.jobTitle(),
        }

        mockCtx.prisma.student.upsert.mockResolvedValue(expectStudent);
        const response = await studentClass.upsertStudentWithAssignment(request, mockCtx);
        // console.log(response);
        // console.log(expectStudent);
        expect(response).toMatchObject(expectStudent)
    });

})


