import 'reflect-metadata'
import {
    Resolver,
    Query,
    Ctx,
    InputType,
    Field,
    FieldResolver,
    Root,
    Arg,
} from 'type-graphql'
import { Context } from '../../config/context'
import { Assignment } from '../../db/entities/Assignment'
import { Course } from '../../db/entities/Course'

@Resolver(Assignment)
export class AssignmentQuery {

    // @FieldResolver()
    // async assignments(@Root() assignment: Assignment, @Ctx() ctx: Context): Promise<Course> {
    //     return ctx.prisma.assignment.findUnique({
    //         where: {
    //             name: { assignment.name }
    //         }
    //     }).course()
    // }

    @Query(() => [Assignment])
    async allAssignments(@Ctx() ctx: Context) {
        return ctx.prisma.assignment.findMany({
            include: { course: true, students: true, professor: true}
        })
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