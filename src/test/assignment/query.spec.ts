import { MockContext, Context, createMockContext, context } from "../../config/context";
import { Assignment, Professor } from "@prisma/client";
import { faker } from "@faker-js/faker"
import { AssignmentQuery } from "../../resolvers/query/assignment_query";

const assignmentClass = new AssignmentQuery();

describe('Assignment Query Class', () => {
    let mockCtx: MockContext;
    let ctx: Context;

    beforeEach(() => {
        mockCtx = createMockContext();
        ctx = mockCtx as unknown as Context;
    });

    test('Given an assignment ID', async () => {
        const expectAssignment: Assignment = {
            id: faker.database.mongodbObjectId(),
            courseId: faker.database.mongodbObjectId(),
            professorId: faker.database.mongodbObjectId(),
            studentsIds: [faker.database.mongodbObjectId()],
            name: faker.name.findName(),
            createdAt: new Date(),
            updatedAt: new Date()
        };

        
        mockCtx.prisma.assignment.findUnique.mockResolvedValue(expectAssignment)
        const response = assignmentClass.getAssignmentById(mockCtx, expectAssignment.id );
        await expect(response).resolves.toEqual(expectAssignment);
    })


    test('Get All Assignments', async () => {
        const expectAssignment: Assignment = {
            id: faker.database.mongodbObjectId(),
            courseId: faker.database.mongodbObjectId(),
            professorId: faker.database.mongodbObjectId(),
            studentsIds: [faker.database.mongodbObjectId()],
            name: faker.name.findName(),
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const assignmentArray = [];
        assignmentArray.push(expectAssignment);

        
        mockCtx.prisma.assignment.findMany.mockResolvedValue(assignmentArray)
        const response = assignmentClass.getAssignments(mockCtx);
        await expect(response).resolves.toEqual(assignmentArray);
    })

   
})


