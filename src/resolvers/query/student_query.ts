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
import { Score } from '../../db/entities/Score'

@Resolver(Student)
export class StudentQuery {

    @FieldResolver()
    async scoreAverage(@Root() student: Student, @Ctx() ctx: Context) {
        const studentObject = await ctx.prisma.student.findUnique({ 
            where: { id: student.id},
            include: { scores: true}
        });

        if (studentObject == null){
            throw new Student();
        }

        //console.log(studentObject.scores);
        const sumScores = studentObject.scores.reduce((a: number, b: Score) => a + b.score, 0)
        const scoreAverage = studentObject.scores.length ? sumScores / studentObject.scores.length : null;

        return scoreAverage;

    }

    @FieldResolver()
    async assignments(@Root() student: Student, @Ctx() ctx: Context): Promise<Assignment[]> {
        return ctx.prisma.student.findUnique({
            where: {
                email: student.email
            }
        }).assignments()
    }

    @Query(() => [Student])
    async getStudents(@Ctx() ctx: Context) {
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