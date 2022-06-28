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
import { Course } from '../../db/entities/Course'

@Resolver(Course)
export class CourseQuery {

    @Query(() => [Course])
    async allStudents(@Ctx() ctx: Context) {
        return ctx.prisma.course.findMany()
    }

}