import 'reflect-metadata';
import {
    Arg, Ctx, Field, InputType, Mutation, Resolver
} from 'type-graphql';
import { Context } from '../../config/context';
import { Score } from '../../db/entities/Score';


@InputType()
export class ScoreCreateInput implements Partial<Score> {

    @Field()
    score: number 
    
    @Field()
    student_email: string;

    @Field()
    assignment_name: string;
}



@Resolver(Score)
export class ScoreMutation {

    @Mutation((returns) => Score)
    async upsertScoreWithAssignment(
        @Arg('data') data: ScoreCreateInput,
        @Ctx() ctx: Context
    ): Promise<Score> {
        const studentObject = await ctx.prisma.student.findUnique({
            where: { email: data.student_email }
        });

        if (studentObject == null || studentObject.id == null  ){
            return new Score();
        }

        const assignmentObject = await ctx.prisma.assignment.findUnique({
            where: { name: data.assignment_name }
        });

        if (assignmentObject == null || assignmentObject.id == null  ){
            return new Score();
        }

        return ctx.prisma.score.upsert({
            include: { assignment: true, student: true},
            where: {
                studentId_assignmentId: { studentId: studentObject.id, assignmentId: assignmentObject.id }             
            },
            create: {
                score: data.score,
                student: {
                    connect: { email: data.student_email }
                },
                assignment: {
                    connect: { name: data.assignment_name }
                }
            },
            update: {
                score: data.score,
                student: {
                    connect: { email: data.student_email }
                },
                assignment: {
                    connect: { name: data.assignment_name }
                }
            }
        })
    }
}