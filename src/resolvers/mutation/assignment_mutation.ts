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
    async updateAssignmentRelatesStudent(
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


}