import { MockContext, Context, createMockContext, context } from "../../config/context";
import { User, Student, Assignment } from "@prisma/client";
import { faker } from "@faker-js/faker"
import { UserQuery } from '../../resolvers/query/user'
import { StudentQuery } from "../../resolvers/query/student_query";

const userClass = new UserQuery();
const studentClass = new StudentQuery();
const spyUserClass = jest.spyOn(userClass, 'userNameEmail');

describe('Student Query Class', () => {
    let mockCtx: MockContext;
    let ctx: Context;

    beforeEach(() => {
        mockCtx = createMockContext();
        ctx = mockCtx as unknown as Context;
    });

    test('Given a student email', async () => {
        const expectStudent: Student = {
            id: faker.database.mongodbObjectId(),
            email: faker.internet.email(),
            name: faker.name.findName(),
            createdAt: new Date(),
            updatedAt: new Date(),
            assignmentsIds: []
            
        };

        
        mockCtx.prisma.student.findUnique.mockResolvedValue(expectStudent)
        const response = studentClass.getStudentByEmail(mockCtx, expectStudent.email );
        await expect(response).resolves.toEqual(expectStudent);
    })


    test('Get All Students', async () => {
        const expectStudent: Student = {
            id: faker.database.mongodbObjectId(),
            email: faker.internet.email(),
            name: faker.name.findName(),
            createdAt: new Date(),
            updatedAt: new Date(),
            assignmentsIds: []
        };

        const studentArray = [];
        studentArray.push(expectStudent);

        
        mockCtx.prisma.student.findMany.mockResolvedValue(studentArray)
        const response = studentClass.getStudents(mockCtx );
        await expect(response).resolves.toEqual(studentArray);
    })

    // test('Get Assignments', async () => {

    //     const expectAssignment: Assignment = {
    //         id: faker.database.mongodbObjectId(),
    //         name: faker.name.jobArea(),
    //         createdAt: new Date(),
    //         updatedAt: new Date(),
    //         courseId: faker.database.mongodbObjectId(),
    //         professorId: faker.database.mongodbObjectId(),
    //         studentsIds: [faker.database.mongodbObjectId()]
    //     }

    //     const expectStudent: Student = {
    //         id: faker.database.mongodbObjectId(),
    //         email: faker.internet.email(),
    //         name: faker.name.findName(),
    //         createdAt: new Date(),
    //         updatedAt: new Date(),
    //         assignmentsIds: [expectAssignment.id]  
    //     };

    //     mockCtx.prisma.student.findUnique.mockResolvedValue(expectStudent);
    //     const response = studentClass.assignments(expectStudent, mockCtx );
    //     await expect(response).resolves.toEqual(expectStudent);
    // })

})


