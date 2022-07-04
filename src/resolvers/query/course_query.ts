import 'reflect-metadata'
import {
    Resolver,
    Query,
    Ctx,
    FieldResolver,
    Root,
    Arg,
} from 'type-graphql'
import { Context } from '../../config/context'
import { Assignment } from '../../db/entities/Assignment'
import { Course } from '../../db/entities/Course'

@Resolver(Course)
export class CourseQuery {

    @FieldResolver()
    async assignments(@Root() course: Course, @Ctx() ctx: Context): Promise<Assignment[]> {
        return ctx.prisma.course.findUnique({
            where: {
                name_period : { name: course.name, period: course.period }
            }
        }).assignments()
    }

    @Query(() => [Course])
    async getCourses(@Ctx() ctx: Context) {
        return ctx.prisma.course.findMany({
            include: { assignments: true }
        })
    }

    @Query(() => Course)
    async getCourseByNameAndPeriod(@Ctx() ctx: Context, @Arg("course_name") course_name: string, @Arg("course_period") course_period: string) {

        return ctx.prisma.course.findUnique({
            where: {
                name_period : { name: course_name, period: course_period }
            }
        });
    }

}