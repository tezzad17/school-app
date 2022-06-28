import 'reflect-metadata'
import {
    Resolver,
    Query,
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

    // @Field((type) => [Assignment])
    // assignment: Assignment[]


}


@Resolver(Course)
export class CourseMutation {

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

}