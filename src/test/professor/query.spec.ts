import { MockContext, Context, createMockContext, context } from "../../config/context";
import { User, Student, Assignment, Professor } from "@prisma/client";
import { faker } from "@faker-js/faker"
import { UserQuery } from '../../resolvers/query/user'
import { StudentQuery } from "../../resolvers/query/student_query";
import { ProfessorQuery } from "../../resolvers/query/professor_query";

const professorClass = new ProfessorQuery();

describe('Professor Query Class', () => {
    let mockCtx: MockContext;
    let ctx: Context;

    beforeEach(() => {
        mockCtx = createMockContext();
        ctx = mockCtx as unknown as Context;
    });

    test('Given a professor email', async () => {
        const expectProfessor: Professor = {
            id: faker.database.mongodbObjectId(),
            email: faker.internet.email(),
            name: faker.name.findName(),
            createdAt: new Date(),
            updatedAt: new Date()
            
        };

        
        mockCtx.prisma.professor.findUnique.mockResolvedValue(expectProfessor)
        const response = professorClass.getProfessorByEmail(mockCtx, expectProfessor.email );
        await expect(response).resolves.toEqual(expectProfessor);
    })


    test('Get All Professors', async () => {
        const expectProfessor: Professor = {
            id: faker.database.mongodbObjectId(),
            email: faker.internet.email(),
            name: faker.name.findName(),
            createdAt: new Date(),
            updatedAt: new Date()
            
        };

        const professorArray = [];
        professorArray.push(expectProfessor);

        
        mockCtx.prisma.professor.findMany.mockResolvedValue(professorArray)
        const response = professorClass.getProfessors(mockCtx );
        await expect(response).resolves.toEqual(professorArray);
    })

   
})


