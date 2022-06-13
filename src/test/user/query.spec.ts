import { MockContext, Context, createMockContext, context } from "../../config/context";
import { User } from "@prisma/client";
import { faker } from "@faker-js/faker"
import { UserQuery } from '../../resolvers/query/user'

const userClass = new UserQuery();
const spyUserClass = jest.spyOn(userClass, 'userNameEmail');

describe('User Query Class', () => {
    let mockCtx: MockContext;
    let ctx: Context;

    beforeEach(() => {
        mockCtx = createMockContext();
        ctx = mockCtx as unknown as Context;
    });

    test('Given an UserId', async () => {
        const expectUser: User = {
            id: faker.database.mongodbObjectId(),
            email: faker.internet.email(),
            createdAt: new Date(),
            updatedAt: new Date(),
            name: faker.name.findName(),
            userType: 1
        };

        
        mockCtx.prisma.user.findUnique.mockResolvedValue(expectUser)
        const response = userClass.userById(mockCtx, { userId: expectUser.id });
        await expect(response).resolves.toEqual(expectUser);
    })

    test('Given an UserId when user exist the return a userName with email', async () => {
        const expectUser: User = {
            id: faker.database.mongodbObjectId(),
            email: faker.internet.email(),
            createdAt: new Date(),
            updatedAt: new Date(),
            name: faker.name.findName(),
            userType: 1
        };

        const expectResponse = `${expectUser.name}-${expectUser.email}`
        mockCtx.prisma.user.findUnique.mockResolvedValue(expectUser)
        const response = userClass.userNameEmail(mockCtx, { userId: expectUser.id });
        //expect(spyUserClass).toBeCalledTimes(1);

        await expect(response).resolves.toEqual(expectResponse);
    })

    test('should find a user by id', async () => {
        const userId = "1234";
        const expectedErrorMsg = `user not found with id ${userId}`;
        mockCtx.prisma.user.findUnique.mockResolvedValue(null);
        const response = userClass.userNameEmail(mockCtx, { userId });
        expect(response).rejects.toThrow(expectedErrorMsg);
    })
})



