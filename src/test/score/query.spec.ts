import { MockContext, Context, createMockContext, context } from "../../config/context";
import { Course, Score} from "@prisma/client";
import { faker } from "@faker-js/faker"
import { CourseQuery } from "../../resolvers/query/course_query";
import { ScoreQuery } from "../../resolvers/query/score_query";

const scoreClass = new ScoreQuery();

describe('Scores Query Class', () => {
    let mockCtx: MockContext;
    let ctx: Context;

    beforeEach(() => {
        mockCtx = createMockContext();
        ctx = mockCtx as unknown as Context;
    });

    test('Get All Scores', async () => {
        const expectScores: Score = {
            id: faker.database.mongodbObjectId(),
            score: faker.datatype.number({max: 10, precision: 2}),
            assignmentId: faker.database.mongodbObjectId(),
            studentId: faker.database.mongodbObjectId()

        };

        const scoresArray = [];
        scoresArray.push(expectScores);

        
        mockCtx.prisma.score.findMany.mockResolvedValue(scoresArray)
        const response = scoreClass.getScores(mockCtx);
        await expect(response).resolves.toEqual(scoresArray);
    })

   
})


