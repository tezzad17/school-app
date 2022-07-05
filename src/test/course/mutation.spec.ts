import { faker } from "@faker-js/faker";
import { Course } from "@prisma/client";
import { Context, createMockContext, MockContext } from "../../config/context";

import { CourseCreateInput, CourseMutation, CourseUpsertInputAssignment } from "../../resolvers/mutation/course_mutation";



const courseClass = new CourseMutation();
const spyProfessorClass = jest.spyOn(courseClass, 'createCourse');

describe('Course Mutation Class', () => {
    let mockCtx: MockContext;
    let ctx: Context;

    beforeEach(() => {
        mockCtx = createMockContext();
        ctx = mockCtx as unknown as Context;
    });

    test('Create a Course', async () => {

        const expectedObject: Course = {
            id: faker.database.mongodbObjectId(),
            period: faker.datatype.string(),
            name: faker.datatype.string(),
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const request: CourseCreateInput = {
            name: faker.datatype.string(),
            period: faker.datatype.string(),
        }

        mockCtx.prisma.course.create.mockResolvedValue(expectedObject);
        const response = await courseClass.createCourse(request, mockCtx);
        // console.log(response);
        // console.log(expectedObject);
        expect(response).toMatchObject(expectedObject)
    });

    test('Upsert a Course With Assignment', async () => {

        const expectedObject: Course = {
            id: faker.database.mongodbObjectId(),
            period: faker.datatype.string(),
            name: faker.datatype.string(),
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const request: CourseUpsertInputAssignment = {
            name: faker.datatype.string(),
            period: faker.datatype.string(),
            assignmentName: faker.datatype.string(),
        }

        mockCtx.prisma.course.upsert.mockResolvedValue(expectedObject);
        const response = await courseClass.upsertCourseWithAssignment(request, mockCtx);
        // console.log(response);
        // console.log(expectedObject);
        expect(response).toMatchObject(expectedObject)
    });
    

})


