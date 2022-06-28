import 'reflect-metadata'
import {
    Resolver,
    Query,
    Ctx,
    InputType,
    Field,
    Arg,
} from 'type-graphql'
import { Student } from '../../db/entities/Student'
import { Context } from '../../config/context'

@Resolver(Student)
export class StudentQuery {

    @Query(() => [Student])
    async allStudents(@Ctx() ctx: Context) {
        return ctx.prisma.student.findMany()
    }


    @Query(() => Student)
    async getStudentByEmail(@Ctx() ctx: Context, @Arg("email") email: string) {

        return ctx.prisma.student.findUnique({
            where: {
                email: email
            }
        });

    }

}