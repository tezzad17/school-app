import { MockContext, Context, createMockContext, context } from "../../config/context";
import { Course} from "@prisma/client";
import { faker } from "@faker-js/faker"
import { CourseQuery } from "../../resolvers/query/course_query";

const courseClass = new CourseQuery();

describe('Couse Query Class', () => {
    let mockCtx: MockContext;
    let ctx: Context;

    beforeEach(() => {
        mockCtx = createMockContext();
        ctx = mockCtx as unknown as Context;
    });

    test('Given a course period and name', async () => {
        const expectCourse: Course = {
            id: faker.database.mongodbObjectId(),
            period: faker.datatype.string(),
            name: faker.datatype.string(),
            createdAt: new Date(),
            updatedAt: new Date()
        };

        
        mockCtx.prisma.course.findUnique.mockResolvedValue(expectCourse)
        const response = courseClass.getCourseByNameAndPeriod(mockCtx, expectCourse.name, expectCourse.period );
        await expect(response).resolves.toEqual(expectCourse);
    })


    test('Get All Courses', async () => {
        const expectCourse: Course = {
            id: faker.database.mongodbObjectId(),
            period: faker.datatype.string(),
            name: faker.datatype.string(),
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const courseArray = [];
        courseArray.push(expectCourse);

        
        mockCtx.prisma.course.findMany.mockResolvedValue(courseArray)
        const response = courseClass.getCourses(mockCtx);
        await expect(response).resolves.toEqual(courseArray);
    })

   
})


