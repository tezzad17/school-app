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


@InputType()
class StudentCreateInput implements Partial<Student> {
    @Field()
    email: string;

    @Field()
    name: string;

    // @Field((type) => [Assignment])
    // assignment: Assignment[]


}


@Resolver(Student)
export class StudentMutation {

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

}