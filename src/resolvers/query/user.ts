import 'reflect-metadata'
import {
    Arg, Ctx, Query, Resolver
} from 'type-graphql'
import { Context } from '../../config/context'
import { User } from '../../db/entities/User'

@Resolver(User)
export class UserQuery {

    @Query(() => [User])
    async allUsers(@Ctx() ctx: Context) {
        return ctx.prisma.user.findMany()
    }

    @Query(() => User)
    async userById(@Ctx() ctx: Context, @Arg("userId")  userId: string) {
        return ctx.prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        
    }

    @Query(() => String)
    async userNameEmail(@Ctx() ctx: Context, @Arg("userId")  userId: string ) {
        const user = await ctx.prisma.user.findUnique({
            where: {
                id: userId
            }
        });

        if (!user){
            throw new Error(`user not found with id ${userId}`)
        }

        return `${user.name}-${user.email}`;
        
    }

}