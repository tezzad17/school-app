import 'reflect-metadata'
import {
    Resolver,
    Query,
    Ctx,
    InputType,
    Field,
    Arg,
} from 'type-graphql'
import { Context } from '../../config/context'
import { Assignment } from '../../db/entities/Assignment'

@Resolver(Assignment)
export class AssignmentQuery {

    @Query(() => [Assignment])
    async allStudents(@Ctx() ctx: Context) {
        return ctx.prisma.assignment.findMany()
    }

    @Query(() => Assignment)
    async getAssignmentById(@Ctx() ctx: Context, @Arg("name") id: string) {

        return ctx.prisma.assignment.findUnique({
            where: {
                id: id
            }
        });

    }

}