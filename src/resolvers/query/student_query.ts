import 'reflect-metadata'
import {
    Resolver,
    Query,
    Ctx,
    FieldResolver,
    Root,
    Arg,
} from 'type-graphql'
import { Student } from '../../db/entities/Student'
import { Context } from '../../config/context'
import { Assignment } from '../../db/entities/Assignment'

@Resolver(Student)
export class StudentQuery {

    @FieldResolver()
    async assignments(@Root() student: Student, @Ctx() ctx: Context): Promise<Assignment[]> {
        return ctx.prisma.student.findUnique({
            where: {
                email: student.email
            }
        }).assignments()
    }

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