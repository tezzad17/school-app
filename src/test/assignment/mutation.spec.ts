import { faker } from "@faker-js/faker";
import { Assignment } from "@prisma/client";
import { Context, createMockContext, MockContext } from "../../config/context";

import { AssignmentCreateInput, AssignmentMutation, AssignmentRelatesCourseInput, CreateAssignmentRelatesProfessorInput } from "../../resolvers/mutation/assignment_mutation";



const assignmentClass = new AssignmentMutation();
const spyProfessorClass = jest.spyOn(assignmentClass, 'createAssignment');

describe('Assignment Mutation Class', () => {
    let mockCtx: MockContext;
    let ctx: Context;

    beforeEach(() => {
        mockCtx = createMockContext();
        ctx = mockCtx as unknown as Context;
    });

    test('Create an Assignment', async () => {

        const expectedObject: Assignment = {
            id: faker.database.mongodbObjectId(),
            courseId: faker.database.mongodbObjectId(),
            professorId: faker.database.mongodbObjectId(),
            studentsIds: [faker.database.mongodbObjectId()],
            name: faker.name.findName(),
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const request: AssignmentCreateInput = {
            name: faker.datatype.string(),
        }

        mockCtx.prisma.assignment.upsert.mockResolvedValue(expectedObject);
        const response = await assignmentClass.createAssignment(request, mockCtx);
        // console.log(response);
        // console.log(expectedObject);
        expect(response).toMatchObject(expectedObject)
    });

    test('Update an Assignment', async () => {

        const expectedObject: Assignment = {
            id: faker.database.mongodbObjectId(),
            courseId: faker.database.mongodbObjectId(),
            professorId: faker.database.mongodbObjectId(),
            studentsIds: [faker.database.mongodbObjectId()],
            name: faker.name.findName(),
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const request: CreateAssignmentRelatesProfessorInput = {
            name: faker.datatype.string(),
            studentEmail: faker.internet.email()
        }

        mockCtx.prisma.assignment.update.mockResolvedValue(expectedObject);
        const response = await assignmentClass.updateAssignmentWithStudent(request, mockCtx);
        // console.log(response);
        // console.log(expectedObject);
        expect(response).toMatchObject(expectedObject)
    });

    test('Update an Assignment with Course', async () => {

        const expectedObject: Assignment = {
            id: faker.database.mongodbObjectId(),
            courseId: faker.database.mongodbObjectId(),
            professorId: faker.database.mongodbObjectId(),
            studentsIds: [faker.database.mongodbObjectId()],
            name: faker.name.findName(),
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const request: AssignmentRelatesCourseInput = {
            name: faker.datatype.string(),
            course_name: faker.datatype.string(),
            course_period: faker.datatype.string()
        }

        mockCtx.prisma.assignment.update.mockResolvedValue(expectedObject);
        const response = await assignmentClass.updateAssignmentWithCourse(request, mockCtx);
        // console.log(response);
        // console.log(expectedObject);
        expect(response).toMatchObject(expectedObject)
    });

    

})


