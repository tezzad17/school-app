import 'reflect-metadata'
import {
    Resolver,
    FieldResolver,
    Root,
    Ctx,
    InputType,
    Field,
    Mutation,
    Arg,
} from 'type-graphql'
import { Context } from '../../config/context'
import { Student } from '../../db/entities/Student';
import { Assignment } from '../../db/entities/Assignment';
import { type } from 'os';
import { Course } from '../../db/entities/Course';


@InputType()
class CourseCreateInput implements Partial<Course> {
    @Field()
    period: string;

    @Field()
    name: string;
}

@InputType()
class CourseUpsertInputAssignment implements Partial<Course> {
    @Field()
    period: string;

    @Field()
    name: string;

    @Field()
    assignmentName: string
}


@Resolver(Course)
export class CourseMutation {

    @FieldResolver()
    async assignments(@Root() course: Course, @Ctx() ctx: Context): Promise<Assignment[]> {
        return ctx.prisma.course.findUnique({
            where: {
                name_period : { name: course.name, period: course.period }
            }
        }).assignments()
    }

    @Mutation((returns) => Course)
    async createCourse(
        @Arg('data') data: CourseCreateInput,
        @Ctx() ctx: Context
    ): Promise<Course> {
        return ctx.prisma.course.create({
            data: {
                name: data.name,
                period: data.period
            }
        })
    }

    @Mutation((returns) => Course)
    async upsertCourseAssignment(
        @Arg('data') data: CourseUpsertInputAssignment,
        @Ctx() ctx: Context
    ): Promise<Course> {

        return ctx.prisma.course.upsert({
            where: {
                name_period: { name: data.name, period: data.period }
            },
            create: {
                name: data.name,
                period: data.period,
                assignments: {
                    connectOrCreate: [{
                        where: { name: data.assignmentName },
                        create: { name: data.assignmentName }
                    }]
                }
            },
            update: {
                assignments: {
                    connectOrCreate: [{
                        where: { name: data.assignmentName },
                        create: { name: data.assignmentName }
                    }]
                }
            }
        })
    }
}