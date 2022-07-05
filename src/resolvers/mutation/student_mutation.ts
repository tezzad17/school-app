import 'reflect-metadata';
import {
    Arg, Ctx, Field, FieldResolver, InputType, Mutation, Resolver, Root
} from 'type-graphql';
import { Context } from '../../config/context';
import { Assignment } from '../../db/entities/Assignment';
import { Student } from '../../db/entities/Student';


@InputType()
export class StudentCreateInput implements Partial<Student> {
    @Field()
    email: string;

    @Field()
    name: string;

}

@InputType()
export class StudentCreateInputAssignment implements Partial<Student> {
    @Field()
    email: string;

    @Field()
    name: string;

    @Field()
    assignmentName: string
}


@Resolver(Student)
export class StudentMutation {

    @FieldResolver()
    async assignments(@Root() student: Student, @Ctx() ctx: Context): Promise<Assignment[]> {
        return ctx.prisma.student.findUnique({
            where: {
                email: student.email
            }
        }).assignments()
    }

    @Mutation((returns) => Student)
    async createStudent(
        @Arg('data') data: StudentCreateInput,
        @Ctx() ctx: Context
    ): Promise<Student> {
        return ctx.prisma.student.create({
            data: {
                email: data.email,
                name: data.name
            }
        })
    }

    @Mutation((returns) => Student)
    async upsertStudentWithAssignment(
        @Arg('data') data: StudentCreateInputAssignment,
        @Ctx() ctx: Context
    ): Promise<Student> {

        return ctx.prisma.student.upsert({
            where: {
                email: data.email
            },
            create: {
                name: data.name,
                email: data.email,
                assignments: {
                    connectOrCreate: [{
                        where: { name: data.assignmentName },
                        create: { name: data.assignmentName }
                    }]
                }
            },
            update: {
                name: data.name,
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