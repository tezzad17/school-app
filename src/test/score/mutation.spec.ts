import { faker } from "@faker-js/faker";
import { Assignment, Score, Student } from "@prisma/client";
import { Context, createMockContext, MockContext } from "../../config/context";

import { ScoreCreateInput, ScoreMutation } from "../../resolvers/mutation/score_mutation";



const scoreClass = new ScoreMutation();
const spyProfessorClass = jest.spyOn(scoreClass, 'upsertScoreWithAssignment');

describe('Score Mutation Class', () => {
    let mockCtx: MockContext;
    let ctx: Context;

    beforeEach(() => {
        mockCtx = createMockContext();
        ctx = mockCtx as unknown as Context;
    });

    test('Create a Score', async () => {
        const expectedObject: Score = {
            id: faker.database.mongodbObjectId(),
            assignmentId: faker.database.mongodbObjectId(),
            studentId: faker.database.mongodbObjectId(),
            score: faker.datatype.number({ max: 10, precision: 0.1})
        };

        const expectStudent: Student = {
            id: faker.database.mongodbObjectId(),
            email: faker.internet.email(),
            name: faker.name.findName(),
            createdAt: new Date(),
            updatedAt: new Date(),
            assignmentsIds: []
        };

        const expectAssignment: Assignment = {
            id: faker.database.mongodbObjectId(),
            courseId: faker.database.mongodbObjectId(),
            professorId: faker.database.mongodbObjectId(),
            studentsIds: [faker.database.mongodbObjectId()],
            name: faker.name.findName(),
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const request: ScoreCreateInput = {
            student_email: faker.internet.email(),
            assignment_name: faker.datatype.string(),
            score: faker.datatype.number({max: 10, precision: 0.1})

        }

        mockCtx.prisma.student.findUnique.mockResolvedValue(expectStudent);
        mockCtx.prisma.assignment.findUnique.mockResolvedValue(expectAssignment);
        mockCtx.prisma.score.upsert.mockResolvedValue(expectedObject);
        const response = await scoreClass.upsertScoreWithAssignment(request, mockCtx);
        // console.log(response);
        // console.log(expectedObject);
        expect(response).toMatchObject(expectedObject)
    });

    test('Create a Score', async () => {


        const request: ScoreCreateInput = {
            student_email: faker.internet.email(),
            assignment_name: faker.datatype.string(),
            score: faker.datatype.number({max: 10, precision: 0.1})

        }

        mockCtx.prisma.student.findUnique.mockResolvedValue(null);
        const response = await scoreClass.upsertScoreWithAssignment(request, mockCtx);
        //console.log(response);

        expect(response).toMatchObject({})
    });

    test('Create a Score', async () => {

        const expectStudent: Student = {
            id: faker.database.mongodbObjectId(),
            email: faker.internet.email(),
            name: faker.name.findName(),
            createdAt: new Date(),
            updatedAt: new Date(),
            assignmentsIds: []
        };

        const request: ScoreCreateInput = {
            student_email: faker.internet.email(),
            assignment_name: faker.datatype.string(),
            score: faker.datatype.number({max: 10, precision: 0.1})

        }

        mockCtx.prisma.student.findUnique.mockResolvedValue(expectStudent);
        mockCtx.prisma.assignment.findUnique.mockResolvedValue(null);
        const response = await scoreClass.upsertScoreWithAssignment(request, mockCtx);
        // console.log(response);
        // console.log(expectedObject);
        expect(response).toMatchObject({})
    });

})


