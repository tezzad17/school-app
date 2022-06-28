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


@InputType()
class StudentCreateInput implements Partial<Student> {
    @Field()
    email: string;

    @Field()
    name: string;

    // @Field((type) => [Assignment])
    // assignment: Assignment[]


}

@InputType()
class StudentCreateInputAssignment implements Partial<Student> {
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
    async signupStudent(
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
    async signupProfessorAssignment(
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