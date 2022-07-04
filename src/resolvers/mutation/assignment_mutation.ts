import 'reflect-metadata'
import {
    Resolver,
    Ctx,
    InputType,
    Field,
    Mutation,
    Arg,
} from 'type-graphql'
import { Context } from '../../config/context'
import { Assignment } from '../../db/entities/Assignment';


@InputType()
class AssignmentCreateInput implements Partial<Assignment> {

    @Field()
    name: string;
}

@InputType()
class CreateAssignmentRelatesProfessorInput implements Partial<Assignment> {

    @Field()
    name: string;

    @Field()
    studentEmail: string;
}

@InputType()
class AssignmentRelatesCourseInput implements Partial<Assignment> {

    @Field()
    name: string;

    @Field()
    course_name: string;

    @Field()
    course_period: string;
}


@Resolver(Assignment)
export class AssignmentMutation {

    @Mutation((returns) => Assignment)
    async createAssignment(
        @Arg('data') data: AssignmentCreateInput,
        @Ctx() ctx: Context
    ): Promise<Assignment> {
        return ctx.prisma.assignment.upsert({
            where: { name: data.name },
            create: { name: data.name },
            update: { name: data.name }
        })
    }

    @Mutation((returns) => Assignment)
    async updateAssignmentWithStudent(
        @Arg('data') data: CreateAssignmentRelatesProfessorInput,
        @Ctx() ctx: Context
    ): Promise<Assignment> {
        return ctx.prisma.assignment.update({
            where: { name: data.name },
            data: { 
                students: { connect: { email: data.studentEmail } }
             }
        })
    }

    @Mutation((returns) => Assignment)
    async updateAssignmentWithCourse(
        @Arg('data') data: AssignmentRelatesCourseInput,
        @Ctx() ctx: Context
    ): Promise<Assignment> {

        return ctx.prisma.assignment.update({
            where: { name: data.name },
            data: { 
                course: { connect: { name_period: { name: data.course_name, period: data.course_period }} }
             }
        })
    }



}